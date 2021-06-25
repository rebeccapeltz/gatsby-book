---
title: "Video with AI"
metaTitle: "Video with AI"
metaDescription: "Video with AI"
---


In this module we focus on using Add-ons that provide AI Services when working with video.

We'll look at solutions for image upload workflows:

1. Create video subtitles and captions using Google Vision 
2. Google AI Video Moderation for User generated content

I recommend this background reading: [Automate Your Media Assets’ Workflow With Machine Learning](https://res.cloudinary.com/cloudinary-training/image/upload/v1589477837/book/wf-video-blog.png).

![Automate Your Media Assets’ Workflow With Machine Learning](https://res.cloudinary.com/cloudinary-training/image/upload/v1589477837/book/wf-video-blog.png)

---

## Video Subtitles and Captions

### Translation?

Cloudinary offers a tag translation Add-on. If you want to translate video transcriptions look into incorporating a Translation API such as [Google Translate](https://cloud.google.com/translate#section-1), [Yandex](https://tech.yandex.com/translate/), or [Watson](https://cloud.ibm.com/apidocs/language-translator).

### Google AI Video Transcription

We can use **Google AI Video Transcription** to create both subtitles and captions.  The difference between subtitles and captions is that captions may include sounds besides people talking, such as "dog barking", where as subtitles are strict text translations of what is being said.

### Google AI Video Transcription Add-on

To begin, you need to add the **Google AI Video Transcription** Add-on. 

Navigate to the [Add-ons](https://cloudinary.com/console/addons) page in and select the free plan.

![Google AI Video Transcription](https://res.cloudinary.com/cloudinary-training/image/upload/v1589478383/book/wf-google-ai-video-transcription.png)

### Subtitles

There can be substantial cost associated with creating subtitles manually.  Using **Google AI Video Transcription**, or **Microsoft Azure Indexer**, to create the text and then the Cloudinary subtitle **overlay** option to apply the subtitles to the video can reduce costs. We can use transformations to position and style the subtitles.

The **Google AI Video Transcription** Add-on uses the Google Speech API. We’re going to use the transcribed video to create subtitles in this exercise. Subtitles are essentially **text overlays** and we can use SRT or VTT files to provide the text content. Google will create these files for us using the Cloudinary Upload API. 

SRT and VTT are different formats for capturing text transcription and timing.

- SRT: Subrip Text Format
- VTT: Video Text Tracks

#### Exercise: Create subtitle and caption files

To create video transcription using the Google Add-on, execute

```bash
node user-upload-workflow/google-video-transcription/create-transcriptions
```

The transcription is triggered by the `raw-convert: google_speech:srt:vtt` option.  There is a webhook that can help us to see when transcription is complete. 

![webhook reports complete](https://res.cloudinary.com/cloudinary-training/image/upload/v1589481800/book/wf-video-transcribe-web-hook.png)

We're generating both transcriptions file types: SRT and VTT.  We'll use the SRT for the subtitles and later, the VTT for captions.

```javascript
cloudinary.uploader
 .upload('./assets/video/UnderwritersLaboratoryPsa.mp4', {
   resource_type: 'video',
   public_id: 'ul-video',
   raw_convert: 'google_speech:srt:vtt',
   notification_url:
     'https://webhook.site/c49e5d9e-15dd-43c0-b3c1-9e744d92cdbe'
 })
 .then(result => console.log(result))
 .catch(error => console.log(error))
```
You can see similarities between the VTT and SRT files.  The VTT file format is show on the left. Both formats provide a numbered list of transcribed text that are paired with a start and end time.  You can manually modify these files.  You can use the start and end times to pair the text with what frames are show on the video. 

![Compare SRT and VTT formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1589479037/book/wf-video-srt-vtt.png)

If you look in the Media Library, you'll see that 5 files were created during the upload.

Both SRT and VTT have duplicate `.en-US` files which indicate the transcriptions awareness of the language.  

![SRT, VTT and Transcript files](https://res.cloudinary.com/cloudinary-training/image/upload/v1589481449/book/image.png)

You also get a `.transcript` file which is a JSON formatted file that provides ML confidence reporting.  There is also word for word mapping to start and end time.

```javascript
{ "confidence": 0.0, "transcript": "", "words": [] },
  {
    "confidence": 0.8454251289367676,
    "transcript": "an electric frying pan",
    "words": [
      { "word": "an", "start_time": 1.7, "end_time": 1.9 },
      { "word": "electric", "start_time": 1.9, "end_time": 2.4 },
      { "word": "frying", "start_time": 2.4, "end_time": 2.8 },
      { "word": "pan", "start_time": 2.8, "end_time": 3.3 }
    ]
  },

```

#### Exercise: Apply SRT for subtitles  

Let apply subtitles to the video.

```bash
user-upload-workflow/google-video-transcription/subtitles/video-tag-with-subtitles.js
```

We can use the familiar `overlay` option to apply subtitles with the video helper in the SDK.  We're using the `.srt` file.  Notice we can apply the same kind of text transformations that we have previously used with other text overlays.  We'll be looking for yellow on a black background positioned at the top of the video for this example.

```javascript
const video = cloudinary.video('ul-video', {
  overlay: {
    public_id: 'subtitles:ul-video.srt'
  },
  controls: true,
  background: 'black',
  color: 'yellow',
  gravity: 'north'
})

console.log(video)

```
You can copy past the video tag created above into the index.html file and then see the subtitles.

```bash

user-upload-workflow/google-video-transcription/subtitles/index.html
```

```html
<video controls
 poster="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.jpg"
   >
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.webm"
       type="video/webm"
     />
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.mp4"
       type="video/mp4"
     />
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.ogv"
       type="video/ogg"
     />
   </video>

```

When you add the video tag the is using your cloud to index.html, you should see the yellow on black subtitles in this video.

![Rendering subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589499647/book/wp-subtitles.png)

This is an HTML 5 video tag, so you don't have many styling options.

#### Exercise: Add Captions 

In this exercise, you're going to use a Video Player to render captions.

Execute this script to open the Video Text Tracks file natively in your browser. 

```bash
node user-upload-workflow/google-video-transcription/captions/create-vtt-url.js

```

 If you change `vtt` to `srt` and try to open the sub rip text format, you'll see that it's not supported by your browser.  This format can be use for captions as it can be played as a **track** with the video.

```javascript

const url = cloudinary.url('ul-video.vtt', {
  resource_type: 'raw'
}):
```

The URL created for the `vtt` file can be used in the setting up the Video Player.

Open the `user-upload-workflow/google-video-transcription/captions/index.html` file and locate the HTML and JavaScript for the Video Player

```html
<video id="example-player" controls muted class="cld-video-player cld-video-player-skin-dark"
  data-cld-transformation='{ "width": 400, "crop": "fill"}'>
</video>
```

We add 2 tracks using the `textTracks` option.  We're using the URL created in the node script above.  The same URL is used for both the caption and the subtitle.

```javascript
 document.addEventListener("DOMContentLoaded", function () {
    const cld = cloudinary.Cloudinary.new({
      cloud_name: 'cloudinary-training'
    })
    const player = cld.videoPlayer('example-player')

    // add your video text tracks
    player.source(
      'ul-video',
      {
        textTracks: {
          captions: {
            label: 'English captions',
            language: 'en',
            default: true,
            url: 'https://res.cloudinary.com/cloudinary-training/raw/upload/ul-video.vtt'
          },
          subtitles: [
            {
              label: 'English subtitles',
              language: 'en',
              url: 'https://res.cloudinary.com/cloudinary-training/raw/upload/ul-video.vtt'
            }
          ]
        }
      });

  })

```
Set the cloudname to your cloud name in the index.html and open in browser.

```bash
user-upload-workflow/google-video-transcription/captions/index.html
```

Because this is a video player you can choose to show captions or subtitles.  In our case they are both the same, but the captions could be edited to include other audio information.  

![choose captions or subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589502883/book/wp-choose-captions-subtitles.png)

You should see either captions or subtitles at the bottom of the video.  You can experiment with other settings to see that the user has control over the display of the text.

![captions and subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589502952/book/wp-captions-subtitles-bottom.png)


---

## Google Video AI Moderation 

When we allow users to upload assets that you will serve from your website, we want to provide ways to check that these assets meet our standards.  We've looked at manual moderation with image background removal and blurriness.  In those cases we did make moderation but we didn't address the problem that the asset, because it was public, could be accessed before it was approved.

Look at the chart below to better understand the flow of the asset as it makes its way to the moderation queue.

![asset flow to moderation queue](https://res.cloudinary.com/cloudinary-training/image/upload/v1589568005/book/wf-video-moderation-flow.png)

We use webhooks to alert our system that the moderation process has completed, but the moderation won't even start until the asset is uploaded and ready for request. If a user requests the asset before it's completed moderation and its something that we would reject, that asset could get cached on the CDN even though we wouldn't approve of it.

In this section we'll look at 2 ways to keep the uploaded image out of the public's view until the moderation process is complete and the asset is approved.  The two techniques will look at are

- Upload the asset with an `access_control` option with a **token** and don't remove unless approved
- Upload the asset as `private` and put it in a holding directory until approved and then `rename` to make it public and move the directory from which it will be served

### Steps in Moderation with Google Video Moderation

1. Your users upload a video to Cloudinary through your application.
2. The uploaded video is sent to Google for moderation.
3. There are multiple levels of rejection to choose from depending on your threshold for violence and pornography with “possible”, “likely” or “very likely” with “likely” being the default.
4. The video is marked as either approved or rejected based on the results returned by Google.
5. An optional notification callback is sent to your application (webhook) with the video moderation results.
6. A rejected video is moved to a secondary backup queue, and you may want to clean this up to keep your media library organized.
7. Moderated videos can be listed programmatically using Cloudinary's Admin API or interactively using the Media Library in your account console.
8. You can manually override the automatic moderation results using the Admin API or the Media Library

### Google Video Moderation Add-on

Navigate to the [Add-ons](https://cloudinary.com/console/addons) page in and select the free plan.

![Google Video Moderation](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582510/book/wp-video-moderation.png)

### Exercise: A Rejected Video

We can restrict client access by adding `access_control:token`.  Recall that we used the `access_control` option with `anonymous` and a start and end date to add time based access control.  We can use the `token` access control even if we though we don’t support.

If we comment out the access control option, we’ll see that we have access to the video before moderation is complete with no access control. 

When we add access control to the upload, and the video is restricted
When moderation is complete we can remove the access control and delete any rejected videos to save on storage costs.

```bash
node user-upload-workflow/google-video-moderation/rejected/upload-video.js
```

```javascript
cloudinary.uploader
  .upload('./assets/video/hot-tub.mp4', {
    resource_type: 'video',
    public_id: 'hot-tub',
    access_control: [{ access_type: 'token' }],
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c'
  })
  .then(result => {
    console.log(result)
    console.log(result.moderation.repsonse)
  })
  .catch(error => console.log(error))

```

The video will go into a pending state while Google is processing it.  If you go to the Media Library and look at the video before the moderation process is complete, you can see it as restricted.


![restrict video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582172/book/wp-video-restricted.png)

Once the moderation processing is complete, you won't find it in the Media Library if it has been rejected.  Instead, you can go to the Google Video Moderation queue and see that it is rejected.

![reject video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582384/book/image.png)

If you check the website.hook final response, you'll get detailed information on where the pornography or violence was detected.

```javascript
{
  "moderation_response": {
    "moderation_confidence": "POSSIBLE",
    "frames": [
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 0.415886
      },
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 1.5739779999999999
      },
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 2.422259
      },
    ...
```
Since we indicated a threshold of  **possible**, the video was rejected. This conclusion can be found at the bottom of the response.

```javascript
 "moderation_status": "rejected",
  "moderation_kind": "google_video_moderation",
  "moderation_updated_at": "2020-05-15T22:32:19Z",
  "public_id": "hot-tub",
  "uploaded_at": "2020-03-19T22:53:48Z",
  "version": 1589581905,
  "url": "http://res.cloudinary.com/pictures77/video/upload/v1589581905/hot-tub.mp4",
  "secure_url": "https://res.cloudinary.com/pictures77/video/upload/v1589581905/hot-tub.mp4",
  "etag": null,
  "notification_type": "moderation"

```

#### Manage the Rejected Queue

We need to manage both the rejected and approved queues.  We might fire off the script below on a periodic basis to remove rejected videos.  We're using the Admin API for this, so the more we can bundle rejections, the less quota we'll use.

You could start with just listing the rejected video.  While the response shows the URL for the video, you won't be able to view it because its rejected.  In addition, its still has the token access control, so its restricted.

```bash
user-upload-workflow/google-video-moderation/rejected/list-rejected-videos.js
```

```javascript
{
 "resources": [
  {
   "asset_id": "1c0c00f6a8c40d277369708a14726b0a",
   "public_id": "hot-tub",
   "format": "mp4",
   "version": 1589582125,
   "resource_type": "video",
   "type": "upload",
   "placeholder": true,
   "created_at": "2020-03-19T22:53:48Z",
   "bytes": 0,
   "width": 720,
   "height": 1280,
   "backup": true,
   "access_mode": "public",
   "access_control": [
    {
     "access_type": "token"
    }
   ],
   "url": "http://res.cloudinary.com/pictures77/video/upload/v1589582125/hot-tub.mp4",
   "secure_url": "https://res.cloudinary.com/pictures77/video/upload/v1589582125/hot-tub.mp4"
  }
 ],
 "rate_limit_allowed": 500,
 "rate_limit_reset_at": "2020-05-15T23:00:00.000Z",
 "rate_limit_remaining": 499
}

```

Use a combination of the Admin API `resources_by_moderation` and the Upload API `destroy` to clear out the rejected queue.

```bash
node user-upload-workflow/google-video-moderation/rejected/destroy-rejected-videos.js
```

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'rejected', {
    resource_type: 'video'
  })
  .then(result => {
    // delete anything that's rejected
    for (const video of result.resources) {
      cloudinary.uploader
        .destroy(video.public_id, {
          invalidate: true,
          resource_type: 'video'
        })
        .then(result => {
          console.log('destroying: ', video.public_id)
          console.log(result)
        })
        .catch(error => console.error(error))
    }

    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })


```

### Exercise: An Accepted Video

Now, we'll upload a video that we know will be accepted. We'll use the same  `access_control` setting to restrict the video until its been put into the approved queue.  

```bash
node user-upload-workflow/google-video-moderation/approved/upload-video
```

```javascript
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    resource_type: 'video',
    public_id: 'elephants',
    access_control: [{ access_type: 'token' }],
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c'
  })
  .then(result => {
    console.log(result)
    console.log(result.moderation.repsonse)
  })
  .catch(error => console.log(error))

```

Event though we know this video will ultimately be approved, it is restricted because of the `access_control` setting.

![restrict video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582172/book/wp-video-restricted.png)

Once moderation is complete, we'll see the video in the approved queue, but it's still restricted.


We can remove the restriction by removing the `token` setting.

```bash
node user-upload-workflow/google-video-moderation/approved/reset-access-control-uploaded-video.js
```

Again, using a combination of the Admin API get a list of approved videos and then update the `access_control` to `anonymous` to remove the token and make the video public. 

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // remove tokens from approved videos
    for (const video of result.resources) {
      cloudinary.api
        .update(video.public_id, {
          resource_type: 'video',
          access_control: [{ access_type: 'anonymous' }],
          invalidate: true
        })
        .then(result => {
          console.log(
            'no version url:',
            cloudinary.url(result.public_id, {
              resource_type: 'video',
              format: result.format
            })
          )
        })
        .catch(error => console.error(error))
    }
    console.log(result)
  })
```

## Authentication Exercise

We'll look at another technique for restricting access to a video until moderation is complete.  In this case, we mark all uploaded videos as `authenticated` and we put them in a separate folder.  

```bash
node user-upload-workflow/google-video-moderation/approved/upload-authenticated.js
```
All videos are private and put in a directory named **moderated**

```javascript
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    folder: 'moderated',
    use_filename: true,
    unique_filename: false,
    resource_type: 'video',
    type: 'authenticated',
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
    invalidate: true
  })

```
These videos will remain inaccessible until we've completed the moderation process and marked the video as **approved**.  The script uses the Admin API to get a list of approved videos.  Then it uses the Upload API to **rename** the videos and in the process change their type from `authenticated` to `upload` making them public.  We also change the name of the public id by removing the directory through string manipulation.  This will put the video in the root of the cloud and allow public access.

```bash
node
```

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // move any approved videos out of moderation folder, and set as public
    for (const video of result.resources) {
      if (video.type === 'authenticated') {
        const newPublicId = video.public_id.substring(10) // removing 'moderated' folder name and slash

        console.log(
          'video.public_id',
          video.public_id,
          'newPublicID',
          newPublicId
        )
        cloudinary.uploader
          .rename(video.public_id, newPublicId, {
            resource_type: 'video',
            type: 'authenticated',
            to_type: 'upload',
            invalidate: true,
            overwrite: true
          })
          .then(result => {
            console.log(
              'new version url:',
              cloudinary.url(result.public_id, {
                resource_type: 'video',
                format: result.format
              })
            )
          })
          .catch(error => console.error(error))
      }
    }
```
After the script above is run the image will be moved from the `moderation` directory to the root. The approved video is now ready to serve with public access. 

![authentication removed for public access](https://res.cloudinary.com/cloudinary-training/image/upload/v1589583948/book/wf-moderation-auth-approved.png)

---

## Summary

Using Google Speech to analyze video content in order to create transcriptions which can be use for subtitles and captions
Using Google AI for content moderation that can flag pornography and violence and you can use Admin or Upload API to remove rejected videos. We analyzed the gap between upload and async add-ons processing and how to prevent access to assets not approved
The code in these work-flows can be integrated into your back-end using a notification queue which we mocked with webhook.site.
