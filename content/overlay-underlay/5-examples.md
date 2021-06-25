---
title: 'Examples'
metaTitle: 'Examples'
metaDescription: 'Examples'
---

Let's look at some examples

## Exercise: Study Examples

We're going to execute these script to create examples of overlay and underlay.

|                        Description                         |                           Code                           |
| :--------------------------------------------------------: | :------------------------------------------------------: |
|             Overlay image with text and image              |       `node overlay-underlay/overlay-image/sample`       |
|             Overlay video with text and image              |       `node overlay-underlay/overlay-video/sample`       |
| Multiple layers with image underlay and with text overlays |        `node overlay-underlay/multi-layer/sample`        |
|                Underlay text beneath image                 | `node overlay-underlay/underlay-text-under-image/sample` |

Let's look at these examples one at a time.

### Overlay image with text and image

The base image here is a hand pointing to a chalkboard. The goal is to layout some text and image in specific positions. There are 2 overlay. They both use **north** gravity which is top center. From there you can place text and image exactly where needed.  We chain the auto format and auto quality at the end of the chain because they can be applied to image in its final state.

```javascript
const url = cloudinary.url('chalkboard', {
  transformation: [
    { width: '500', crop: 'scale' },
    {
      overlay: 'shell',
      crop: 'fit',
      gravity: 'north',
      width: 150,
      x: -70,
      y: 50,
      radius: 30,
    },
    {
      overlay: {
        font_family: 'Trade Winds',
        font_size: 20,
        text: '  Fibonacci  ',
      },
      color: '#DC7633',
      background: '#222',
      'font-weight': 'bold',
      effect: 'brightness:50',
      gravity: 'north',
      width: 150,
      x: 90,
      y: 75,
    },
    { fetch_format: 'auto', quality: 'auto' },
  ],
});
```

![overlay text and image](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-text-image.png)

### Overlay video with text and image

In this example the base asset is a video.  We overlay an image and text using a Google Font, **Trade Winds**.  We're positioning the logo image in the lower right, so we use gravity **South East**.  The text should appear in the upper left so we use gravity **North West**. We're using a Google font, **Architects Daughter**.

```javascript
const url = cloudinary.url('wave', {
  resource_type: 'video',

  transformation: [
    { width: 500, crop: 'scale' },
    {
      overlay: 'logo-big',
      width: 100,
      gravity: 'south_east',
      opacity: 50,
      effect: 'brightness:100'
    },
    {
      overlay: {
        font_family: 'Architects Daughter',
        font_size: 30,
        text: '  Catch a wave  '
      },
      gravity: 'north_west',
      x: 25,
      y: 25
    }
  ]
})
```

![over video](https://res.cloudinary.com/cloudinary-training/image/upload/v1590899646/book/image.png)

### Multiple layers with image underlay and with text overlays

In this example we mix overlay and underlay. The base layer is the shell. The underlay provides a gray marble like surface upon which the shell seems to rest.  Then we place some text as overlay using east and west gravity for orientation.

```javascript
const url = cloudinary.url('shell', {
  transformation: [
    { width: '200', crop: 'scale' },
    // gray surface is under shell
    {
      underlay: {
        public_id: 'gray-surface'
      },
      width: 450
    },
    // Fibonacci text is over shell
    {
      overlay: {
        font_family: 'Arial',
        font_size: 20,
        text: '  Fibonacci  '
      },
      gravity: 'east',
      x: 25,
      y: 100
    },
    // Explore is over shell
    {
      overlay: {
        font_family: 'Arial',
        font_size: 20,
        text: '  Explore  '
      },
      gravity: 'west',
      x: 25,
      y: -100
    }
  ]
})
```
![overlay and underlay](https://res.cloudinary.com/cloudinary-training/image/upload/v1590899919/book/ou-overlay-underlay.png)

### Underlay text beneath image
In this example where we underlay text, we have extended the height of the whole image by using a negative Y value with a center of gravity at **South**.  You can also see the effect of opacity in the base image.  The background color of the underlay merges with the background color of the base image

```javascript
const url = cloudinary.url('shell', {
  transformation: [
    {
      width: '300',
      crop: 'scale',
      opacity: 60,
      background: 'rgb:ff2222'
    },
    {
      underlay: {
        font_family: 'Roboto',
        font_size: 50,
        font_weight: 'bold',
        text_align: 'center',
        line_spacing: 1,
        letter_spacing: 1,
        text: '   Fibonacci   %0ASpiral'
      },
      color: 'blue',
      background: 'yellow',
      gravity: 'south',
      width: 300,
      y: -50
    }
  ]
})
```
![underlay text](https://res.cloudinary.com/cloudinary-training/image/upload/v1590900257/book/ou-underlay-text.png)


