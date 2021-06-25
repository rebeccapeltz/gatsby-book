---
title: "Video in Vuejs app"
metaTitle: "Video in Vuejs app"
metaDescription: "Video in Vuejs app"
---

## Video in a JavaScript Single Page App 
Questions come up in support on how to integrate the Video Player into JavaScript SPA Framework code. We’ll see that it's a matter of determining how to:

- import libraries
- add video tag to template
- add Vue.js Vuejs SDK video tag
- execute `videoPlayer` function


In this section we'll implement both the video player and the Vuejs SDK in a Vue.js app.  This provides a comparison of implementations and results for each of these methods of making video available in a front end framework application.

## Exercise: Run a Vue.js app

You’ll need to have the Vue.js CLI installed to run these commands: 

```bash
npm install -g @vue/cli
```

Start by uploading a logo image.  

```bash
node video-player/upload-logo.js
```

Start the app in development mode.

```bash 
cd video-player/vuejs
npm install
npm run serve
``` 

Open in browser at http://localhost:8080/ 

You'll see an app with 2 routes: `player` and `tag`.  These routes run the same video using the Cloudinary Video Player and the Cloudinary generated HTML 5 video tag respectively.  

![tag view](https://res.cloudinary.com/cloudinary-training/image/upload/w_400/book/vuejs-tag-view.png)

![player view](https://res.cloudinary.com/cloudinary-training/image/upload/w_400/book/vuejs-player-view.png)

You already have experience running these in a static HTML `index.html` but now you'll see how to incorporate these in an Vue.js application.  

## Vue.js SDK vs Cloudinary Video Player

The table below compares the JavaScript objects that render Video Player and Vue.js HTML 5 tag. The biggest difference between these objects is that the Vue.js SDK will render an HTML 5 video tag, while the Video Player will render all the elements needed to construct a video player. It important to note that the video player uses a global object while the vuejs SDK uses a Vue plugin.  This can be an issue in single page apps that use a build process that requires typing or linting.

![video player vs vue.js object](https://res.cloudinary.com/cloudinary-training/image/upload/v1588367364/book/video-player-vs-vuejs-objects.png)

## Coding 


You can see the dependencies for this app in the package.json.  

```javascript
 "dependencies": {
    "cloudinary-core": "^2.8.2",
    "cloudinary-video-player": "^1.3.4",
    "cloudinary-vue": "^1.0.1",
    "current-script-polyfill": "^1.0.0",
    "lodash": "^4.17.15",
    "vue": "^2.5.22",
    "vue-router": "^3.1.6"
  },
  ```
 The Vuejs app requires `vue` and the `vue-router` provides routing.  The Vue.js SDK only requires `cloudinary-vue`.  The video player requires `cloduinary-core`, `cloudinery-video-player`, `lodash` and `current-script-polyfill`. 

#### Video Player

Add the following the `<script>` in the `Player` view.

```javacript
import "../node_modules/cloudinary-video-player/dist/cld-video-player.min.css"
import cloudinary from 'cloudinary-core';
import "../../node_modules/cloudinary-video-player/dist/cld-video-player.min.js";
```

Add the following to the template portion of the `Player` view.

```html
<video id="demo-player" width="500" class="cld-video-player" ></video>
```

Then, add the code that instantiates the JavaScript SDK and wraps the video tag above in Player elements.  The code is added to the `mounted` life-cyle event to so that it will not be executed until the DOM has been mounted and you can manipulate it.  If you were working with the **react** framework you might use the `componentDidMount` life-cyle hook or with  **angular**, the `ngOnInit` life-cycle hook to set up the video player code.

Notice that there is an **eslint** exception because the `cld` object is global.

```javascript
 mounted: function() {
   /*global cloudinary*/
   /*eslint no-undef: "error"*/
   const cld = cloudinary.Cloudinary.new({
     cloud_name: "<cloud name>"
   });
   const demoplayer = 
         cld.videoPlayer("demo-player").width(600);
   demoplayer.source("<public id>");
}

```

#### Vuejs SDK

Instantiate Vue and provide the cloud name in `main.js` .

```javascript
import Cloudinary from 'cloudinary-vue';
Vue.use( Cloudinary, { 
    configuration: {cloudName: "<cloud name>"}
});
```

Install the component in the template portion of the Tag view.  You can optionally supply the cloud name in the the `cld-video` component.

```html
<cld-video cloudName="<cloud name>" publicId="<public id>"> 
</cld-video>
```