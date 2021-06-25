---
title: "Concepts and Terminology"
metaTitle: "Concepts and Terminology"
metaDescription: "Concepts and Terminology"
---

## What is Adaptive Streaming

Large videos or videos served over a slow network can have negative effects for the viewer, such as buffering and poor quality especially at small screen sizes. Most video plays at 24-30 frames per second so the Internet must deliver that to keep from buffering

The word "Adaptive" helps to understand another problem that is harder to see: networks throughput can vary overtime and because networks are switched, the topology can result in varied throughputs from origin to destination.  Therefore pushing a lot of data from origin to destination may require adapting to changing network conditions.

In the past this problem might have been solved at the TCP layer of the network, but now we have an HTTP, Layer 7, solution.  This means we don't have to build any complex infrastructure to achieve a better streaming experience.  We'll see that the large file is chunked and a list of the chunks is sent to the browser.  The browser can then use XHR to ask for these chunks in the correct order.  Meanwhile the chunks can be sent to the browser before they are needed.

In this module, we'll learn how to create stream profiles that produce different format dimensions.  We'll see that different browser translate different codecs and we can build this in to the profiles so that the webpage can offer up instructions for fallback as the video is served in different browsers.

## Formats

There are two formats used for Adaptive Streaming:

- **HLS**: **H**TTP **L**ive **S**treaming Developed by **Apple**
- **MPEG-DASH**: **D**ynamic **A**daptive **S**treaming over **H**TTP International standard

It's useful at this point to become familiar with the file types that will be delivered to the browser for each of these streaming formats.  The table below introduces the two formats and the file types they rely on.  You'll see these file types when you look at the Network tab in Dev tools.  When using Safari look for `.ts` (chunked audio/video) and `.m3u8` files for the `hls` format.  When using Chrome look for `.mp4dv` (chunked video), `.md4da` (chunked audio), and `.mpd` files DASH.  Using JavaScript either browser any browser can support either type, since the file types can be read in with XHR and served through a video player.

![streaming formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1590767588/book/as-streaming-formats.png)

### Note: Adaptive Streaming with localhost

In this module we’ll be configuring code to implement adaptive streaming. We’ll use the browser and the network tab to look at the effects of adding adaptive streaming. 

There are some issues using Adaptive Streaming from localhost.  You can get around these problems by one of these methods:
- run code incognito
- run from a server on the Internet
  -push your HTML files to your GitHub repo (if you’ve forked or duplicated) and use gh-pages (GitHub pages) to serve from your account.github.io server
- use the Cloudinary training server: https://cloudinary-training.github.io/advanced-concepts/adaptive-streaming




