---
title: "Optional"
metaTitle: "Optional"
metaDescription: "Optional"
---


## gh pages settings
In github.com settings:
-- Choose master branch for the source.
-- Click Enforce HTTPS if you have the option available.
You can also serve assets from the training github account: https://cloudinary-training.github.io/cld-advanced-concepts. 

![gh-pages](https://res.cloudinary.com/cloudinary-training/image/upload/v1588285680/book/setup-gh-pages.png)


## VS Code Node debug  

VS Code Node Debug: optional
Simple breakpoint debugging
-- Enable Debug > Node: Auto Attach
-- Set breakpoints
-- In terminal node --inspect `<filename>`

![node debug](https://res.cloudinary.com/cloudinary-training/image/upload/v1588285899/book/setup-node-debug.png)

## Cleanup 

If you want to remove all assets from your cloud that were uploaded in this course,
you can find cleanup scripts in the `/utils` directory

## Chrome XHR Localhost bug (Adaptive Streaming)
There are some instances where serving from localhost will not work correctly
because XHR is used and there can be bugs around this, such as this one in
chrome:
https://bugs.chromium.org/p/chromium/issues/detail?id=67743
Links are provided to serve from the Advanced Concepts Server
https://cloudinary-training.github.io/cld-advanced-concepts