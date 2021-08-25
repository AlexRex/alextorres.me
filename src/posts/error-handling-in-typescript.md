---
title: Error handling in Typescript
summary: Stop throwing errors and expecting someone will treat them
date: 2021-08-25
tags: typescript, software-development
draft: false
---

```typescript
const neverFailFunction = (input: number): number => {
  if (input === 0) {
    throw new Error('Oops, I failed')
  }

  return input * 2
}
```

One day, you or a colleague are using this function, you check the signature, and you see this `(input: number) => number`, so why should this fail?

Obviously, this is not production code. But these things happens, you write a function that shouldn't fail, except for that particular edge case, time goes one, you forget about that case, and you use it without a `trycatch` statement. You might catch the error it somewhere in the stack, probably some layers upwards, and most of the time it's probably too late, you're missing a lot of context to treat the error properly.

So what can we do to improve this? As of today, [Typescript is still missing checked exceptions](https://github.com/microsoft/TypeScript/issues/13219)

If we'd had checked exceptions, we could write our function like this:

```typescript
const neverFailFunction = (input: number): number throws Error => {
  if (input === 0) {
    throw new Error('Oops, I failed')
  }

  return input * 2
}
```

So we could easily take a look at the signature and know that this function may throw an error `(input: number) => number throws Error`. We could even enable a flag in the compiler in order to fail if we don't wrap throwable functions with `trycatch` clauses.

So we will be enforced to treat the error where the error happens, with all the context needed.

Until this becomes possible, if it ever happens, we can rely on other cool feature of Typescript: **Union Types**.

### Union Types as Result Types

From Typescript documentation:

> A union type describes a value that can be one of several types. We use the vertical bar (|) to separate each type, so ``number | string | boolean`` is the type of a value that can be a ``number``, a ``string``, or a ``boolean``.

Great! Let's use this in our function:

```typescript
const neverFailFunction = (input: number): number | Error => {
  if (input === 0) {
    return new Error('Oops, I failed')
  }

  return input * 2
}
```

And we can use it like this:
```typescript
const otherFunction = (): void => {
  const result = neverFailFunction(1)

  if (result instanceof Error) {
    return console.error(result.message)
  }

  console.log('it worked', result) // it worked 1
}
```

This looks much nicer now. We have the full potential of Typescript, we returned an `number | Error` but we could be doing something like `number | ValidationError | InternalError` so we have really specialized errors instead of a generic `Error`.

In the project I am currently working on we're using this approach a lot, but in order to even improve further the developer experience, we added some helper functions to make it easier work with external libraries and our own functions.

First, we wrapped our functions results into a `Result` type:

```typescript
export class ApplicationError extends Error {
  constructor(
    public readonly errorCode: string,
    description?: string
  ) {
    super(description || errorCode)

    // Need to override the prototype
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ApplicationError.prototype)
  }
}

export const fromError = (error: Error) => new ApplicationError('INTERNAL_ERROR', error.message)

export type Ok<T> = {
  value: T
}

export const ok = <T>(data: T): Ok<T> => ({
  value: data
})

export type Result<T, E extends ApplicationError = ApplicationError> = Ok<T> | E
export type PromiseResult<T, E extends ApplicationError = ApplicationError> = Promise<Result<T, E>>

export const isErrorResult = <T = unknown, E extends ApplicationError = ApplicationError>(result: Result<T, E>): result is E =>
  'errorCode' in result

export const isOkResult = <T = unknown, E extends ApplicationError = ApplicationError>(result: Result<T, E>): result is Ok<T> =>
  'value' in result
```

So our function will become:

```typescript
const neverFailFunction = (input: number): Result<number, ApplicationError> => {
  if (input === 0) {
    return new ApplicationError('Oops, I failed')
  }

  return ok(input * 2)
}

const otherFunction = (): void => {
  const result = neverFailFunction(1)

  if (isErrorResult(result)) {
    return console.error(result.message)
  }

  console.log('it worked', result.value) // it worked 1
}
```

And finally, what if we have a native or 3rd party library that may throw an error? 🤔 Well, we created also some useful helper methods to wrap those functions and translate the output to a result type, even if it throws an error:

```typescript
/**
 * Expects a function that may throw. If it throws it returns the error passed
 */
export const fromAsyncTryCatch = <O extends Error = Error, E extends ApplicationError = ApplicationError>(errorFn: (originalError: O) => E) =>
  async <DataType>(fn: () => Promise<DataType>): PromiseResult<DataType, E> => {
    try {
      const res = await fn()

      return ok<DataType>(res)
    } catch (catchErr) {
      return errorFn(catchErr)
    }
  }

export const fromTryCatch = <O extends Error = Error, E extends ApplicationError = ApplicationError>(errorFn: (originalError: O) => E) =>
  <DataType>(fn: () => DataType): Result<DataType, E> => {
    try {
      const res = fn()

      return ok<DataType>(res)
    } catch (catchErr) {
      return errorFn(catchErr)
    }
  }
```

So for instance, a common thing that throws is `JSON.parse`, so we could use it as:

```typescript
const parse = <T>(toParse: string): Result<T, ApplicationError> => fromTryCatch(
  (error) => new ApplicationError('JSON parse failed', error.message)
)(() => JSON.parse(toParse))

const parsedResult = parse<{ foo: number }>('{"foo":1}')

if (isErrorResult(parsedResult)) {
  return console.log('hack')
}

console.log(parsedResult.value.foo)
```

And to even make this easier, so we can avoid all the boilerplate, we added one more function:

```typescript
export const effectiveError = fromAsyncTryCatch<Error | ApplicationError, ApplicationError>(
  (error) => {
    if (error instanceof ApplicationError) {
      return error
    }

    return fromError(error)
  }
)
```

This is pretty handy, so you don't even need to think of wrapping your stuff into a Result:
```typescript
const parseAndProcess = <T>(toParse: string): PromiseResult<T, ApplicationError> =>
  effectiveError(async () => {
    const parsedResult = JSON.parse(toParse)

    console.log(parsedResult.foo)

    if (parsedResult.foo === 1) {
      throw new ApplicationError('hack')
    }

    return parsedResult
  })
```

So you don't really need to care about wrapping or returning `Ok`, everything in the body of `effectiveError`, either if you're throwing or returning a valid result will be wrapped properly.

You can find all the methods and an example in this gist: https://gist.github.com/AlexRex/e0a7aaa9246ad35707d4967f28156939

Btw, if you're not new to functional programming paradigms, you probably noticed this is just a simplification of the Either monad with other name.
