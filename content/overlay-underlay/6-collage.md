---
title: "Collage"
metaTitle: "Collage"
metaDescription: "Collage"
---

Let's look deeper into how we can change the "center of gravity" when working with overlays and underlays by creating a "collage".  A "collage" in this context refers to a single image made up of multiple images.  We start with a base image and then we "stretch" the boundaries by using X and Y positions for the other images that are outside of the base image boundaries.  

You can read more about creating collages in this [blog](https://blog.fullstacktraining.com/creating-memes-with-cloudinary/) about creating a popular meme.  We'll create a similar meme image in the next exercise.

![blog meme](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-blog-meme.png)

## Exercise: Create Collage

You should already have uploaded the images for this collage. 

```bash
node overlay-underlay/collage/upload-collage-images
```

We'll work through creating the collage in steps so that it becomes clear how the center of gravity changes when we use positioning that stretches the canvas of the overall image.  Keep in mind that the center of gravity always refers to the locations from which X and Y are measured.


 |Description          |Code|
 | :-------------------------------------------: | :-------------------------------------------: |
|Step 0 Upper left image|**overlay-underlay/collage/step0** f_auto and q_auto are setup as a separate transformation|
|Step 1 Add text over to upper left image|**overlay-underlay/collage/step1** you’ll need to bring f_auto and q_auto into image transformation but you’ll see it as a separate chained transformation|
|Step 2 Add upper right image and text|**overlay-underlay/collage/step2**|
|Step 3 Add lower left image and text|**overlay-underlay/collage/step3**|
|Step 4 Add lower right image and text|**overlay-underlay/collage/step4**|

### Step 0
In this step we produce an image with text overlay. We establish the center of gravity as the center of the base image of a Lion.  The star in the image below denotes the center of gravity.

![step 0](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-collage-0.png)


```javascript
const url = cloudinary.url('lion-head', {
  transformation: [
    {
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'center'
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
  ]
})
```

### Step 1

In step 1 we add add a text overlay. Text is positioned relative to the South of the base image. 

![step 1](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-collage-1.png)

```javascript
 transformation: [
    {
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'center'
    },
    {
      overlay: {
        font_family: 'Impact',
        font_size: 60,
        font_style: 'stroke',
        text: 'LINKEDIN'
      },
      color: 'white',
      gravity: 'south',
      y: 10
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
  ]

```

### Step 2
These steps are additive, so all that is shown below is adding an image with the cropped to the same dimensions as the base, but positioned fully to the right of the base.  This positioning changes the center of gravity of the entire canvas from the center of the base image, to a point between the 2 images.

The overall dimensions of the image have changed.  Notice where the gold star representing the center of gravity has moved.

![step 2](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-collage-2.png)


```javascript
 {
      overlay: 'big-glasses',
      border: '3px_solid_white',
      crop: 'fill',
      gravity: 'center',
      width: 300,
      height: 300,
      x: 300
    },
    {
      overlay: {
        font_family: 'Impact',
        font_size: 60,
        font_style: 'stroke',
        text: 'FACEBOOK'
      },
      color: 'white',
      gravity: 'south',
      x: 150,
      y: 10
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
```

### Step 3

In this step we add an image with the same dimensions as the base directly below the base image.  The X position is negative because we are moving to the left from the horizontal center created in step 2 above.  The Y position is positive because we are moving down to create a new vertical center.  When this image is rendered, the center of gravity is at the point where the 3 images intersect.

The star has moved down as the height of the image changes with the addition of the 3rd image.

![step 3](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-collage-3.png)

```javascript
 {
      overlay: 'funny-cow',
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      x: -150,
      y: 300
    },
    {
      overlay: {
        font_family: 'Impact',
        font_size: 60,
        font_style: 'stroke',
        text: 'INSTAGRAM'
      },
      color: 'white',
      gravity: 'south',
      x: -150,
      y: 10
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
```

## Step 4

In this final step, the 4th image is added to the lower left, but this doesn't change the center of gravity.

![step 4](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-collage-4.png)

```javascript
{
      overlay: 'bird-close-up',
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      x: 150,
      y: 150
    },
    {
      overlay: {
        font_family: 'Impact',
        font_size: 60,
        font_style: 'stroke',
        text: 'TINDER'
      },
      color: 'white',
      gravity: 'south',
      x: 150,
      y: 10
    },
```