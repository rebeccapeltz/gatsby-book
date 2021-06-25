---
title: "Video Upload Response"
metaTitle: "Video Upload Response"
metaDescription: "Video Upload Response"
---

## Use case

You allow your customers to upload video and they upload **.mov** files from their Apple devices. Not all browsers serve this format.  How can format this video to make it available for all browsers and devices? 

Let start by uploading video and look at the response.

## Cloudinary video upload repsonse

Look at the upload response to learn more about video formatting and terminology.

### Exercise: Upload a video and examine the response

```bash
node video-player/upload-rooster.js
```

```javascript
cloudinary.uploader.upload('./assets/video/rooster.mov', {
 public_id: 'rooster',
 type: 'upload',
 overwrite: true,
 invalidate: true,
 resource_type: 'video'
})
```
Let's define the items called out in yellow in the reponse.

![video upload response](https://res.cloudinary.com/cloudinary-training/image/upload/v1588356470/book/player-response.png)

- audio and video codecs: algorithms for formatting audio and video content which often provide compression 
- video level: quality meaure with 100 being the highest
- dar: display aspect ratio which matches the ratio of width : height in the repsonse
- video format: **.mov** is a file extension and represents a container that can hold audio and/or video
- is_audio: Cloudinary reports true if this file contains only audio
- frame_rate: measure of **frames per second** where a calculation of fps * duration = nb_frames (number of frames)
- duration: length of video in seconds 

**Note:** If you want to serve just audio, you can upload it with the resource type set to "video".

## Codecs, Containers and Browsers

The next two sections introduce the relationship between codecs, containers and browsers.  You'll see that certain codecs are contained by certain formats, and certain formats are served by certain browsers.

### Codecs and Containers 

The chart below lists some common codecs and you'll see them referenced in this course, especially in the Adaptive Streaming module.  This chart shows how familiar formats, such as mp4, can contain a number of different codecs. Only video codecs are shown in this chart.

![Codecs and Containers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588357375/book/codecs-containers.png)

### Containers to Browsers   

The table below shows browsers that can be used to serve each of the listed container formats. Referring back to our **Use Case** with the uploaded **.mov** file, we can see from this chart that only Firefox can serve that format, whereas all of the browsers can serve **.mp4** formats.

![Containers to Browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588358016/book/container-browser.png)


## Video Formats supported by Cloudinary Video Player

Looking ahead to implementing the video player, we can see that while many formats can be uploaded, not all can be served.  We'll see that Cloudinary transformations can be used to convert to deliverable formats.

![Cloudinary Video Formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1588358368/book/cl-video-formats.png)  


