---
title: 'Facial Gravity'
metaTitle: 'Facial Gravity'
metaDescription: 'Facial Gravity'
---
 
We've experiment with positioning based on compass gravity.  Cloudinary uses AI object detection to put the focus and center of gravity on objects within the image.  We'll look at gravity based on facial detection in this section.  There are other types of object detection available as well.


## Exercise: Positioning from Facial Landmarks

We can use `g_auto:face` to focus on faces.  We can also use the **Advanced Facial Attributes Detection** add-on that uses Microsoft Cognitive Services to map out a face and focus on that. Go to add-ons tab in the DAM and add this facial detection service. 

In **settings** check to box to allowed unsigned use of Advanced Facial Attributes.

![facial detection add-on and settings](https://res.cloudinary.com/cloudinary-training/image/upload/v1590962012/book/ou-facial-detection.png)

Start by uploading an image with a face and add the `detection:'adv_face'` to take advantage of the MS Cognitive Services.

```bash
node overlay-underlay/advanced-facial-gravity/upload-advanced-face
```

```javascript
cloudinary.uploader
  .upload('./assets/images/woman-standing.jpg', {
    detection: 'adv_face'
  })
```
Look at the response from this upload and you'll see all of the information gathered by uploading with the detection option.

You'll see the pixels for the bounding box of the face as well as information about emotions and facial landmarks.

```javascript
{
  "status": "complete",
  "data": [
    {
      "bounding_box": {
        "top": 393.9962476547842,
        "left": 371.48217636022514,
        "width": 172.6078799249531,
        "height": 172.6078799249531
      },
      "attributes": {
        "smile": 0.995,
        "head_pose": { "pitch": -10.8, "roll": 1.6, "yaw": 9.6 },
        "gender": "female",
        "age": 22,
        "facial_hair": { "moustache": 0, "beard": 0, "sideburns": 0 },
        "glasses": "NoGlasses",
        "emotion": {
          "anger": 0,
          "contempt": 0,
          "disgust": 0,
          "fear": 0,
          "happiness": 0.995,
          "neutral": 0.004,
          "sadness": 0,
          "surprise": 0
        },
```

Cloudinary provides facial and eye detection.  You can center gravity on a single face or multiple faces.There is a cost to this, so you may want to use it only on signed URLs.  With this you can center on a face or faces for your center of gravity.  You can then apply x, and y positioning from there.

Let's apply an overlay that is using the face as the center of gravity.

```bash
node overlay-underlay/advanced-facial-gravity/sample.js
```

In the code below we've specified a gravity of `adva-face`.  After you see how that works, try using `adv_eyes` as the center of gravity to see the effect.  

Cloudinary also has a built in, no add-on, need facial detection algorithm.  You can change the commenting in the code to try out that effect as well.

```javascript
const url = cloudinary.url('woman-standing', {
  overlay: 'mask-green',
  gravity: 'adv_face',
  // gravity: 'adv_eyes',
  flags: 'region_relative',
  width: '1.3',
  height: '0.7',
  crop: 'fill',
  y: 30
  // gravity: 'face',
  // flags: 'region_relative',
  // width: '1.1',
  // crop: 'scale',
  // x: -10,
  // y: 50
})
```

![advanced face](https://res.cloudinary.com/cloudinary-training/image/upload/v1590962573/book/image.png)


