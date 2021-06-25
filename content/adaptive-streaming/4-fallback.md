---
title: "Fallback"
metaTitle: "Fallback"
metaDescription: "Fallback"
---

We're going to look at a real world example now and create a custom streaming profile that will allow the video player to run a video in any browser.

The chart below shows the optimal codec and format for each browser with a fallback that should work in any browsr.

- Chrome: DASH, VP9
- Safari: HLS, h265
- Universal: HLS and mpd, h264 


![formats, codecs, and browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800382/book/codec-brower-adpative-formats.png)

## Exercise: Look at Existing Profiles

It will be useful to list and read profiles provided by Cloudinary.  We'll see the `full-hd` profile that we used earlier.

```bash
node adaptive-streaming/fallback/list-streaming-profiles.js
```

```javascript
cloudinary.api
  .list_streaming_profiles()
```

With this list we can use it as a template to build a custom profile.

The next step is the output an existing profile.

```bash
node adaptive-streaming/fallback/details-predefined-hd-profile.js
```

```javascript

cloudinary.api
  .get_streaming_profile('hd')
  .then(result => console.log(JSON.stringify(result, null, 1)))
```

## Exercise: Create 3 Custom Profiles

We're going to create 3 custom profiles to match the 3 options in discussed above

- h264 see adaptive-streaming/fallback/create-custom-profile-h264.js
- h265 see adaptive-streaming/fallback/create-custom-profile-h265.js
- vp9 see adaptive-streaming/fallback/create-custom-profile-vp9.js

What we've done is copy the `hd` profile transformations and modified the codecs.

Now we can upload the video with our new custom profiles.

```bash
node adaptive-streaming/fallback/prepare.js
```
As we did above with the Cloudinary profile, we upload with our 3 new profile.

```javascript
// create dash/vp9 (chrome/ff), hls/h265(apple), hls/h264 (universal) custom profiles
const upOptions = {
  resource_type: 'video',
  eager: [
    { streaming_profile: 'training_hd_vp9', format: 'mpd' },
    { streaming_profile: 'training_hd_h264', format: 'm3u8' },
    { streaming_profile: 'training_hd_h265', format: 'm3u8' }
  ],
  eager_async: true,
  eager_notification_url:
    'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader
  .upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
```
The webhooks response allows us to see the creation of the **m3u8** and **mpd** files.

![webhooks](https://res.cloudinary.com/cloudinary-training/image/upload/v1590801961/book/as-webhooks.png)

Once the processing is complete, we can go to the Media Library and click through transformations for the video to find derived assets and we should see a list of transformations that support the streaming profiles created.

![derived from streaming profiles](https://res.cloudinary.com/cloudinary-training/image/upload/v1590802044/book/as-derived-videos.png)

## Exercise: Use Fallback

Now we can use the Video Player to load all 3 custom profiles and stream in any browser.

Look at the javscript code in **adaptive-streaming/fallback/index.html**.  You can see all 3 `sourceTypes` and the browser will choose the first one it can use.  You can see that the final fallback is mp4 which is not using any adaptive streaming.

You can try this out on the Cloudinary training server if you are not using gh-pages or Chrome incognito mode:

https://cloudinary-training.github.io/advanced-concepts/adaptive-streaming/fallback/index.html



```javascript
    const sources = {
      publicId: "whale",
      sourceTypes: ["dash/vp9", "hls/h265", "hls/h264", "mp4"],
      sourceTransformation: {
        "dash/vp9": [
          {
            streaming_profile: "training_hd_vp9"
          }
        ],
        "hls/h265": [
          {
            streaming_profile: "training_hd_h265"
          }
        ],
        "hls/h264": [
          {
            streaming_profile: "training_hd_h264"
          }
        ],
        "mp4": [
          {
            raw_transformation: "q_auto"
          }
        ]
      }
    };
    const player = cld.videoPlayer("example-player")
    player.source(sources);

```
Try this out in all browsers and confirm they are using adaptive streaming and that they are all able to stream the video.

![fallback in different browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590802568/book/as-fallback.png)

## Exercise: DASH only

What happens if we leave out the streaming profile for HLS?  Look at the **adaptive-streaming/fallback/dash-only.html** web page.  Open it in the different browsers.  Is there fallback to `mp4`?

```javscript
sourceTypes: ["dash/vp9","mp4"],

```


