---
title: "Caching"
metaTitle: "Caching"
metaDescription: "Caching"
---

## CDN and Browser Caching 

In this course, we’ll be concerned about browser caching and CDN caching.
Understanding the flow of requests through the CDN and into Cloudinary’s system storage will help. It’s also helpful to be able to identify if you are caching in the CDN and to eliminate browser caching. 

You can use the [Cloudinary Debugger Chrome Extension](https://chrome.google.com/webstore/detail/cloudinary-debugger/ehnkhkglbafecknplfmjklnnjimokpkg?hl=en) to detect browser caching. 

![Cloudinary debugger](https://res.cloudinary.com/cloudinary-training/image/upload/book/setup-browser-caching.png)

To avoid browser caching, you can 
- check the disable cache and keeping the chrome inspector open,
- find an extension that prevents browser caching
- open your image requests incognito (Chrome) or private (Firefox)  

## Detect caching on Fastly


![Caching on Fastly](https://res.cloudinary.com/cloudinary-training/image/upload/v1588286105/book/setup-caching-fastly.png)

You can purge a fastly cache with this command:

```bash
curl -X PURGE https://www.example.com/image.jpg
```

