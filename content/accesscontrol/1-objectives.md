---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

## Intro

Access control is the first module in this course because the concepts and mechanics of adding access control will be referenced throughout the course.

Cloudinary assets are public by default.

We’re going to learn how to restrict access to assets per asset, both original and transformations. 

After restricting access, we’ll learn how to allow access to specific assets using signed URLs, the Admin API Named transformations, and Explicit Eager transformation.

- Delivery Types:
  - **Upload:** Default public access delivery
  - **Private:** Disallow access to original asset
  - **Authenticated:** Disallow access to original assets and any transformations created from original asset
- Upload API **access_control**: option for time limited access
**Strict Transformations:** security setting to disallow any public transformations and only allow access to pre-generated transformations using eager Upload API, Admin API or DAM
- Signed Delivery: generating a signature for a URL to allow access when access was previously denied
- Review Use Cases: for using the different types of access control

## Options Summary 

The table below shows compares the types of control offered by the different options will be using in this module.

![Access control options](https://res.cloudinary.com/cloudinary-training/image/upload/v1589909005/book/control-options.png)
