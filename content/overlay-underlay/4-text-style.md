---
title: "Text Style"
metaTitle: "Text Style"
metaDescription: "Text Style"
---

In this section, we'll review options for styling text.  If you're familiar with styling text with CSS, many of these will look familiar.

## Working with Text

This table can serve as a reference for styling text.  You can find  more in the documentation.  Many of these options for styling are optional, but you must include font family, font size and the text itself.

![text styling](https://res.cloudinary.com/cloudinary-training/image/upload/v1590896519/book/ou-text-styling.png)

You can add additional properties to a text overlay outside of the underlay object.  Notice that font color, background, width and opacity are coded outside the underlay object.

We use URL Encoding to create spaces (%20) and new line (%0A) in the text.

We also add positioning outside of the underlay.

```javascript
{
     underlay: {
       font_family: 'Roboto',
       font_size: 15,
       font_weight: 'bold',
       text_align: 'center',
       letter_spacing: '5',
       line_spacing: '7',
       text: '   Fibonacci   %0ASpiral'
     },
     color: 'blue',
     opacity: '50',
     background: 'yellow',
     gravity: 'south',
     width: 300,
     y: -80
   }
```
## Font Families

Standard CSS Font Families can be used:

- Times
- Helvetica
- Arial

You also can use many of the [Google Fonts](https://fonts.google.com):

- Roboto
- Trade Winds
- Lobster

If you have trouble rendering a font, you can look at `x-cld-error` in the network tab to verify that the font is not supported.

![font not supported](https://res.cloudinary.com/cloudinary-training/image/upload/v1590896937/book/ou-font-not-supported.png)

## Exercise: Custom Fonts

You can upload a True Type font (ttf) as a raw file and reference it by public id as you would a font family. Let try this.  You can find [public domain custom fonts](http://www.publicdomainfiles.com/) online to experiment with.

``bash
node overlay-underlay/custom-font.js
```

Must use authenticated upload for the font. In this script we have downloaded the **BLKCHCRY** (Blank Chanery)
 font.  We then upload it as a raw resource type with an authenticated delivery type.  We then apply a text overlay using this font
```javascript
cloudinary.uploader
  .upload('./assets/raw/BLKCHCRY.TTF', {
    resource_type: 'raw', // Custom fonts must be upload as 'raw'
    type: 'authenticated', // Custom fonts must be upload as 'authenticated'
    public_id: 'BLKCHCRY.ttf'
  })
  .then(result => {
    console.log(result)
    const url = cloudinary.url('shell', {
      transformation: [
        {
          width: '300',
          crop: 'scale'
        },
        {
          overlay: {
            font_family: 'BLKCHCRY.ttf',
            font_size: 75,
            text: 'Spiral'
          },
          color: 'black',
          gravity: 'south',
          y: 30
        }
      ]
    })
    console.log(url)
    open(url)
  })
```

![custom font](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/ou-custom-fonts.png)
 




