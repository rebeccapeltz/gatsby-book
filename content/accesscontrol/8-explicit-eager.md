---
title: "Explicit Eager"
metaTitle: "Explicit Eager"
metaDescription: "Explicit Eager"
---

**Note:** This module assumes you have strict transformations enabled.

![enable strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920875/book/ac-strict-transform-enable.png)

## Explicit Upload

Eager Transformations are a best practice in a multi-tenant system. You get better performance by having something already in place to be served. Explicit method is for already uploaded assets. 

1. Explicit method is for already uploaded assets.  
2. Eager transformations can be synchronous or asynchronous with a notification URL and we can issue invalidate to clear CDN cache.

## Exercise: Create eager transformation

Start by uploading a new public image.

```bash
node access-control/explicit-eager/upload-public-asset.js
```

```javascript
cloudinary.uploader.upload('./assets/images/killer-whale.jpg', {
  public_id: 'killer-whale',
  type: 'upload',
  overwrite: true,
  invalidate: true
})
```
We won't be able to create on the fly transformations with this image because the Strict Transformations flag is enabled.  Instead we'll use the explicit function of the Upload API SDK to "update" the asset with an eager transformation.


```bash
node access-control/explicit-eager/explicit-eager-upload-transform.js
```

Once this script is complete there will be a derived image ready for access on the CDN.  We can open the secure URL for this derived image by accessing it from the response's eager array of eager transformations.

```javascript
cloudinary.uploader.explicit('killer-whale',
  {
    type: 'upload',
    eager: [{
      width: 300,
      height: 300,
      quality: 'auto',
      crop: 'limit',
      invalidate: true
    }]
  })
  .then(result => {
    console.log('result', result)
    // look at the transformed url
    const transformUrl = result.eager[0].secure_url
    console.log('transform url:', transformUrl)
    open(transformUrl)
  })
```
 The above transformation was applied to a public asset. What if you want to use the explicit/eager transformation with an authenticated asset?  Change the public id from **killer-whale** to **dolphin** which we uploaded earlier as authenticated.  Also change the type to `authenticated`.  Does the explicit eager transformation still work?

```javascript

cloudinary.uploader.explicit('dolphin',
  {
    type: 'authenticated',
    eager: [{
      width: 300,
      height: 300,
      quality: 'auto',
      crop: 'limit',
      invalidate: true
    }]
  })

 ```

It works and a signature is automatically added by the URL helper.

![authenticated asset and strict transformation with explicit eager](https://res.cloudinary.com/cloudinary-training/image/upload/v1590525384/book/autheticated-transfrom-explicit-eager.png)

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!


 