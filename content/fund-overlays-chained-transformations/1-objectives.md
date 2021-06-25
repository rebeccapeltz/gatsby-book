---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

Now that we know how to create basic transformations, we can build on that by using overlays and chained transformations.  Overlays allow us to position images and text on top of a "base" image.  We can chain transformations together so that the output of one transformation becomes the input to the next. 

 We'll see that positioning is important.  The gravity option helps establish an initial focal point for positioning.Once the gravity focal point is established, we can use X and Y values to set positions relative to the center of gravity.  The X and Y values can be positive or negative. If the position of an overlay is outside the bounds of the base, the overall size of the final image will be altered and this can affect the center of gravity as we'll see shortly.  

(show example of icon over sample image)

In the code below we add the `overlay` option as a key and the value is the public ID of an already uploaded image which in this example is `cloudinary_icon`.   The `gravity` option is given a value of `north east`.  You have all 8 compass points available to you for gravity.  North and South represent the top and bottom of the image, while East and West represent the right and left of the image.  The secondary compass points like North East fall between the primary points. The default gravity value is `center` which happens to be the midpoint of both dimensions.  This gravity value will be used if you don't specify another value for gravity.

(show a picture of the code for the icon over sample image)
```bash
cloudinary.image("sample.jpg", {
  overlay: "cloudinary_icon",
  gravity: "north_east"
})

```

You can see looking at the URL that the overlay and the gravity are abbreviated within a single transformation.

