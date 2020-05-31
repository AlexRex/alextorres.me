---
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

Finally, I rely on the `picture` [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) to either display a WebP version or JPEG version, depending on browser compatibility: 

```html
<picture>
  <source srcset={photo.resolutions['1080'].webpFile} type="image/webp" />
  <source srcset={photo.resolutions['1080'].jpgFile} type="image/jpeg" />
  <img src={photo.resolutions['1080'].jpgFile} alt={photo.metadata.id} />
</picture>
```
