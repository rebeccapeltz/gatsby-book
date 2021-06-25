---
title: "Baseball Cap"
metaTitle: "Baseball Cap"
metaDescription: "Baseball Cap"
---

Let's look into a use case to see how we can take make use of variables to fulfill project requirements.

## Exercise: Baseball cap with variable size and color

### Imagine a scenario like this:

Adding logos to coffee cups online has proven successful!  
Now, your product manager wants to add them to baseball caps.    
The designer needs **5 different sized images** from 100 to 500 pixels square.    
You are given an image of a black hat that is at an angle so when placing the image on the hat it **must be placed off center** to look realistic.
You will only need to apply one image logo, for now, but you must be able to produce the hat in **multiple colors**.  

The original image you are given looks like this:  

![starting black hat](https://res.cloudinary.com/cloudinary-training/image/upload/v1588711158/book/variables-starting-hat.png)

### Work through transformation steps

We're going to break this problem down in to step to see how we can meet these requirements.  

![black hat transform](https://res.cloudinary.com/cloudinary-training/image/upload/v1588711824/book/black-hat-transform.gif)


Upload images for hat and logo by executing these 2 scripts:   

```
node variables/image-overlay/upload-baseball-cap.js
node variables/image-overlay/upload-logo-big.js
```

Next we're going to execute a total of 6 scripts.  Each script provides a transformation that moves us closer to the fulfilling all the requirements.  

 
Walk through steps 0-5 to create overlay using proportion calculations with variables.  You'll find these step by step scripts in `variables/image-overlay/step0-5.

#### Step 0
In this starting step we are just opening up the original black cap in the browser.  

```javascript
const url = cloudinary.url('baseball-cap', {})
open(url)

```

#### Step 1
In this step we provide a color variable and set the color to **white**.  This will make it easier to see the outline of the cap in the browser.  We're using the `replace_color` effect which searches for a match to `111111` with a 30% accuracy.  This should find black and then replace with the value of our color variable.

We also provide a chained transformation to auto quality and format.  Since we're going to use an image overlay to add the logo, we add a `dpr` value. Increasing **Device Pixel Ratio** can help get better pixel alignment when using overlays.

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$color', '!ffffff!']
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 2
Because the requirements call for a 500x500 cropped image as well as allowing for 4 other size, we add variables for vertical and horizontal corresponding to height and width.  We then apply the crop in a chained transformation.  Note that we chain the "auto everything" last because some of the instructions for choosing file format are handled at the CDN. 

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 3
Now we add the logo. We're using the default gravity center and providing a variable for the logo width, `$logow`.  We need the width of the logo to be variable in order to match the variable width of the hat itself. 

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!'],
        ['$logow', '200']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      overlay: 'logo-big',
      crop: 'scale',
      width: '$logow',
      gravity: 'center'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 4
This is a "refactoring" step.  This means that we've can look at reducing the number of variables as we start to see patterns in how they are used.  For example since the cap is a square, we really only need 1 dimension.  We can also create a variable `$logoscalar` which creates a proportional factor for scaling the overlay relative to the base image.

We also address the requirement for off-setting the logo from the center since cap is at an angle.  We've changed the gravity to **north** (top center of base image) and provide positioning values for x and y based on a x and y correction factors.  This places the logo a little to the right of center so that it matches the angle that the cap is facing.


```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', 500],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!ffffff!']
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    { width: '$horizontal', crop: 'scale' },
    {
      overlay: 'logo-big',
      crop: 'fit',
      gravity: 'north',
      width: '$horizontal * $logoscalar',
      x: '$horizontal * $correctx',
      y: '$horizontal * $correcty'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 5
All that changes in this final step is that the color is passed in from an external variable.  This fulfills the requirement that the color be allowed to vary.  You can imagine that the logo could be variable too if that was required.

```javascript
const color = 'lightblue'
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', 500],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', `!${color}!`]
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    { width: '$horizontal', crop: 'scale' },
    {
      overlay: 'logo-big',
      crop: 'fit',
      gravity: 'north',
      width: '$horizontal * $logoscalar',
      x: '$horizontal * $correctx',
      y: '$horizontal * $correcty'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

### Make images of different sizes

The final requirement we'll address is creating the image in different sizes. Since we have variables for size and color we can supply these with external variables.  The code below initializes and external color with a hex value.  The we create an array of [100 ... 500], which represents the sizes.  As we iterate through the array we push objects onto a result array that contains sizes and transformation strings.

```javascript
// pick a color
const color = 'ffc0cb'

// generate a range of widths
const urls = []
// generate a range of 5 widths 100,...,500
const range = [...Array(5).keys()].map(item => {
  return (item + 1) * 100
})

// generate an array of URLs
for (const width of range) {
  urls.push({
    width: width,
    url: cloudinary.url('baseball-cap', {
      transformation: [
        {
          variables: [
            ['$horizontal', width],
            ['$correctx', '0.04'],
            ['$logoscalar', '0.4'],
            ['$color', `!${color}!`]
          ]
        },
        {
          effect: 'replace_color:$color:30:111111'
        },
        { width: '$horizontal', crop: 'scale' },
        {
          overlay: 'logo-big',
          crop: 'fit',
          gravity: 'north',
          width: '$horizontal * $logoscalar',
          x: '$horizontal * $correctx',
          y: '$horizontal * 0.1'
        },
        {
          dpr: '2.0',
          fetch_format: 'auto',
          quality: 'auto'
        }
      ]
    })
  })
}
```
Once the set of 5 transformations is complete, we save them to a file that we can hand off to a designer or web developer for approval.

```javascript
const fs = require('fs')
try {
  fs.writeFileSync(
    path.join(`${__dirname}/urls.json`),
    JSON.stringify(urls, null, 1)
  )
} catch (err) {
  console.error(err)
}
```
We also open them for inspection here.  

```javascript
urls.forEach(item => open(item.url))
```

After running this code, you should find a **urls.json** file in the `variables/image-overlay` directory.

To see a comparison of the hats at different sizes, replace the **cloudinary-training** transformations strings in `variables/image-overlay/index.html` and open it in the browser.

![baseball cap in many sizes](https://res.cloudinary.com/cloudinary-training/image/upload/v1588716339/book/baseball-cap-sizes.png)
