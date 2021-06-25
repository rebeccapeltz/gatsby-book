---
title: "Complex"
metaTitle: "Complex"
metaDescription: "Complex"
---

## PSD: Photo Shop Document

PSDs can have **layers**.  This means multiple images applied on top of each other to create composite image.  The image you see below has 4 layers and layer 1 references the image as a whole, so altogether 5 layers.  

![strawberries: 5 layers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588790651/strawberries.png)

The **layers** are referenced as **pages** in Cloudinary code and URLs.  In the earlier table that described built in variables, we saw `pg` for referencing a page by page number, `cp` for referencing current page,  and `pc` for referencing page count.

Let's see how we can use conditionals and layer to create a new images built with the layers. 


## Exercise: Upload and view layers

We can upload PSDs as images. You can't render a PSD file in the browser, by you can change the extension to **jpg** or **png** to render in the browser. Execute the following code to upload the images:

```bash
node conditionals/psd/upload-images.js
```

Open this code in the editor and the browser. Examine the URLs used to render each layer.

![rendering indivdual layers for 2 PSDs](https://cloudinary-training.github.io/cld-advanced-concepts/conditionals/psd/)


## Exercise: Conditional Based on PSD Layers

Lets write a program that checks to see if there are **greater than or equal** to 5 layers in a PSD.  If there are, we'll report on it and arrange layers 3 and 5 on the right side of the page.  If not, we'll report that the number of layers is less than 3 and how many layers there are.  As mentioned earlier, we'll need to reference the built in variables with user defined variables in order to apply the strings as overlays.  


![flow chart](https://res.cloudinary.com/cloudinary-training/image/upload/v1589238288/book/conditionals-flow-chart.png)  


You can execute the script that applies the conditional transformation described above.

```bash 
node conditionals/psd/report.js

```

The code shows the assignment of built in values to user defined variables.  The the base layer is copped and given a very low opacity to provide a background.  Next we test for **page count >= 5**.  Then we apply image and text overlays given the number of layers we have to work with.  The **report** function is run on 2 images, one with 5 layers and one with 2 layers.  

There is also a self-referencing variable `$img` which references the `public_id` of the base image.  This can be used to extract the layers of the PSD.

```
function report(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$img', 'current:public_id'],
          ['$pagecount', 'pc'],
          ['$currentpage', 'cp']
        ]
      },
      { width: 400, opacity: '10' },
      { if: 'pc_gte_5' },
      {
        transformation: [
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'current layer: %24%28currentpage%29'
            },
            gravity: 'north_west',
            color: 'red',
            x: '20',
            y: '20',
            width: '100'
          },
          {
            overlay: '%24img',
            page: '5-5',
            width: 100,
            gravity: 'north_east'
          },
          {
            overlay: '% ',
            page: '3-3',
            width: 100,
            gravity: 'south_east'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'total layers in PSD: %24%28pagecount%29'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '40',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'upper right: layer 2'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '60',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'bottom right: layer 3'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '80',
            width: '100'
          }
        ]
      },
      { if: 'end' },

      { if: 'else' },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'page count < than 5'
        },
        gravity: 'north_west',
        x: '20',
        y: '20',
        width: '100'
      },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'total layers in PSD: %24%28pagecount%29'
        },
        gravity: 'north_west',
        x: '20',
        y: '40',
        width: '100'
      },
      { if: 'end' },

      { page: '1' },
      { secure_url: true, fetch_format: 'jpg' }
    ]
  })
  return url
}
const urlStrawberries = report('strawberries')
console.log(urlStrawberries)
open(urlStrawberries)

const urlCldSample = report('cld-sample-psd')
console.log(urlCldSample)
open(urlCldSample)

```




![2 PSDs with different layer counts](https://res.cloudinary.com/cloudinary-training/image/upload/v1589239860/book/conditionals-psd.png)