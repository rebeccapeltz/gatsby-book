---
title: "Art template"
metaTitle: "Art template"
metaDescription: "Art template"
---

Please look at the blog about creating a 3D effect by Sam Brace and Daniel Mendoza: 
https://cloudinary.com/blog/turning_a_flat_image_into_a_three_dimensional_canvas_with_cloudinary
There are step by step instructions for creating an effect that looks like an artwork has been mounted on a backing board.
This is such a nice and useful effect that our engineer decided that it would be useful to make the effect available for any picture, so he used variables.

![art blog](https://res.cloudinary.com/cloudinary-training/image/upload/v1588722076/book/art-blog.png)

## Exercise: Mount Art Template

Start by uploading some images to be mounted as art. 

```bash
node variables/art/mount-upload-art.js
```

Next render the images using the template.

```bash
variables/art/mount-art.js
```



The blog contains a  detailed explanation of the way in which the 3D effect was obtained.
When you develop a complex transformation and want to apply it to many images, you can first make use of variables and then create a named transformation that applies them.

Let's look at what this complex transformations is doing.  The variables `$w` and `$h` set up the height and width of the image.  The variable `$dp` creates the depth effect by creating a 20 pixel slice on the right side and on the bottom. The slices are taken from an opaque overlay. These are changed into a new non-rectangular shape by using the distort effect.  They are overlaid in such a way as to extend the dimensions of the canvas on the right and bottom.

The `flags: 'layer_apply'` option indicates that the transformation should only be applied to the slice.  The 2 angle options `hflip` and `vflip` are used to change the orientation of the 20px slices.  The **flipped** 20px slices is what gives this the 3-D look.  The right hand slice, `east`, gets a horizontal flip and the bottom slice, `south`, gets a vertical flip.

The use of variables makes turns this into a template that can be used for multiple images.  

**Challenge:** Create a named transformation for the mounted art effect.

```javascript
function mountArt(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$w', '700'],
          ['$h', '500'],
          ['$dp', '20'],
          ['$wadp', '$w + $dp'],
          ['$hadp', '$h + $dp']
        ]
      },
      { width: '$w', height: '$h', crop: 'fill' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$dp', height: '$h', gravity: 'east', crop: 'crop' },
      { angle: 'hflip' },
      { effect: 'distort:0:0:$dp:$dp:$dp:$hadp:0:$h' },
      { x: '$dp * -1', gravity: 'north_east', flags: 'layer_apply' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$w', height: '$dp', gravity: 'south', crop: 'crop' },
      { angle: 'vflip' },
      { effect: 'distort:0:0:$w:0:$wadp:$dp:$dp:$dp' },
      { gravity: 'south', flags: 'layer_apply' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  })
}
```


![art skier](https://res.cloudinary.com/cloudinary-training/image/upload/v1588723018/book/art-skiier.png)

![art modern](https://res.cloudinary.com/cloudinary-training/image/upload/v1588723151/book/art-modern.png)