(show url created by code https://res.cloudinary.com/demo/image/upload/l_cloudinary_icon,g_north_east/sample.jpg)


## Asset Overlays

Asset overlays are made up of a base asset which is the public id of URL located at the end of the URL and a transformation containing an overlay option.  The overlay option specifies an image or some text and a position. You can add an overlay to an image or a video resource type.  

## Text Overlays

In using text overlays we need to specify both the text and the position.  The `overlay` option specifies a text object that contains `font_family`, `font_size`, `font_weight`, and `text` string.  The string can contain URL encoded characters. Cloudinary will URl Encode them for you if you don't encode them yourself.  The `font_weight` option is not required but family, size and text are.

In the code we see a transformation array with 2 objects: the first transformation object is cropping the width to 500px and the second is providing the overlay.  The overlay is placed on top of a 500 px image and not the original image.  This is important because we are providing a dimension in the text overlay, namely the size of the font.  You can experiment with the order of the transformations as well as removing the crop transformation entirely to see this effect.


(show code)

```javascript
cloudinary.image("sample.jpg", {
  transformation: [{
      width: 500,
      crop: "scale"
    },
    {
      color: "#ffff00",
      gravity: "north_east",
      x: 15,
      y: 15
      overlay: {
        font_family: "Times",
        font_size: 90,
        font_weight: "bold",
        text: "Bees%21"
      },
    }
  ]
})
```
Notice that the abbreviation in the URL for overlay is `l_`.
(show URL produced)
https://res.cloudinary.com/demo/image/upload/w_500/l_text:Times_90_bold:%20Bees!,g_north_east,y_15,x_15,co_rgb:FFFF00/sample.jpg



## Assignment: Text Overlay

Let's do an exercise in which we overlay text on an image. You can use the previous example as a starting point.  Identify a base image for the overlay.  Then write some code to produce a URL that has a text overlay.

For the developer who is looking for an alternative to writing complex CSS for text and image layers on a web page, the techniques presented here result in a single image ready for service that fulfills the overlay requirements.  A common sample use case is the need are watermarks and branding of assets.

(show the kitten example of code, URL and image produced)

```bash
node overlay/text.js
```


```javascript
cloudinary.url('cute_animals/kitten', {
  secure: true,
  transformation: [{
    width: 500,
    crop: 'scale'
  }, {
    overlay: {
      font_family: 'Times',
      font_size: 90,
      font_weight: 'bold',
      text: 'CAT!'
    },
    gravity: 'south',
    y: 80,
    color: '#FFFF0080'
  }]
});
```


## Chained Transformations
Let's look closer at chained transformations.  In a previous example we saw the "Bee's" text overlaid on a cropped image of flowers.

## Use Cases

Overlays and Chained transformations allow us to create complex images which are composed of other images.  

In addition to using `overlay` with chained transformations, we can add other types of transformations to the result of a previous transformation. 

You can identify a  URL that is using chained transformations: it contains "/" (forward slashes) between transformations.

This example shows that we can crop an image and then take the output of that and apply a `radius: max` transformation with further cropping.  Because our first transformation cropped to a square, the `radius: max` gives us a circle.  The `radius` transformation is similar the CSS `border-radius` property.  It can take numerical values instead of `max`.  Small value numbers produce rounder corners. 

(show code, url and image of the flower in a circle)

(show what happens when you substitute a number for max)

```javascript
cloudinary.image("flower.jpg", {
  transformation: [{
      width: 300,
      height: 300,
      crop: "crop"
    },
    {
      width: 150,
      radius: "max",
      crop: "scale"
    }
  ]
})
```
https://res.cloudinary.com/demo/image/upload/c_crop,w_300,h_300/c_scale,w_150,r_max/flower.jpg


## Multiple Overlays

We can perform multiple overlays in which images are placed side by side.  This is the result of using chained transformations with overlays.  When we position an image outside of the boundaries of the base image, the center of gravity changes.

Notice in the code below that we don't specify gravity.  This means that the default `gravity: center` is used, so all of the images are looking for the center of the height and width dimensions as applied to the whole image canvas at the time that they are added to the chain.  When we add or subtract a dimension using X and Y we can increase the overall size of the image and change the center of gravity.

The images are overlaid in a particular order: tulip, brown sheep, horses and white chicken.  This order is important because it affects the value used for X and Y positions.

```bash
node overlay/chained-transformation.js
```

```javascript
cloudinary.image("yellow_tulip.jpg", {
  transformation: [{
      width: 220,
      height: 140,
      crop: "fill"
    },
    {
      overlay: "brown_sheep",
      width: 220,
      height: 140,
      x: 220,
      crop: "fill"
    },
    {
      overlay: "horses",
      width: 220,
      height: 140,
      y: 140,
      x: -110,
      crop: "fill"
    },
    {
      overlay: "white_chicken",
      width: 220,
      height: 140,
      y: 70,
      x: 110,
      crop: "fill"
    }


```


## Assignment Multiple Overlays

Create a multiple layer image of your own.  You can look at the previous example or use this example.
Each image is being cropped with the `fill` mode.  The `fill` mode is guaranteed to give you the exact dimensions requested without distortion.  It may crop (remove) part of the image if the aspect ratio of the cropped image differs from the original aspect ratio.  Cropping occurs for the dimension that causes the aspect ratio to exceed the requested size.

Once the multiple image is created, it is "piped" through a transformation that makes it a circle  using `radius: max`, and then another transformation that provides a shadow effect.

(show code and image produced)

https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_fill/l_sample,w_100,h_100,c_fill,x_100/l_kitten,w_100,h_100,c_fill,y_100,x_-50/l_autumn_leaves,w_100,h_100,c_fill,y_50,x_50/r_max/e_shadow/fat_cat.jpg

```javascript
cloudinary.image("fat_cat.jpg", {
  transformation: [{
      width: 100,
      height: 100,
      crop: "fill"
    },
    {
      overlay: "sample",
      width: 100,
      height: 100,
      x: 100,
      crop: "fill"
    },
    {
      overlay: "kitten",
      width: 100,
      height: 100,
      y: 100,
      x: -50,
      crop: "fill"
    },
    {
      overlay: "autumn_leaves",
      width: 100,
      height: 100,
      y: 50,
      x: 50,
      crop: "fill"
    },
    {
      radius: "max"
    },
    {
      effect: "shadow"
    }
  ]
})
```


