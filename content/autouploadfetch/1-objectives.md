---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

In this module we explore two ways to retrieve, upload, transform and deliver remote assets that don't use the Upload API: Auto-Upload and Fetch.  We'll compare them and suggest appropriate use cases for each.

## Objectives

- Use Fetch and Auto-upload to load remote assets into the Cloudinary cloud
- **Fetch**: Delivery type for images that relies on  accessing remote URL directly
- **Auto-Upload**: Map a remote website to a Cloudinary directory so that requests for assets of any resource type will result in those assets being uploaded to Cloudinary and will maintain their original directory structure
- Configure Fetch and Auto-Upload in the Cloud settings, including whitelisting remote servers for this kind of access
- Configure an upload preset that applies to an Auto-Upload configured directory so that all instructions in the preset are applied to all assets uploaded to that directory
- Compare Use Cases for Auto-Upload and Fetch

## Architecture

As we start accessing remote servers to upload assets, we need to look at the architecture we're working with in this course.  Most of the assets that we will be accessing remotely will be coming from a **github.io** server that is the published versions of the repository we are working with in this course.

If you look at the `/assets` directory in this repository, you'll find the images, videos and raw files that we'll be uploading to Cloudinary.  You'll find all of the assets served online at https://cloudinary-training.github.io/cld-advanced-concepts/assets/...

![course architecture]()

When you upload assets, you've been uploading from the local `/assets` directory.  For this module, you'll be accessing assets from the **cloudinary-training.github.io** server.

## Delivery Type Upload

We know that we can upload remote assets using the Upload API.  In this module, we are not using the Upload API for either Fetch or Auto-Upload.  As you work through the exercises, remember that the Upload API allows you to upload remote assets, but think about the reasons that would lead you to use Fetch and Auto-Upload instead of the Upload API.  At the end we'll summarize the use cases.

As a reminder this is what the code for the Upload API would look like when uploading remote assets:

```javascript
cloudinary.uploader.upload( 'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/cc0.png',
   {
     public_id: 'cc0',
     type: 'upload'
   }
 )

```


