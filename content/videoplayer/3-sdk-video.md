---
title: "SDK Video"
metaTitle: "SDK Video"
metaDescription: "SDK Video"
---

The Cloudinary Vue JS SDK contains a video component that renders an HTML 5 Video tag.  We'll review the HTML 5 video element and how the SDK Video component augments it.

# HTML 5 Video Tag

The browser is going to choose the first source that it can play based on codec ("type") support.  Adding mp4 and `webm` should cover most browsers. Include "type" to let browser know, or it will try to play even if it can’t handle that type. I’m putting `webm` first because it has slightly better quality and lower file size.

```html
<video controls>
 	<source src="rooster.webm" type="video/webm">
  <source src="rooster.mp4" type="video/mp4">
  <p>Your browser doesn't support HTML5 video. Here is a 
    <a href="https://cloudinary-training.github.io/cld-advanced-concepts/assets/video/rooster.mp4">link to the video</a> instead.
  </p>
</video>
```

If there is no `webm` or `mp4` format of this video available, the script above will have to play the video from the Cloudinary training server. 

## Exercise: SDK Video tag helper 

You've uploaded the `rooster.mov` and the format can't be served except in Firefox.  Check your derived derived images at this point.  You'll see a the thumbnail used in the media library and a jpg that represents the image of the video.

![before SDK create derived videos](https://res.cloudinary.com/cloudinary-training/image/upload/v1588361718/book/video-derivatives-before.png)

Next, run the SDK video helper.

Run the script to create a video tag using the Cloudinary node SDK.

```bash
node video-player/html5/create-cloudinary-video-tag
```

This will generate video tag with the source fallbacks that you need. 

```html
<video
  controls="true"
  poster="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.jpg"
>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.webm"
  type="video/webm"
/>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.mp4"
  type="video/mp4"
/>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.ogv"
  type="video/ogg"
/>
```

Before you open the `video-player/html5/index.html in the browser, look at the derived images in the Media Library and you can see that an **mp4** video derivation now exists. 

![after SDK see mp4](https://res.cloudinary.com/cloudinary-training/image/upload/v1588361827/book/video-derivative-after.png)  

Now, open the `video-player/html5/index.html` in the chrome browser.  Open the Chrome Dev tools Network tab and look refresh.  You'll see that chrome is using the **.webm** format.