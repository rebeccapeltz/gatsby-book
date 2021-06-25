---
title: "Named Transformations"
metaTitle: "Named Transformations"
metaDescription: "Named Transformations"
---

## "Allow for Strict"

The "Allow for Strict" option is automatically set to true in a named transformations.  

## Exercise: 

For this exercise, you want to have the enabled flag on for Strict Transformations.

Upload a public asset

```bash
node node access-control/named-transformations/upload-public-asset.js
```
Notice that we're uploading a public asset, but we still have **Strict Transformations enabled**, so we can't apply transformations even to public assets.

```javascript
cloudinary.uploader.upload('./assets/images/shark.jpg', {
  public_id: 'shark',
  type: 'upload',
  overwrite: true,
  invalidate: true
})
.then(uploadResult => {
  console.log(uploadResult)
  const url = uploadResult.secure_url
  open(url)
})

```

Now we're going to look at the effect of using named transformations when we have disabled transformations.  To do this we're going to create a new named transformation.

We'll start by deleting the named transformation if it exists. If you try to create a new named transformation when it already exists, you'll get a status 409 **Transformation with that name already exists** message.

```bash
node access-control/named-transformations/delete-named-transform.js
```
The name of the transformations is **auto-400-xform**.  If it doesn't exist we'll get a message informing us of that.

```javascript
const name = 'auto-400-xform'
cloudinary.api
  .delete_transformation(`${name}`)
  .then(result => {
    console.log(result)
  })
```

Create a new named transformation

```bash
node node access-control/named-transformation/create-named-transform.js
```
Notice that we haven't set the allow to `allow_for_strict`.  It is set by default for named transformations.

```javascript
cloudinary.api
  .create_transformation('auto-400-xform', {
    width: 400,
    height: 400,
    crop: 'limit'
  })

```

List named transformations and look for the `allowed_for_strict` option to be set to true.  You can toggle this option on and off based on your use cases.  For this module, we want to leave it on as it will help us to create transformations while we have the enabled flag on for Strict Transformations.

```bash
node access-control/named-transformation/list-named-transform.js
```

We can list up to 500 transformations.  We log the named ones.

```javascript
cloudinary.api
  .transformations({ max_results: 500 })
  .then(result => {
    for (const transform of result.transformations) {
      if (transform.named === true) {
        console.log(transform)
      }
    }
  })
```
You'll see the named transformation we just created has the **allowed_for_strict** options set to true.

```javscript
{
  name: 't_auto-400-xform',
  allowed_for_strict: true,
  used: true,
  named: true
}

```

Now, let's use the named transformation to create a transformation.

```bash
node access-control/named-transformation/url-named-transform.js
```
We're applying this to a public image below.  Try substituting our authenticated image `dolphin` for `shark` in the code below and you'll see that the named transformation can be applied to any image regardless of delivery type.

```javascript
const url = cloudinary.url('shark',
  {
    transformation: ['auto-400-xform']

  })
```
Notice that a `t_` is pre-pended to the assigned named of the transformation when added to the URL.

![named transformation with pre-pended t_](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518664/book/named-t-prepend.png)

## Media Library Named Transformations

The animation below shows you how to access the named transformations in the DAM.  You can see that there is a red/green toggle that represents the `allow_for_strict` mode.

![Allow for Strict in DAM](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518022/book/console-transforms-allow_xvnsxz.gif)

You can clearly see the difference between named transformations with the allowed_for_strict on an off in the DAM.

![allow for strict in DAM toggle](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518399/book/named-transform-allowed-toggle.png)


## What if we want to add f_auto,q_auto?

The use case here is that we have a named transformation that provides cropping and effects, but we also want to add optimizations like `f_auto` and `q_auto` to the URL, but these count as transformations which are not allowed.  They also are options which can't be added to a named transformation.  This is because they are handled on the CDN before Cloudinary processes the URL.  How can we add these transformation?

We can set the `allow_for_strict` in code.

```bash
node access-control/named-transformations/add-f-auto-q-auto.js
```

In the code below, we're doing it by applying a string that includes both the named transformation and the `f_auto,q_auto` optimizations using the `transformation option.

```javscript
cloudinary.api
  .update_transformation('t_auto-400-xform/f_auto,q_auto', {
    allowed_for_strict: true
  })
  .then(updateResult => {
    console.log(updateResult)
    const url = cloudinary.url('shark', {
      transformation: ['auto-400-xform/f_auto,q_auto']
    })
    console.log(url)
    open(url)
  })
```

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!
