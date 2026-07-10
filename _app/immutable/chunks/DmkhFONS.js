var we=Object.defineProperty;var xe=(n,e,t)=>e in n?we(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var f=(n,e,t)=>xe(n,typeof e!="symbol"?e+"":e,t);import{g as ye}from"./Cx79Tgt0.js";const ve=`---
title: Error handling in Typescript
summary: Stop throwing errors and expecting someone will treat them
date: 2021-08-25
tags: typescript, software-development
draft: false
---

\`\`\`typescript
const neverFailFunction = (input: number): number => {
  if (input === 0) {
    throw new Error('Oops, I failed')
  }

  return input * 2
}
\`\`\`

One day, you or a colleague are using this function, you check the signature, and you see this \`(input: number) => number\`, so why should this fail?

Obviously, this is not production code. But these things happens, you write a function that shouldn't fail, except for that particular edge case, time goes one, you forget about that case, and you use it without a \`trycatch\` statement. You might catch the error it somewhere in the stack, probably some layers upwards, and most of the time it's probably too late, you're missing a lot of context to treat the error properly.

So what can we do to improve this? As of today, [Typescript is still missing checked exceptions](https://github.com/microsoft/TypeScript/issues/13219)

If we'd had checked exceptions, we could write our function like this:

\`\`\`typescript
const neverFailFunction = (input: number): number throws Error => {
  if (input === 0) {
    throw new Error('Oops, I failed')
  }

  return input * 2
}
\`\`\`

So we could easily take a look at the signature and know that this function may throw an error \`(input: number) => number throws Error\`. We could even enable a flag in the compiler in order to fail if we don't wrap throwable functions with \`trycatch\` clauses.

So we will be enforced to treat the error where the error happens, with all the context needed.

Until this becomes possible, if it ever happens, we can rely on other cool feature of Typescript: **Union Types**.

### Union Types as Result Types

From Typescript documentation:

> A union type describes a value that can be one of several types. We use the vertical bar (|) to separate each type, so \`\`number | string | boolean\`\` is the type of a value that can be a \`\`number\`\`, a \`\`string\`\`, or a \`\`boolean\`\`.

Great! Let's use this in our function:

\`\`\`typescript
const neverFailFunction = (input: number): number | Error => {
  if (input === 0) {
    return new Error('Oops, I failed')
  }

  return input * 2
}
\`\`\`

And we can use it like this:
\`\`\`typescript
const otherFunction = (): void => {
  const result = neverFailFunction(1)

  if (result instanceof Error) {
    return console.error(result.message)
  }

  console.log('it worked', result) // it worked 1
}
\`\`\`

This looks much nicer now. We have the full potential of Typescript, we returned an \`number | Error\` but we could be doing something like \`number | ValidationError | InternalError\` so we have really specialized errors instead of a generic \`Error\`.

In the project I am currently working on we're using this approach a lot, but in order to even improve further the developer experience, we added some helper functions to make it easier work with external libraries and our own functions.

First, we wrapped our functions results into a \`Result\` type:

\`\`\`typescript
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
\`\`\`

So our function will become:

\`\`\`typescript
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
\`\`\`

And finally, what if we have a native or 3rd party library that may throw an error? 🤔 Well, we created also some useful helper methods to wrap those functions and translate the output to a result type, even if it throws an error:

\`\`\`typescript
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
\`\`\`

So for instance, a common thing that throws is \`JSON.parse\`, so we could use it as:

\`\`\`typescript
const parse = <T>(toParse: string): Result<T, ApplicationError> => fromTryCatch(
  (error) => new ApplicationError('JSON parse failed', error.message)
)(() => JSON.parse(toParse))

const parsedResult = parse<{ foo: number }>('{"foo":1}')

if (isErrorResult(parsedResult)) {
  return console.log('hack')
}

console.log(parsedResult.value.foo)
\`\`\`

And to even make this easier, so we can avoid all the boilerplate, we added one more function:

\`\`\`typescript
export const effectiveError = fromAsyncTryCatch<Error | ApplicationError, ApplicationError>(
  (error) => {
    if (error instanceof ApplicationError) {
      return error
    }

    return fromError(error)
  }
)
\`\`\`

This is pretty handy, so you don't even need to think of wrapping your stuff into a Result:
\`\`\`typescript
const parseAndProcess = <T>(toParse: string): PromiseResult<T, ApplicationError> =>
  effectiveError(async () => {
    const parsedResult = JSON.parse(toParse)

    console.log(parsedResult.foo)

    if (parsedResult.foo === 1) {
      throw new ApplicationError('hack')
    }

    return parsedResult
  })
\`\`\`

So you don't really need to care about wrapping or returning \`Ok\`, everything in the body of \`effectiveError\`, either if you're throwing or returning a valid result will be wrapped properly.

You can find all the methods and an example in this gist: https://gist.github.com/AlexRex/e0a7aaa9246ad35707d4967f28156939

Btw, if you're not new to functional programming paradigms, you probably noticed this is just a simplification of the Either monad with other name.
`,Se=`---
title: GMR Project
summary: Why I did this to myself
date: 2020-11-05
tags: career
draft: true
---

The last project I was working in adidas was GMR (_gamer_).

![gmr](/posts/quit-job/gmr.jpg)

This project was such an amazing experience. We worked together with Google and EA in a product which tried to connect the physical experiences playing football (_soccer_) with the gamming environment of FIFA. 

In essence there's a tag (based on the [Jacquard](https://atap.google.com/jacquard/) technology) developed by Google. This tag is capable of counting a series of metrics from football players: counting kicks, kick speed, distance travelled, etc. This metrics are predicted using a Maching Learning model **inside** the tag.

In adidas we had two main tasks:

1. We had to collect data to train the model develop by Google. In order to do this we built a platform that enables sport scientists to label videos of sessions and package those sessions. 

1. We were the middleware between the Jacquard tag and EA (FIFA). We had to apply some data processing to the metrics before the reach FIFA. 

Both of this were made using cutting-edge technology.
`,Re=`---
title: I quit my five-star job
summary: Why I did this to myself
date: 2020-11-05
tags: career
draft: false
---

In July 2020, after a while thinking about it I decided to ditch my current job. I had a good position, in a really mature and stable company, just got a promotion and I was really happy with colleagues. 

Am I an idiot? _Maybe_.

You might be asking why I did this. Well, the answer is not simple. Even thought there were many good things about this job position, I was not happy, I felt I needed to do something different. Since I went out of University I only worked in one place, and I had the impression I was missing something. 

I was getting a bit _burned out_. Maybe not the kind which you decide to just change completely your career. But the one that makes you stop for a period of time to recover and get motivated again with different projects. 

Right, I could've wait a bit more, at that time we were in the middle of a global pandemic (well, we're still now), but sometimes I think you need to make a step further and just do what you think it's right. 

## What I am doing now?

There was a funny story in HackerNews the other day of a Software Engineer who opened an issue in one Docker repo, after some conversation the guy disappeared, six months later he came back with the following message: 

> @solvaholic: Sorry I missed your comment of many months ago. I no longer build software; I now make furniture out of wood. The hours are long, the pay sucks, and there's always the opportunity to remove my finger with a table saw, but nobody asks me if I can add an RSS feed to a DBMS, so there's that :-)

Link: https://github.com/docker/cli/issues/267#issuecomment-695149477

So the guy got burned out and decided to change career and do wood working. More or less I am currently in that mood, basically, doing stuff I had in my mind for a while and I hadn't have time before. I have no plans to change careers as I really like software development, but I will tend to do more _real_ stuff. 

`,Te=`---
title: Hey there, I am using Sapper (Svelte)
summary: How I improved the performance and size of this site using Svelte
date: 2020-05-24
tags: sapper, svelte, javascript, software-development, ecosoftware
---

When I built this site in 2018 I wanted to learn something new, so I used [NextJS](https://nextjs.org/), a ReactJS framework to build Server Side Rendered and Static Sites — which is pretty fun to work with.

Honestly, rewriting it to Sapper was something I didn't need to do. But as I wanted to add the [TIL](/til) section to the page, I thought: Ok, why not? Let's learn something new.

So this is the site audit with Lighthouse with the NextJS build:

![performance-next](/posts/improve-site/performance-next.png)

So now the turn for Sapper. The steps I did are dead simple:

1. Go straight to the [Sapper Docs](https://sapper.svelte.dev/docs).
2. Clone the starter template.
3. Migrate the React components to Sapper with the same styles.
4. ...Boom.

![performance-next](/posts/improve-site/performance-sapper.png)

This is straight from the template using the exported build (static generated html files, no server side needed).
It takes 150kB space to download the main page. Funny thing, 45kB are just the fonts from [Google Fonts](https://fonts.google.com/), and 17kB the Favicon. I guess I'll need to cut the size off on that small icon soon...

The same stuff with NextJS takes up to 300kB, doubling the space. It may not look like much more space — a 1 hour movie in any streaming service can be more than 1 GB — but after reading for a while, I am getting more and more concern of how we waste the resources in the digital world, and how we can adapt the so-called ecological digital design. For instance, there's this French Studio called [Fairness.coop](https://fairness.coop/) (in French) which is aiming to develop all of their products in the most sustainable way, so they have the less ecological impact possible.

Coming back to the topic, to be really fair with NextJS:

1. I am using a pretty outdated version.
2. I didn't pay too much attention on optimizing the code.

So I guess the build size and performance can be really boosted to the same level as the Sapper one using a proper version and taking time into optimizations.
`,Ie=`---
title: Keep it simple
summary: Don't overengineer stuff
date: 2022-02-13
tags: software-development
draft: true
---

`,Ee=`---
title: The photo pipeline
summary: A way of manging my own photo gallery 
date: 2020-05-28
tags: photography, selfhosted, alextorres.me
draft: false
---

<style>
  picture img {
    max-height: 70vh;
    max-width: 84vw !important;
    width: auto !important;
  }
</style>

<picture>
  <source srcset="https://storage.sbg.cloud.ovh.net/v1/AUTH_0ea6be3f528d4bacb871d2c2d541a7b9/photos/DSC09362/1080.webp" type="image/webp" />
  <source srcset="https://storage.sbg.cloud.ovh.net/v1/AUTH_0ea6be3f528d4bacb871d2c2d541a7b9/photos/DSC09362/1080.jpg" type="image/jpeg" />
  <img src="https://storage.sbg.cloud.ovh.net/v1/AUTH_0ea6be3f528d4bacb871d2c2d541a7b9/photos/DSC09362/1080.jpg" alt={photo.metadata.id} />
</picture>

I like to take pictures and I like to share my pictures. I also use like Instagram, but I don't like the feeling when you post a picture, get engaged by the likes, become a zombie scrolling and scrolling forever, feeling like a lot of pictures look similar to others, letting Facebook to **own** your pictures and try to sell you stuff all the time...

And I also guess that sooner or later Instagram will pass away — it happened to many services now. 

So I want something reliable, no comments, no likes, just to post some pictures on *[the internet](/photos)*.

### Automating the way

Currently this static site is hosted using Github pages. For the size, and quantity of files I intend to post I'm rather going with a different approach. I thought about using AWS S3, I've used it before and suits my needs. But for [alextorres.me](/) I want to keep it a bit more local, at least an European company which gives me more confidence and has better values, so I decided to go with [OVH](https://www.ovh.com/world/manifesto.xml). They have a service called Object Storage based in OpenStack with an API compatible with S3, so why not? 

The usual process for pushing pictures in here will be something like: 

1. Take the picture
2. Resize it to three resolutions: 256 (Thumbnail), 1080 (Display), Original (Download)
3. Convert to WebP and JPG
3. Push the image to OVH Object Storage
4. Extract metadata of the image
5. Get a JSON with the image Metadata + URLs of the storage location
6. Commit the new JSON to the [github repo](https://github.com/AlexRex/alextorres.me)


It looks like a good candidate for automation right? After tinkering a bit with it there you go: [The Photo Pipeline](https://github.com/AlexRex/thephotopipeline)

It is missing to commit directly to the Github Repo, but that way is a bit more generic. 

### Displaying the pictures

I am trying to be a good internet citizen, so I won't let your mobile data plan break because you missclicked on my photo gallery. 

Therefore, I resize the pictures to 3 resolutions:

- **256**: Used to display the thumbnails in the gallery view
- **1080**: For the single photo view 
- **Original**: Downloadable verison

And create two copies: JPEG and [WebP](https://developers.google.com/speed/webp).

Finally, I rely on the \`picture\` [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) to either display a WebP version or JPEG version, depending on browser compatibility: 

\`\`\`html
<picture>
  <source srcset={photo.resolutions['1080'].webpFile} type="image/webp" />
  <source srcset={photo.resolutions['1080'].jpgFile} type="image/jpeg" />
  <img src={photo.resolutions['1080'].jpgFile} alt={photo.metadata.id} />
</picture>
\`\`\`
`;function N(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var R=N();function ae(n){R=n}var A={exec:()=>null};function u(n,e=""){let t=typeof n=="string"?n:n.source;const r={replace:(i,s)=>{let c=typeof s=="string"?s:s.source;return c=c.replace(b.caret,"$1"),t=t.replace(i,c),r},getRegex:()=>new RegExp(t,e)};return r}var b={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i")},Ae=/^(?:[ \t]*(?:\n|$))+/,_e=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$e=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ze=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Z=/(?:[*+-]|\d{1,9}[.)])/,le=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ce=u(le).replace(/bull/g,Z).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Pe=u(le).replace(/bull/g,Z).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),H=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ce=/^[^\n]+/,W=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Le=u(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",W).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Be=u(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Z).getRegex(),B="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",J=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oe=u("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",J).replace("tag",B).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),he=u(H).replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B).getRegex(),Fe=u(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",he).getRegex(),U={blockquote:Fe,code:_e,def:Le,fences:$e,heading:ze,hr:_,html:Oe,lheading:ce,list:Be,newline:Ae,paragraph:he,table:A,text:Ce},ne=u("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B).getRegex(),je={...U,lheading:Pe,table:ne,paragraph:u(H).replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ne).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B).getRegex()},De={...U,html:u(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",J).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:A,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:u(H).replace("hr",_).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ce).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},qe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ge=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pe=/^( {2,}|\\)\n(?!\s*$)/,Me=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,O=/[\p{P}\p{S}]/u,Q=/[\s\p{P}\p{S}]/u,ue=/[^\s\p{P}\p{S}]/u,Ne=u(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Q).getRegex(),de=/(?!~)[\p{P}\p{S}]/u,Ze=/(?!~)[\s\p{P}\p{S}]/u,He=/(?:[^\s\p{P}\p{S}]|~)/u,We=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ge=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Je=u(ge,"u").replace(/punct/g,O).getRegex(),Ue=u(ge,"u").replace(/punct/g,de).getRegex(),fe="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qe=u(fe,"gu").replace(/notPunctSpace/g,ue).replace(/punctSpace/g,Q).replace(/punct/g,O).getRegex(),Xe=u(fe,"gu").replace(/notPunctSpace/g,He).replace(/punctSpace/g,Ze).replace(/punct/g,de).getRegex(),Ve=u("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ue).replace(/punctSpace/g,Q).replace(/punct/g,O).getRegex(),Ye=u(/\\(punct)/,"gu").replace(/punct/g,O).getRegex(),Ke=u(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),et=u(J).replace("(?:-->|$)","-->").getRegex(),tt=u("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",et).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),P=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,nt=u(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",P).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),me=u(/^!?\[(label)\]\[(ref)\]/).replace("label",P).replace("ref",W).getRegex(),ke=u(/^!?\[(ref)\](?:\[\])?/).replace("ref",W).getRegex(),rt=u("reflink|nolink(?!\\()","g").replace("reflink",me).replace("nolink",ke).getRegex(),X={_backpedal:A,anyPunctuation:Ye,autolink:Ke,blockSkip:We,br:pe,code:Ge,del:A,emStrongLDelim:Je,emStrongRDelimAst:Qe,emStrongRDelimUnd:Ve,escape:qe,link:nt,nolink:ke,punctuation:Ne,reflink:me,reflinkSearch:rt,tag:tt,text:Me,url:A},it={...X,link:u(/^!?\[(label)\]\((.*?)\)/).replace("label",P).getRegex(),reflink:u(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",P).getRegex()},q={...X,emStrongRDelimAst:Xe,emStrongLDelim:Ue,url:u(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},st={...q,br:u(pe).replace("{2,}","*").getRegex(),text:u(q.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},$={normal:U,gfm:je,pedantic:De},I={normal:X,gfm:q,breaks:st,pedantic:it},ot={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},re=n=>ot[n];function x(n,e){if(e){if(b.escapeTest.test(n))return n.replace(b.escapeReplace,re)}else if(b.escapeTestNoEncode.test(n))return n.replace(b.escapeReplaceNoEncode,re);return n}function ie(n){try{n=encodeURI(n).replace(b.percentDecode,"%")}catch{return null}return n}function se(n,e){var s;const t=n.replace(b.findPipe,(c,o,h)=>{let a=!1,l=o;for(;--l>=0&&h[l]==="\\";)a=!a;return a?"|":" |"}),r=t.split(b.splitPipe);let i=0;if(r[0].trim()||r.shift(),r.length>0&&!((s=r.at(-1))!=null&&s.trim())&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(b.slashPipe,"|");return r}function E(n,e,t){const r=n.length;if(r===0)return"";let i=0;for(;i<r&&n.charAt(r-i-1)===e;)i++;return n.slice(0,r-i)}function at(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let r=0;r<n.length;r++)if(n[r]==="\\")r++;else if(n[r]===e[0])t++;else if(n[r]===e[1]&&(t--,t<0))return r;return t>0?-2:-1}function oe(n,e,t,r,i){const s=e.href,c=e.title||null,o=n[1].replace(i.other.outputLinkReplace,"$1");r.state.inLink=!0;const h={type:n[0].charAt(0)==="!"?"image":"link",raw:t,href:s,title:c,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,h}function lt(n,e,t){const r=n.match(t.other.indentCodeCompensation);if(r===null)return e;const i=r[1];return e.split(`
`).map(s=>{const c=s.match(t.other.beginningSpace);if(c===null)return s;const[o]=c;return o.length>=i.length?s.slice(i.length):s}).join(`
`)}var C=class{constructor(n){f(this,"options");f(this,"rules");f(this,"lexer");this.options=n||R}space(n){const e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){const e=this.rules.block.code.exec(n);if(e){const t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:E(t,`
`)}}}fences(n){const e=this.rules.block.fences.exec(n);if(e){const t=e[0],r=lt(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(n){const e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){const r=E(t,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(t=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){const e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:E(e[0],`
`)}}blockquote(n){const e=this.rules.block.blockquote.exec(n);if(e){let t=E(e[0],`
`).split(`
`),r="",i="";const s=[];for(;t.length>0;){let c=!1;const o=[];let h;for(h=0;h<t.length;h++)if(this.rules.other.blockquoteStart.test(t[h]))o.push(t[h]),c=!0;else if(!c)o.push(t[h]);else break;t=t.slice(h);const a=o.join(`
`),l=a.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${a}`:a,i=i?`${i}
${l}`:l;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,s,!0),this.lexer.state.top=m,t.length===0)break;const p=s.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const k=p,d=k.raw+`
`+t.join(`
`),w=this.blockquote(d);s[s.length-1]=w,r=r.substring(0,r.length-k.raw.length)+w.raw,i=i.substring(0,i.length-k.text.length)+w.text;break}else if((p==null?void 0:p.type)==="list"){const k=p,d=k.raw+`
`+t.join(`
`),w=this.list(d);s[s.length-1]=w,r=r.substring(0,r.length-p.raw.length)+w.raw,i=i.substring(0,i.length-k.raw.length)+w.raw,t=d.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:i}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim();const r=t.length>1,i={type:"list",raw:"",ordered:r,start:r?+t.slice(0,-1):"",loose:!1,items:[]};t=r?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=r?t:"[*+-]");const s=this.rules.other.listItemRegex(t);let c=!1;for(;n;){let h=!1,a="",l="";if(!(e=s.exec(n))||this.rules.block.hr.test(n))break;a=e[0],n=n.substring(a.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),p=n.split(`
`,1)[0],k=!m.trim(),d=0;if(this.options.pedantic?(d=2,l=m.trimStart()):k?d=e[1].length+1:(d=e[2].search(this.rules.other.nonSpaceChar),d=d>4?1:d,l=m.slice(d),d+=e[1].length),k&&this.rules.other.blankLine.test(p)&&(a+=p+`
`,n=n.substring(p.length+1),h=!0),!h){const F=this.rules.other.nextBulletRegex(d),K=this.rules.other.hrRegex(d),ee=this.rules.other.fencesBeginRegex(d),te=this.rules.other.headingBeginRegex(d),be=this.rules.other.htmlBeginRegex(d);for(;n;){const j=n.split(`
`,1)[0];let T;if(p=j,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),T=p):T=p.replace(this.rules.other.tabCharGlobal,"    "),ee.test(p)||te.test(p)||be.test(p)||F.test(p)||K.test(p))break;if(T.search(this.rules.other.nonSpaceChar)>=d||!p.trim())l+=`
`+T.slice(d);else{if(k||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ee.test(m)||te.test(m)||K.test(m))break;l+=`
`+p}!k&&!p.trim()&&(k=!0),a+=j+`
`,n=n.substring(j.length+1),m=T.slice(d)}}i.loose||(c?i.loose=!0:this.rules.other.doubleBlankLine.test(a)&&(c=!0));let w=null,Y;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(Y=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:a,task:!!w,checked:Y,loose:!1,text:l,tokens:[]}),i.raw+=a}const o=i.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let h=0;h<i.items.length;h++)if(this.lexer.state.top=!1,i.items[h].tokens=this.lexer.blockTokens(i.items[h].text,[]),!i.loose){const a=i.items[h].tokens.filter(m=>m.type==="space"),l=a.length>0&&a.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=l}if(i.loose)for(let h=0;h<i.items.length;h++)i.items[h].loose=!0;return i}}html(n){const e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(n){const e=this.rules.block.def.exec(n);if(e){const t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:r,title:i}}}table(n){var c;const e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;const t=se(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(c=e[3])!=null&&c.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===r.length){for(const o of r)this.rules.other.tableAlignRight.test(o)?s.align.push("right"):this.rules.other.tableAlignCenter.test(o)?s.align.push("center"):this.rules.other.tableAlignLeft.test(o)?s.align.push("left"):s.align.push(null);for(let o=0;o<t.length;o++)s.header.push({text:t[o],tokens:this.lexer.inline(t[o]),header:!0,align:s.align[o]});for(const o of i)s.rows.push(se(o,s.header.length).map((h,a)=>({text:h,tokens:this.lexer.inline(h),header:!1,align:s.align[a]})));return s}}lheading(n){const e=this.rules.block.lheading.exec(n);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(n){const e=this.rules.block.paragraph.exec(n);if(e){const t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){const e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){const e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){const e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){const e=this.rules.inline.link.exec(n);if(e){const t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;const s=E(t.slice(0,-1),"\\");if((t.length-s.length)%2===0)return}else{const s=at(e[2],"()");if(s===-2)return;if(s>-1){const o=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let r=e[2],i="";if(this.options.pedantic){const s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],i=s[3])}else i=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?r=r.slice(1):r=r.slice(1,-1)),oe(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){const r=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=e[r.toLowerCase()];if(!i){const s=t[0].charAt(0);return{type:"text",raw:s,text:s}}return oe(t,i,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let r=this.rules.inline.emStrongLDelim.exec(n);if(!r||r[3]&&t.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!t||this.rules.inline.punctuation.exec(t)){const s=[...r[0]].length-1;let c,o,h=s,a=0;const l=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,e=e.slice(-1*n.length+s);(r=l.exec(e))!=null;){if(c=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!c)continue;if(o=[...c].length,r[3]||r[4]){h+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){a+=o;continue}if(h-=o,h>0)continue;o=Math.min(o,o+h+a);const m=[...r[0]][0].length,p=n.slice(0,s+r.index+m+o);if(Math.min(s,o)%2){const d=p.slice(1,-1);return{type:"em",raw:p,text:d,tokens:this.lexer.inlineTokens(d)}}const k=p.slice(2,-2);return{type:"strong",raw:p,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(n){const e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," ");const r=this.rules.other.nonSpaceChar.test(t),i=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return r&&i&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){const e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n){const e=this.rules.inline.del.exec(n);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(n){const e=this.rules.inline.autolink.exec(n);if(e){let t,r;return e[2]==="@"?(t=e[1],r="mailto:"+t):(t=e[1],r=t),{type:"link",raw:e[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}url(n){var t;let e;if(e=this.rules.inline.url.exec(n)){let r,i;if(e[2]==="@")r=e[0],i="mailto:"+r;else{let s;do s=e[0],e[0]=((t=this.rules.inline._backpedal.exec(e[0]))==null?void 0:t[0])??"";while(s!==e[0]);r=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(n){const e=this.rules.inline.text.exec(n);if(e){const t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},y=class G{constructor(e){f(this,"tokens");f(this,"options");f(this,"state");f(this,"tokenizer");f(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||R,this.options.tokenizer=this.options.tokenizer||new C,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={other:b,block:$.normal,inline:I.normal};this.options.pedantic?(t.block=$.pedantic,t.inline=I.pedantic):this.options.gfm&&(t.block=$.gfm,this.options.breaks?t.inline=I.breaks:t.inline=I.gfm),this.tokenizer.rules=t}static get rules(){return{block:$,inline:I}}static lex(e,t){return new G(t).lex(e)}static lexInline(e,t){return new G(t).inlineTokens(e)}lex(e){e=e.replace(b.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const r=this.inlineQueue[t];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],r=!1){var i,s,c;for(this.options.pedantic&&(e=e.replace(b.tabCharGlobal,"    ").replace(b.spaceLine,""));e;){let o;if((s=(i=this.options.extensions)==null?void 0:i.block)!=null&&s.some(a=>(o=a.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);const a=t.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):t.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),t.push(o);continue}let h=e;if((c=this.options.extensions)!=null&&c.startBlock){let a=1/0;const l=e.slice(1);let m;this.options.extensions.startBlock.forEach(p=>{m=p.call({lexer:this},l),typeof m=="number"&&m>=0&&(a=Math.min(a,m))}),a<1/0&&a>=0&&(h=e.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(h))){const a=t.at(-1);r&&(a==null?void 0:a.type)==="paragraph"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(o),r=h.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(o);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){var o,h,a;let r=e,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let s=!1,c="";for(;e;){s||(c=""),s=!1;let l;if((h=(o=this.options.extensions)==null?void 0:o.inline)!=null&&h.some(p=>(l=p.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);const p=t.at(-1);l.type==="text"&&(p==null?void 0:p.type)==="text"?(p.raw+=l.raw,p.text+=l.text):t.push(l);continue}if(l=this.tokenizer.emStrong(e,r,c)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),t.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),t.push(l);continue}let m=e;if((a=this.options.extensions)!=null&&a.startInline){let p=1/0;const k=e.slice(1);let d;this.options.extensions.startInline.forEach(w=>{d=w.call({lexer:this},k),typeof d=="number"&&d>=0&&(p=Math.min(p,d))}),p<1/0&&p>=0&&(m=e.substring(0,p+1))}if(l=this.tokenizer.inlineText(m)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),s=!0;const p=t.at(-1);(p==null?void 0:p.type)==="text"?(p.raw+=l.raw,p.text+=l.text):t.push(l);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}},L=class{constructor(n){f(this,"options");f(this,"parser");this.options=n||R}space(n){return""}code({text:n,lang:e,escaped:t}){var s;const r=(s=(e||"").match(b.notSpaceStart))==null?void 0:s[0],i=n.replace(b.endingNewline,"")+`
`;return r?'<pre><code class="language-'+x(r)+'">'+(t?i:x(i,!0))+`</code></pre>
`:"<pre><code>"+(t?i:x(i,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){const e=n.ordered,t=n.start;let r="";for(let c=0;c<n.items.length;c++){const o=n.items[c];r+=this.listitem(o)}const i=e?"ol":"ul",s=e&&t!==1?' start="'+t+'"':"";return"<"+i+s+`>
`+r+"</"+i+`>
`}listitem(n){var t;let e="";if(n.task){const r=this.checkbox({checked:!!n.checked});n.loose?((t=n.tokens[0])==null?void 0:t.type)==="paragraph"?(n.tokens[0].text=r+" "+n.tokens[0].text,n.tokens[0].tokens&&n.tokens[0].tokens.length>0&&n.tokens[0].tokens[0].type==="text"&&(n.tokens[0].tokens[0].text=r+" "+x(n.tokens[0].tokens[0].text),n.tokens[0].tokens[0].escaped=!0)):n.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):e+=r+" "}return e+=this.parser.parse(n.tokens,!!n.loose),`<li>${e}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let i=0;i<n.header.length;i++)t+=this.tablecell(n.header[i]);e+=this.tablerow({text:t});let r="";for(let i=0;i<n.rows.length;i++){const s=n.rows[i];t="";for(let c=0;c<s.length;c++)t+=this.tablecell(s[c]);r+=this.tablerow({text:t})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){const e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${x(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:t}){const r=this.parser.parseInline(t),i=ie(n);if(i===null)return r;n=i;let s='<a href="'+n+'"';return e&&(s+=' title="'+x(e)+'"'),s+=">"+r+"</a>",s}image({href:n,title:e,text:t,tokens:r}){r&&(t=this.parser.parseInline(r,this.parser.textRenderer));const i=ie(n);if(i===null)return x(t);n=i;let s=`<img src="${n}" alt="${t}"`;return e&&(s+=` title="${x(e)}"`),s+=">",s}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:x(n.text)}},V=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}},v=class M{constructor(e){f(this,"options");f(this,"renderer");f(this,"textRenderer");this.options=e||R,this.options.renderer=this.options.renderer||new L,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new V}static parse(e,t){return new M(t).parse(e)}static parseInline(e,t){return new M(t).parseInline(e)}parse(e,t=!0){var i,s;let r="";for(let c=0;c<e.length;c++){const o=e[c];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[o.type]){const a=o,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){r+=l||"";continue}}const h=o;switch(h.type){case"space":{r+=this.renderer.space(h);continue}case"hr":{r+=this.renderer.hr(h);continue}case"heading":{r+=this.renderer.heading(h);continue}case"code":{r+=this.renderer.code(h);continue}case"table":{r+=this.renderer.table(h);continue}case"blockquote":{r+=this.renderer.blockquote(h);continue}case"list":{r+=this.renderer.list(h);continue}case"html":{r+=this.renderer.html(h);continue}case"paragraph":{r+=this.renderer.paragraph(h);continue}case"text":{let a=h,l=this.renderer.text(a);for(;c+1<e.length&&e[c+1].type==="text";)a=e[++c],l+=`
`+this.renderer.text(a);t?r+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):r+=l;continue}default:{const a='Token with "'+h.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(e,t=this.renderer){var i,s;let r="";for(let c=0;c<e.length;c++){const o=e[c];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[o.type]){const a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}const h=o;switch(h.type){case"escape":{r+=t.text(h);break}case"html":{r+=t.html(h);break}case"link":{r+=t.link(h);break}case"image":{r+=t.image(h);break}case"strong":{r+=t.strong(h);break}case"em":{r+=t.em(h);break}case"codespan":{r+=t.codespan(h);break}case"br":{r+=t.br(h);break}case"del":{r+=t.del(h);break}case"text":{r+=t.text(h);break}default:{const a='Token with "'+h.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},D,z=(D=class{constructor(n){f(this,"options");f(this,"block");this.options=n||R}preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}provideLexer(){return this.block?y.lex:y.lexInline}provideParser(){return this.block?v.parse:v.parseInline}},f(D,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),D),ct=class{constructor(...n){f(this,"defaults",N());f(this,"options",this.setOptions);f(this,"parse",this.parseMarkdown(!0));f(this,"parseInline",this.parseMarkdown(!1));f(this,"Parser",v);f(this,"Renderer",L);f(this,"TextRenderer",V);f(this,"Lexer",y);f(this,"Tokenizer",C);f(this,"Hooks",z);this.use(...n)}walkTokens(n,e){var r,i;let t=[];for(const s of n)switch(t=t.concat(e.call(this,s)),s.type){case"table":{const c=s;for(const o of c.header)t=t.concat(this.walkTokens(o.tokens,e));for(const o of c.rows)for(const h of o)t=t.concat(this.walkTokens(h.tokens,e));break}case"list":{const c=s;t=t.concat(this.walkTokens(c.items,e));break}default:{const c=s;(i=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&i[c.type]?this.defaults.extensions.childTokens[c.type].forEach(o=>{const h=c[o].flat(1/0);t=t.concat(this.walkTokens(h,e))}):c.tokens&&(t=t.concat(this.walkTokens(c.tokens,e)))}}return t}use(...n){const e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{const r={...t};if(r.async=this.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const s=e.renderers[i.name];s?e.renderers[i.name]=function(...c){let o=i.renderer.apply(this,c);return o===!1&&(o=s.apply(this,c)),o}:e.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=e[i.level];s?s.unshift(i.tokenizer):e[i.level]=[i.tokenizer],i.start&&(i.level==="block"?e.startBlock?e.startBlock.push(i.start):e.startBlock=[i.start]:i.level==="inline"&&(e.startInline?e.startInline.push(i.start):e.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(e.childTokens[i.name]=i.childTokens)}),r.extensions=e),t.renderer){const i=this.defaults.renderer||new L(this.defaults);for(const s in t.renderer){if(!(s in i))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;const c=s,o=t.renderer[c],h=i[c];i[c]=(...a)=>{let l=o.apply(i,a);return l===!1&&(l=h.apply(i,a)),l||""}}r.renderer=i}if(t.tokenizer){const i=this.defaults.tokenizer||new C(this.defaults);for(const s in t.tokenizer){if(!(s in i))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const c=s,o=t.tokenizer[c],h=i[c];i[c]=(...a)=>{let l=o.apply(i,a);return l===!1&&(l=h.apply(i,a)),l}}r.tokenizer=i}if(t.hooks){const i=this.defaults.hooks||new z;for(const s in t.hooks){if(!(s in i))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;const c=s,o=t.hooks[c],h=i[c];z.passThroughHooks.has(s)?i[c]=a=>{if(this.defaults.async)return Promise.resolve(o.call(i,a)).then(m=>h.call(i,m));const l=o.call(i,a);return h.call(i,l)}:i[c]=(...a)=>{let l=o.apply(i,a);return l===!1&&(l=h.apply(i,a)),l}}r.hooks=i}if(t.walkTokens){const i=this.defaults.walkTokens,s=t.walkTokens;r.walkTokens=function(c){let o=[];return o.push(s.call(this,c)),i&&(o=o.concat(i.call(this,c))),o}}this.defaults={...this.defaults,...r}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return y.lex(n,e??this.defaults)}parser(n,e){return v.parse(n,e??this.defaults)}parseMarkdown(n){return(t,r)=>{const i={...r},s={...this.defaults,...i},c=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return c(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return c(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return c(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=n);const o=s.hooks?s.hooks.provideLexer():n?y.lex:y.lexInline,h=s.hooks?s.hooks.provideParser():n?v.parse:v.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(t):t).then(a=>o(a,s)).then(a=>s.hooks?s.hooks.processAllTokens(a):a).then(a=>s.walkTokens?Promise.all(this.walkTokens(a,s.walkTokens)).then(()=>a):a).then(a=>h(a,s)).then(a=>s.hooks?s.hooks.postprocess(a):a).catch(c);try{s.hooks&&(t=s.hooks.preprocess(t));let a=o(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=h(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return c(a)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){const r="<p>An error occurred:</p><pre>"+x(t.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(t);throw t}}},S=new ct;function g(n,e){return S.parse(n,e)}g.options=g.setOptions=function(n){return S.setOptions(n),g.defaults=S.defaults,ae(g.defaults),g};g.getDefaults=N;g.defaults=R;g.use=function(...n){return S.use(...n),g.defaults=S.defaults,ae(g.defaults),g};g.walkTokens=function(n,e){return S.walkTokens(n,e)};g.parseInline=S.parseInline;g.Parser=v;g.parser=v.parse;g.Renderer=L;g.TextRenderer=V;g.Lexer=y;g.lexer=y.lex;g.Tokenizer=C;g.Hooks=z;g.parse=g;g.options;g.setOptions;g.use;g.walkTokens;g.parseInline;v.parse;y.lex;const ht=Object.assign({"/src/posts/error-handling-in-typescript.md":ve,"/src/posts/gmr.md":Se,"/src/posts/i-quit-my-job.md":Re,"/src/posts/improve-site-performance-sapper.md":Te,"/src/posts/keep-it-simple.md":Ie,"/src/posts/the-photo-pipeline.md":Ee});function pt(n){const e=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(n),t={};if(e)for(const r of e[1].split(`
`)){const i=r.indexOf(":");i>-1&&(t[r.slice(0,i).trim()]=r.slice(i+1).trim())}return{metadata:t,body:n.slice(e?e[0].length:0)}}const gt=Object.values(ht).map(n=>{const{metadata:e,body:t}=pt(n);return{metadata:{...e,draft:e.draft==="true",slug:ye(e.title)},html:g.parse(t)}});export{gt as p};
