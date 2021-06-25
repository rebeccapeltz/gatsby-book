---
title: "IF END"
metaTitle: "IF END"
metaDescription: "IF END"
---

When you want to execute a chained transformation based on a conditional IF, you need to add an END to signal it's completion.

## Example

### General

```bash
if_<property>_<operator>_<value>/
    <chained transformation>/
if_end

```

### Specific

```bash
if_w_gte_1000/
    w_400/
    ar_1:1/
if_end
```  

## Exercise: Landscape to Portrait Image

Execute the following:

```bash
node conditionals/image/portrait-to-landscape
```
This code will upload a landscape image and the set up a transformation that uses a variable.  If the image's aspect
ration is less than 1, meaning that it is in portrait mode, it will convert it to landscape mode by changing the aspect ratio to 1.5 and apply the variables width.  It will also add a duo-tone effect in a chained transformation.  Both transformations, the cropping and the special effect will only occur on images in portrait mode.

This code shows the chained transformation that ends with **END**. 

```javascript
 const url = cloudinary.url(result.public_id, {
      transformation: [
        { variables: [['$wide', '300']] },
        { if: 'ar_lt_1.0' },
        {
          aspect_ratio: '1.5',
          width: '$wide',
          crop: 'fill',
          gravity: 'face',
          effect: 'grayscale'
        },
        { effect: 'tint:50:green:yellow' },
        { if: 'end' }
      ]
    })

```



### Original
![portrait image](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/conditionals-portrait-image.png)

### Transformed

![landscape image](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/conditionals-landscape.png)

## Exercise: Chained Transformation after Conditional END

In this next case we provide a conditional and then follow it with more transformations.  All of the images will get the transformations specified before the **IF** after the **END** applied to them; only the transformations that have the tag **skiing** will get the logo overlay

 The net effect to the user is that videos tagged with **skiing** will have a Cloudinary logo and the words **Snow Fun** in an overlay.  All videos will be cropped to `500px` and their duration set to `5 seconds`. 


```bash
node conditionals/video/conditional-overlay-transform

```

```javascript
const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  transformation: [
    { width: 500, crop: 'scale' },
    { if: '!skiing!_in_tags' },
    {
      overlay: 'logo-big',
      width: 100,
      gravity: 'north_east',
      opacity: 50,
      effect: 'brightness:100'
    },
    {
      overlay: { font_family: 'arial', font_size: 15, text: 'Snow%20Fun' },
      gravity: 'north_east',
      y: 10,
      x: 105
    },
    { if: 'end' },
    { duration: '5' }
  ]
})

```

### Video with Overlay and 5 second duration

![overlay and duration](https://res.cloudinary.com/cloudinary-training/image/upload/v1589234049/book/conditional-if-end.png)
