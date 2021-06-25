---
title: "Auto-Upload vs. Fetch"
metaTitle: "Auto-Upload vs. Fetch"
metaDescription: "Auto-Upload vs. Fetch"
---

## Source of Truth

We've been configuring and using Fetch and Auto-Upload.  We noted some differences between the two.  The term "source of truth" describes one of the differences.  While both methods will upload to the Cloudinary database, and be served form the CDN, the Auto-Upload can represent source of truth in that it can maintain directory structure of the origin and it won't be cleared from the CDN.

Looking at the image below, we see that the Fetched imaged will always live in the root of the project, whereas the Auto-Uploaded image can live in a directory below the mapped directory corresponding to its location on the source server.  

Auto-Upload is often used for migration of assets onto Cloudinary.

![auto-upload source of truth](https://res.cloudinary.com/cloudinary-training/image/upload/v1590613271/book/source-of-truth.png)

  |   | Auto-Upload  | Fetch  | 
  |:-:|:-:|:-:|
| Retrieved Images | Cloudinary provides full management functionalities (like "upload" type). All features available.|Managed by user, Cloudinary provides manipulation and delivery only|
|Transformations|Can create multiple versions of the same image using Eager-Transformations, or apply Incoming-Transformation.|On-the-fly transformations only|
|Upload Presets|Automatically apply pre-defined actions to apply to uploaded files (upload-preset is named as the mapped folder)|N/A|
|SEO-Friendly URLs|Shortened URLs, hide the origin|Long (verbose) URLs, can’t hide the origin|
|Access Permissions to originals|Restrict access to originals by utilizing private images|N/A|
|Image Availability|Full storage management, backups, revisions|Cloudinary provides caching only|
|Handling Consistency|Identical treatment of newly-uploaded and old - maintain folder structure with or without the mapping|N/A|
|Auto Refreshing|Requires explicitly deleting/overriding existing resource|Automatic refresh policy is available on paid plans|
|Use Case|Lazy Migration|No migration - maintain existing source of truth|
|Asset Types|Image, video, raw|Image only|





