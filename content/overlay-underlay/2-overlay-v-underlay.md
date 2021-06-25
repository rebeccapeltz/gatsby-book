---
title: "Overlay vs. Underlay"
metaTitle: "Overlay vs. Underlay"
metaDescription: "Overlay vs. Underlay"
---

We'll start by exploring the difference between overlay and underlay. 

## Exercise: Upload some assets
Start by uploading some assets. You can get these running in different terminal sessions.

### Upload Images

```bash
node overlay-underlay/upload-images.js 
```
### Upload Videos

```bash
node overlay-underlay/upload-video.js
```

### Upload Images for the collage exercise

```bash
node overlay-underlay/collage/upload-collage-images
```

## Overlay vs Underlay

When you compare the two images below, it doesn't appear that overlay and underlay produce different results. They are substitutes in some situations.  It depends on the effect you're trying to achieve with the layers.  You can use positioning and opacity to see these different effects. 

overlay|underlay
:-------------------------:|:-------------------------:
![overlay](https://res.cloudinary.com/cloudinary-training/image/upload/v1590884870/book/overlay.png)|![underlay](https://res.cloudinary.com/cloudinary-training/image/upload/v1590884728/book/underlay.png)

### Media Debugger
As we begin working on transformations, this is a good time to start using the Media Debugger extension that you can get from the [Chrome Web Store](https://chrome.google.com/webstore/detail/cloudinary-debugger/ehnkhkglbafecknplfmjklnnjimokpkg).

Once the extension is installed, you can right click in the Chrome browser, and select Media Debugger to open a new window with information about your image.

![media debugger](https://chrome.google.com/webstore/detail/cloudinary-debugger/ehnkhkglbafecknplfmjklnnjimokpkg)

If you open the transformations tab, you can see how the transformations the chain of transformations.

![media debugger transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1590885395/book/ou-media-debugger-transform.png)

## Coding a chained transformation

Let's look at how to use the URL helper to code a chained transformations that uses an `underlay`. In code a chained transformation is an array of transformations.  The transformations are processed in sequence such that the output of one transformation becomes the input for the next.

In this URL we crop and apply opacity and background.  The we create an underlay with text.  The underlay is also assigned foreground and background colors and positions using gravity and X, Y positioning.  Notice that the text is encoded in the underlay object separate from the color and position.

```javascript

cloudinary.url('shell', {
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
       font_size: 15,
       font_weight: 'bold',
       text_align: 'center',
       line_spacing: 1,
       letter_spacing: 1,
       text: '   Fibonacci   %0ASpiral'
     },
     color: 'blue',
     background: 'yellow',
     gravity: 'south',
     width: 300
   }
 ]
})

```
In the next section we'll learn more about positioning.
