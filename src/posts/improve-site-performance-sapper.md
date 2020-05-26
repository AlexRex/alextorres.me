---
title: Hey there, I am using Sapper (Svelte)
summary: How I improved the performance and size of this site using Svelte
date: 2020-05-24
tags: sapper, svelte, javascript, software, ecosoftware
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

The same stuff with NextJS takes up to 300kB, doubling the space. It may not look like much more space—a 1 hour movie in any streaming service can be more than 1 GB—but after reading for a while, I am getting more and more concern of how we waste the resources in the digital world, and how we can adapt the so-called ecological digital design. For instance, there's this French Studio called [Fairness.coop](https://fairness.coop/) (in French) which is aiming to develop all of their products in the most sustainable way, so they have the less ecological impact possible. 

Coming back to the topic, to be really fair with NextJS: 

1. I am using a pretty outdated version.
2. I didn't pay too much attention on optimizing the code.

So I guess the build size and performance can be really boosted to the same level as the Sapper one using a proper version and taking time into optimizations. 
