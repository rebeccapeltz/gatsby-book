---
title: "Authenticated"
metaTitle: "Authenticated"
metaDescription: "Authenticated"
---

## Authenticated

By setting the deliver type to `authenticated`, we are restricting access to the **original** asset and the ability to make any transformations on the asset. Assets can be images, video or raw resource types. Access to the original asset and on the fly transformations can be achieved by signing the URL.

## Exercise: Upload Authenticated Asset

Execute the script below to upload an asset with a **authenticated** delivery type.

```bash
node access-control/authenticated/upload-authenticated.js
```
The script adds a `type:authenticated` options to the upload.

```javascript
cloudinary.uploader.upload('./assets/images/dolphin.jpg', {
  public_id: 'dolphin',
  type: 'authenticated',
  invalidate: true
})

```

Look at the secure url in the response.  

See the response below for example.  Your signature won't be the same as the response below, because it will use your API Secret to sign the public id and any transformations. 

```javascript
{
  public_id: 'dolphin',
  version: 1584376639,
  signature: '348dc2042f0ac1fdf75ad0d06e924f73c2082f5e',
  width: 2352,
  height: 1568,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-16T16:37:19Z',
  tags: [],
  bytes: 103603,
  type: 'authenticated',
  etag: '78b1b379a53c282c9ccaa94694669c75',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/authenticated/s--1YD6WCo_--/v1584376639/dolphin.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/authenticated/s--1YD6WCo_--/v1584376639/dolphin.jpg',
  access_mode: 'public',
  overwritten: true,
  original_filename: 'dolphin'
}

```

## Exercise: Transform authenticated asset

Execute the script below to apply a transformation to the asset just uploaded.

```bash
node access-control/authenticated/authenticated-transformation.js

```

We are cropping the image as we did with the private asset.  What allows this to work is that we're signing the URL by adding the `sign_url:true` option to the request.  What happens if you comment out this option?


```javascript
const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit',
  sign_url: true
})

```

## Identifying Delivery Type 

The image below shows the private and authenticated images we have uploaded as they appear in the Media Library.  Notice the icons help us to identify the delivery type.

![media library private vs auth](https://res.cloudinary.com/cloudinary-training/image/upload/v1589912721/book/control-private-vs-auth-ml.png)

If you've been taking note of the URLs generated you should also see that the delivery type is shown in the URL after the `cloud_name\<resource_type>`.  You'll see upload for public assets.

- res.cloudinary.com/cloudinary-training/image/**upload**/
- res.cloudinary.com/cloudinary-training/image/**private**/
- res.cloudinary.com/cloudinary-training/image/**authenticated**/

## Signature and Transformation

You can click on the link below to see a video that focuses on how changing the transformation input in the ML Transformations page effects the value of the signature.
 
 [![Signature Depends on Transform](https://res.cloudinary.com/cloudinary-training/image/upload/v1589918918/book/ac-signature-depends-on-transform.png)](https://res.cloudinary.com/cloudinary-training/video/upload/v1584564630/video-for-training/authenticated-tranform-signature.mp4)