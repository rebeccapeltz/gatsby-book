---
title: "Named Transformations"
metaTitle: "Named Transformations"
metaDescription: "Named Transformations"
---

Now imagine that you get a call from Marketing...

The hats look OK but the URLs are impossible for our SEO.  
Can you do anything to make the URLs prettier? hint: Yes 

Let's look at using variables with Named Transformations.

## Exercise: Create a Named Transformation

To create a named transformation that uses variables, just pass in the transformation without the predefined variables.

```javascript
cloudinary.api
  .create_transformation('hat-transform', {
    transformation: [
      { effect: 'replace_color:$color:30:111111' },
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
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

```

## Exercise: Use named transformation

Once we have a named transformation, you an call it with whatever variables you want. 

```javascript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', '500'],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!pink!']
      ]
    },
    {
      transformation: ['hat-transform']
    }
  ]
})

```

When you compare the URL, you will see that the named transformation is much "cleaner" than the original and this can help with SEO. It's also good for security in that you're not exposing as much about your assets and how they are derived.

#### Without named transformation

```bash
https://res.cloudinary.com/pictures77/image/upload/$horizontal_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!pink!/e_replace_color:$color:30:111111/c_scale,w_$horizontal/c_fit,g_north,l_logo-big,w_$horizontal_mul_$logoscalar,x_$horizontal_mul_$correctx,y_$horizontal_mul_$correcty/dpr_2.0,f_auto,q_auto/baseball-cap
```

#### With named transformation

```bash
https://res.cloudinary.com/pictures77/image/upload/$horizontal_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!pink!/t_hat-transform/baseball-cap
```
