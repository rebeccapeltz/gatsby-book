---
title: "Strict Transformations"
metaTitle: "Strict Transformations"
metaDescription: "Strict Transformations"
---

## Disabling Transformations

We've seen how we can disable transformations per asset by assigning them the `authenticated` delivery type. We can change a security setting in the DAM that will allow us to lock down the ability to create on-the-fly transformations.
This lock down applies to all assets regardless of their delivery type.  

## Exercise: Enable Strict Transformations

Modify Security Settings to enable Strict Transformation - don’t forget to save! Notice that there are separate options for enabling strict transformations on image and video.  

![enable strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920875/book/ac-strict-transform-enable.png)


### Additional Options for Enabling Strict Transformations 

There is also an option to allow certain domains to make transformations when strict transformations are enabled.

![enable referrer domain for strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589921072/book/ac-strict-transform-referrer.png)

## Exercise: Using Strict Transformations Enabled

```bash
node access-control/strict-transformations/upload-post-strict-and-access-original.js
```

In the code below we are using delivery type **upload** which provides public access to both the original and the transform.  However, notice the 3 cases as we work with the resulting secure URL:

1. no transformation: status 200 in browser as original image is rendered in the browser and format extension is not included in URL
2. append original format file extension: status 200 as original image is as original image is rendered in the browser with its original format as a file extension included in the URL
3. add the angle 0 transformation: status 404 as we attempt to add a transformation when transformations are not allowed


```javascript
cloudinary.uploader
  .upload('./assets/images/jellyfish.jpg', {
    public_id: 'jellyfish',
    type: 'upload',
    overwrite: true,
    invalidate: true
  })
  .then(uploadResult => {
    console.log(uploadResult)
    console.log('secure url', uploadResult.secure_url)
    // Consider 4 cases:
    // 1. no transformation and no auth error
    open(uploadResult.secure_url)

    // format included
    let url = cloudinary.url(`${uploadResult.public_id}`, {
      format: `${uploadResult.format}`
    })
    console.log('format included:', url)
    // 2. original format included in Cloudinary URL config - no transformation
    // no auth error
    open(url)

    // no format - just public id
    url = cloudinary.url(`${uploadResult.public_id}`, {})
    console.log('cloudinary url:', url)
    // 3. should not work 404
    open(url)

    // 4. transformation
    url = cloudinary.url(`${uploadResult.public_id}`, { angle: 0 })
    console.log('cloudinary url:', url)
    // expect fail 'resource not found' 404
    open(url)
  })

```



