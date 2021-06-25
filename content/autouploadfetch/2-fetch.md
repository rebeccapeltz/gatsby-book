---
title: "Fetch"
metaTitle: "Fetch"
metaDescription: "Fetch"
---

We'll start with the Fetch method of uploading remote images.  Fetch is limited to uploading images and can't be used for video or raw files.

## Exercise: Configure Fetch

**Fetch** is a delivery type like **upload**.  It is disabled by default.  When you enable it, it is possbile for anyone who knows your cloud name to load remote images into your cloud.  For that reason, as we enable Fetch, we'll also whitelist the source servers from which we will allow fetched images to be sourced from.

1. Open Settings in the DAM: Security
2. Locate “Restricted media types”
3. Uncheck “Fetched URL” to allow fetch to be used in Cloudinary requests


The **Fetched URL** setting is disabled by default.  Go to Settings in the DAM and enable it by unchecking the box.

![uncheck Fetched URL](https://res.cloudinary.com/cloudinary-training/image/upload/v1590600048/book/fetch-setting.png)

4. Locate “Allowed fetch domains:” and add the web server location of our course repo which contains media assets: **cloudinary-training.github.io**

Use the **github.io** server URL that can server up our course repository as a source for remote assets.  These assets are the same as the ones in your code repo under the assets directory.

You can add other domains as well such as https://images.pexels.com and https://images.unsplash.com which offer public domain images for further testing and experimentation.


![Fetch Whitelisted Servers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590600399/book/fetch-whitelist.png)

## Exercise: Fetch with SDK

### Upload with Fetch

```bash
node autoupload-fetch/fetch/fetch-create.js
```

Requesting this URL will upload an image to your cloud.

```javascript
const url = cloudinary.url(
  'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg',
  { type: 'fetch' }
)
```
Notice that **fetch** is positioned in the URL where we see **upload**, **private** or **authenticated** as it is a deliver type.  Following the delivery type, we see the full URL to the remote image.

```bash
res.cloudinary.com/pictures77/image/fetch/
https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg
```

### Fetched image in the DAM

You can see in the image below that the image is availabe in the root of the DAM.  The public ID is the full URL to the original image.  Even though there are `/` in the public id, for fetched images this does not mean they are in a directory in the cloud.  You can also see that the icon for the type is a **link**.

![fetched asset in DAM](https://res.cloudinary.com/cloudinary-training/image/upload/v1590603690/book/fetch-dam.png)

## Exercise: Fetch with Transformation

When you add a transformation to a fetch type, the original asset associated with the Fetch URL will be loaded into the DAM and a derived asset with the transformation can be found under **View Dervived Images** in the DAM.  When you request the transformed image, it will load faster.


```bash
node autoupload-fetch/fetch/fetch-transform.js
```

```javascript
const url = cloudinary.url('https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/strawberry.jpg',
  {
    type: 'fetch',
    width: 400,
    height: 400,
    crop: 'limit',
    radius: '30',
    effect: 'sharpen',
    quality: 'auto',
    fetch_format: 'auto'
  }
)
```
Navigate to the image's transformation and click on View Derived Image to see this.

![fetch derived images](https://res.cloudinary.com/cloudinary-training/image/upload/v1590606608/book/fetch-derived-images.png)


## Fetch just 1 image

You can restrict **Fetched URLs** and still request a fetch image if you sign the URL.  To try this out, you can go back and check the box in settings to restrict Fetched URLs.  Then execute the code below in which the URL is signed.

```bash
node autoupload-fetch/fetch/fetch-create-signed.js 
```

```javascript
const url = cloudinary.url(
  'https://cdn.pixabay.com/photo/2020/03/06/13/43/mockingbird-4907104_1280.jpg',
  { type: 'fetch', sign_url: true }
)
```

## Notes

Here are some considerations when using the Fetch delivery type:

- Assets are image only
- Source of truth is the remote server
- Fetched objects are not backed up even if you have backup turned on
- Paid accounts can set up weekly (or periodic) removal from Cloudinary CDN
- Free accounts get one removal after 7 days - default cache invalidate
- First time you request may take a couple seconds
- Upload and create derived image transformations on the fly
- Future requests are cached and load quickly

Overall, Fetch does not attempt to maintain any file structure associated with the original asset.  The path to the original asset just becomes part of the string making up the public id.  Fetch is also transient, in that if the original asset image changes, you would need to fetch it again to pick up the change.  This is what we mean in saying it is not the "source of truth".






