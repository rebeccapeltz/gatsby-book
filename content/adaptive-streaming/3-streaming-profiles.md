---
title: "Streaming Profiles"
metaTitle: "Streaming Profiles"
metaDescription: "Streaming Profiles"
---

Let's learn to identify adaptive streaming in the browser.  We'll using the Cloudinary Video player to serve HLS files.  HLS will not normally be supported in Chrome but as you examine the network tab in Chrome Dev tools, you'll see the HLS files and the fact that they are being loaded into the app with XHR.

## Exercise: Examine Adaptive Streaming in Network 

If you want to deploy to your own gh-pages server or run incognito to try this out, you can upload the video with adaptive streaming profiles. Notice that this is setup with  eager transformations.  This is a best practice so that when your users request these videos the formats will be ready.

```bash
node adaptive-streaming/prepare/upload-eager-transform.js
```
This upload uses Cloudinary provided streaming profiles for dash and HLS.

```javascript
const upOptions =
{
  resource_type: 'video',
  eager: [
    { streaming_profile: 'hd', format: 'm3u8' },
    { streaming_profile: 'hd', format: 'mpd' }],
  eager_async: true,
  eager_notification_url: 'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader.upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

```

The HTML code below is using the Cloudinary **demo** cloud as context for public ids.  You can substitute your own cloud name to serve videos from your cloud.

You're seeing some new options for the video player here.  We are specify source types and listing a single type as `hls`.  We've chosen a profile provided by Cloudinary, `full_hd`.  This profile specifies transformations for different sized devices.

```javascript
 player.source('rafting', {
  sourceTypes: ['hls'],
  transformation: { streaming_profile: 'full_hd' }
})
```

You can list out the definition of a streaming profile using the SDK Admin API `cloudinary.api.get_streaming_profile` function.  You'll see an array of transformations that define video codec, bitrate, and cropping.  For any sized device this profile will provide information on how chunk and serve the files.


```javascript
{
    "transformation": [
     {
      "width": 320,
      "height": 240,
      "video_codec": "h264:baseline:3.0",
      "bit_rate": "192k",
      "crop": "limit"
     }
    ]
   },
```

```html
<html>
  <head>
    <link
      href="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css"
      rel="stylesheet"
    />
    <script
      src="https://unpkg.com/cloudinary-core/cloudinary-core-shrinkwrap.min.js"
      type="text/javascript"
    ></script>
    <script
      src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js"
      type="text/javascript"
    ></script>
    <title>Adpative Streaming Example</title>
    <link rel="icon" href="../assets/favicon.png" type="image/png">
  </head>
  <body>
    <video id="hls-player" controls class="cld-video-player"></video>
    <script>
      var cld = cloudinary.Cloudinary.new({ cloud_name: 'demo' })
      var player = cld.videoPlayer('hls-player')
      
      player.source('rafting', {
        sourceTypes: ['hls'],
        transformation: { streaming_profile: 'full_hd' }
      })  
    </script>
  </body>
</html>
```
### Look at the Network in Dev Tools

Can you run this video in Chrome?  Can you run this video in Safari? When you get the video running, you should be able to identify the manifest files and the chunked audio and video. 

![hls in Safari](https://res.cloudinary.com/cloudinary-training/image/upload/v1590798988/book/as-hls-safari.png)

You'll see 2 manifest files with the `.m3u8` files. If you click **preview** in the network tab with the first `.m3u8` which is the manifest master, you'll see the available bitrates.

![hls manifest master](https://res.cloudinary.com/cloudinary-training/image/upload/v1590799230/book/hls-manifest-master.png)

The second manifest file can be previewed and here you'll see references to the chunked video files as `.ts`.  These files correspond to the files that you can see loaded into the browser.
![manifest chunks](https://res.cloudinary.com/cloudinary-training/image/upload/v1590799618/book/hls-manifest-chunks.png)

### DASH

You can change the source type in the JavaScript from **hls** to **dash** and open the file in Chrome.  

```javascript
 player.source('rafting', {
  sourceTypes: ['dash'],
  transformation: { streaming_profile: 'full_hd' }
})
```

In Chrome dev tools you'll see that DASH has just one manifest, but that there are two types of chunked files, one for video and one for audio.

![dash manifest](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800002/book/dash-intro.png)

You'll also see XHR is used to read the chunked files.

![dash with XHR](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800124/book/dash-xhr.png)


### Analysis

We should be able to answer these questions now:
- Is the training video using adaptive streaming?
- Which format is it using? HLS or Dash?  
- Did the files start downloading when we loaded the page or when we started playing the video?



