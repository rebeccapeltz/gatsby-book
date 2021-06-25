---
title: "IF ELSE"
metaTitle: "IF ELSE"
metaDescription: "IF ELSE"
---

We can satisfy 2 mutually exclusive conditions by add the **ELSE** transformation.  

## Exercise: Overlay image based on context values

**Use case:** We can test a context value and modify our transformation instructions based on that value.  In this case, we're uploading two images with a value specified for creative commons licensing: **cc** indicates Creative Commons licensing for public domain and **ccby** indicates that you must add attribution added to their context.

Start by uploading the images with a license tag specifying a creative commons license. 

```bash
node conditionals/image/upload-cc-logos.js 
node conditionals/image/upload-images.js
```

Next, execute the transformations.  You should open two windows. 

```bash
node conditionals/image/conditional-overlay-transform.js
```

The image below show an asset tagged with the **ccby** license in the DAM.

![ccby license in context](https://res.cloudinary.com/cloudinary-training/image/upload/v1589236687/book/conditionals-license-in-context.png)

In the code we test for the **cc** license and overlay an **open source** logo if specified; otherwise, we display the **ccby** logo overlay.  Both images are cropped the same way, and the overlays are added with chained transformations after cropping.

```javacript
 return cloudinary.url(publicId, {
    transformation: [
      { width: '300', height: '400', crop: 'fill_pad', background: 'white', gravity: 'auto' },
      { if: 'ctx:!license!_eq_!cc!' },
      {
        overlay: 'cc0',
        height: 50,
        gravity: 'north_east',
        opacity: 50
      },
      { if: 'else' },
      {
        overlay: 'ccby',
        width: 100,
        gravity: 'north_east',
        opacity: 75,
        effect: 'brightness:100'
      },
      { if: 'end' }
    ]
  })
}

```

Here are the transformed images side by side.

![creative commons license images](https://res.cloudinary.com/cloudinary-training/image/upload/v1589237272/book/conditionals-context-overlay.png)



