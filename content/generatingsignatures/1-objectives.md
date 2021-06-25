---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---


## Widgets

- What are the Cloudinary Widgets? Upload and Media Library
- Look at functionality and differences in widgets
- Why do the widgets offer a signing option?
- Use server side rendering to render signed widgets
- Use server APIs to provide signature and timestamp
- Become familiar with the signing functions and how to include them in an application
- Bonus: how to create an API that will sign your URLs

As you study the images of the widgets below, you'll recognize them as looking identical to what is provided in the Cloudinary DAM.  When you instruct the creation of these widgets in your code, hidden iframes are set up in your browser memory and are made visible by a user clicking on a button. 

## Media Library  
![Media Library Widget](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093366/book/media-library.png)

## Upload
![Upload Widget](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093116/book/upload-widget.png)


## How to sign widgets

In this module we'll create a server that contains modules for signing the Upload and Media Library widgets.  We'll provide two ways to sign the widgets: 

1. Server side rendering  
2. APIs
