---
title: "Private"
metaTitle: "Private"
metaDescription: "Private"
---

## Private

By setting the deliver type to `private`, we are restricting access to the **original** asset.  It is still possible to create public transformations.  Assets can be images, video or raw resource types.

We'll see that we can provide access by **signing** the URL.

## Exercise: Upload Private Asset

Execute the script below to upload an asset with a **private** delivery type.

```bash
node access-control/private/upload-private.js
```
The script adds a `type:private` options to the upload.

```javascript
cloudinary.uploader.upload('./assets/images/goldfish.jpg', {
  public_id: 'goldfish',
  type: 'private',
  invalidate: true
})

```

Look at the secure url in the response. Notice the signature. What happens if the signature is removed?  

See the response below for example.  Your signature won't be the same as the response below, because it will use your API Secret to sign the public id and any transformations. 

```javascript
{
  public_id: 'goldfish',
  version: 1584376364,
  signature: '1402a1760efec0162f6e3dba2ad1b2da43e5e879',
  width: 3740,
  height: 2200,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-16T16:32:44Z',
  tags: [],
  bytes: 331987,
  type: 'private',
  etag: 'edee76a4a3fc6e5c4094eed24dd75dbc',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/private/s--TGo7W8ew--/v1584376364/goldfish.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/private/s--TGo7W8ew--/v1584376364/goldfish.jpg',
  access_mode: 'public',
  overwritten: true,
  original_filename: 'goldfish'
}

```

## Exercise: Transform private asset

Execute the script below to apply a transformation to the asset just uploaded.

```bash
node access-control/private/private-transformation.js

```

In this script we're applying cropping transformations and `f_auto`, `q_auto`.  Note that the `secure: true` option, gives us an encrypted request with `https`.  Private assets don't restrict the ability to add transformations to an asset.  

```javascript
const url = cloudinary.url('goldfish', {
  type: 'private',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit'
})
console.log(url)
open(url)
```

**Aside:** you can add `a_0` to create a transformation that looks like the original: if you’re trying to enforce a watermark this could undo that. We’ll see a couple of ways to control for this when we look at the `authenticated` access type and the `enable strict transformations` security setting.


