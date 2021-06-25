---
title: "Video Player"
metaTitle: "Video Player"
metaDescription: "Video Player"
---

In this section we'll see how to get the Cloudinary Video Player running on a static web page.

## Exercise: Loading Libraries

JavaScript libraries available on [CDN](https://unpkg.com/#/) or [npmjs.org](https://www.npmjs.com/package/cloudinary-video-player).  We'll use both in this course.  For this section, we've mocked a build process that installs node_modules and copies them to a `my_node_modules` directory.  This allows use to serve this [page](https://cloudinary-training.github.io/cld-advanced-concepts/video-player/video-player.html) from github.io without uploading `node_modules`.  

There are 3 dependencies for the full video player that need to be installed.

```bash
npm install lodash cloudinary-core cloudinary-video-player
```  

Look at code and open in browser:  `video-player/video-player.html`

The HTML below shows that we need to reference a CSS file, `lodash` (a JavaScript utility library), `cloudinary-core` (the JavaScript SDK), and `cld-video-player.min.js` (the video player).

```html
<head>
  <link href="./my_node_modules/cld-video-player.min.css" rel="stylesheet"/>
</head>
...
<script src="./my_node_modules/lodash.js" type="text/javascript"></script>
<script src="./my_node_modules/cloudinary-core.js" type="text/javascript"></script>
<script src="./my_node_modules/cld-video-player.min.js" type="text/javascript" ></script>

```

## Exercise: Rendering a Video Tag 

Look at the HTML portion of the `index.html`.  We need to render an HTML5 video tag and supply and identifier, in this case and `id`.  We can add standard attributes such as `controls` and `muted`.  We can also use video player styles the we get from the CSS imported above. The `cld-fluid` class will cause the video to fill the container which, in this case is a 400px `div`.

```html
<div style="max-width:400px">
  <video
    id="doc-player"
    controls
    muted
    class="cld-video-player cld-fluid"
  ></video>  
</div>
```

## Exercise: JavaScript Instantiation

Because we're loading JavaScript libraries, the code is wrapped in a `DOMContentLoaded` event listener.  

We start by instantiating the SDK cloudinary object and providing the cloud name from which the video will be delivered.  For this example we instantiate the video player form the cloudinary object by referencing the element id, `doc-player`.  Finally, we provide a public ID as an argument to the player's `source` function.

```javascript 
document.addEventListener('DOMContentLoaded', async () => {
   const cld = window.cloudinary.Cloudinary.new({
     cloud_name: 'demo'
   })
   const demoplayer = cld.videoPlayer('doc-player')
   demoplayer.source('race_road_car')
   })

```

## What is rendered?

If you inspect the elements in the rendered video player, you'll see that the JavaScript has wrapped the initial video tag in a number of other elements.  These elements create the video player.  They provide a set of DOM objects that fire events that can be listened to an acted on, as well as styled.  

![video player elements](https://res.cloudinary.com/cloudinary-training/image/upload/v1588365037/book/video-player-elements.png)