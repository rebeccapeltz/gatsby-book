---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

## Problems Solved

If you've implemented overlay using CSS, you know that it requires writing code to position your images and text over another image. CSS Code requires maintenance an a strategy for loading it.  Using overlays and underlays you can solve these problems in the media layer and not need to write an maintain code.

result|code
:-------------------------:|:-------------------------:
![css overlay](https://res.cloudinary.com/cloudinary-training/image/upload/v1590880019/book/ou-css-overlay.png)|![css overlay code](https://res.cloudinary.com/cloudinary-training/image/upload/v1590880066/book/ou-overlay-css-code.png)


We'll be covering these topics to develop a deeper understanding of how to go from a vision of what you want to create to the creation of it. We'll see that understanding the concepts of gravity and positioning relative to gravity will help get a overlays and underlays working correctly.  It's also important to understand how to style text because text overlays are frequently used.  You'll see the effect of changing the center of gravity when you create multi image collages.

You can overlay text, video, and images on video and images.  Once you learn to reference the public ids or text values that you want to overlay, you'll see that overlays and underlays are coded as chained transformations.

- Alternatives for creating layered images and video with Cloudinary overlay and underlay
- Position layers using gravity and absolute position relative to gravity
- Review Text Style Options 
- Google Fonts as a source for Font Family option
- Multiple layers by combining overlay and underlay
- Walk through creating a collage: how center of gravity can change as you add new images
- Look at using facial gravity for positioning





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
---
title: "Positioning"
metaTitle: "Positioning"
metaDescription: "Positioning"
---

Understanding how to position overlays and underlays is important in translating a design into an chained transformation with overlay/underlay.

In the example in the previous section, we used a combination of gravity to initialize the starting position and x,y to position the text at a coordinate relative to the starting position.

Let’s look at some examples in the abstract.  

## Gravity

We'll see that gravity can be expressed in many ways.  We'll start by looking at gravity expressed by compass positions.  The default gravity is center if no other gravity positions are applied.  Once the center of gravity has been determined, you can use X, Y numerical values to position the overlaid text or image relative to the center of gravity.  

The picture below shows how X and Y are interpreted with respect to the primary compass positions North, East, South, and West.  You might develop the following intuition: increasing X values move the overlay to the right for all gravity except East and increasing Y value move the overlay down for all except South  

![compass primary gravity](https://res.cloudinary.com/cloudinary-training/image/upload/v1590886372/book/ou-position-compass-primary.png)

The picture below focuses on using secondary compass designations for gravity.  Here, the intuition is that increase X moves the overlay closer to the center and increasing Y moves the overlay farther from the center.

![compass secondary gravity](https://res.cloudinary.com/cloudinary-training/image/upload/v1590886459/book/ou-secondary-compass-gravity.png)

### Northwest Gravity

Some developers like to use northwest gravity because your center of gravity is upper left and you need only supply positive X, Y values to move down and to the right.
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
```---
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


---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Text Overlays  
https://cloudinary.com/blog/adding_watermarks_credits_badges_and_text_overlays_to_images

https://cloudinary.com/blog/how_to_overlay_text_on_image_easily_pixel_perfect_and_with_no_css_html

Text reference  
https://cloudinary.com/documentation/image_upload_api_reference  

https://cloudinary.com/documentation/image_transformations#styling_parameters  

Advanced Facial Detection  
https://cloudinary.com/documentation/advanced_facial_attributes_detection_addon
