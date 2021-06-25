---
title: "IF"
metaTitle: "IF"
metaDescription: "IF"
---

## Intuition 

The **if** presents a conditional expression. We'll talk more about when to use **end** with **if**, but you can rely on our understanding of conventional C-syntax languages that allow you to write an **if** statement without an **end** when you are only executing one command when the expression is TRUE.

### No END needed
```javascript
if (test) log(‘ok’)
else log (‘not ok’)
```

When you need to execute multiple expressions you provide a curly brace to crate a block.  An END can be thought of as finishing a block of expressions that all get exectuted as a result of meeting a condition.

### END needed

```javascript
if (test) {
  let greeting = ‘hi’ + test
  log(greeting)
else {
  log (‘not ok’)
}
```

## Example

### General

```
if_<property>_<operator>_<value>,<transformation>/
```

### Specific

```
if_w_gt_1000,w_500/
```

## Exercise: Responsive Video Aspect Ratio 

Use case: If you have a standard video with a 16:9 display aspect ratio and you want to serve it to a mobile device, you can test aspect ratio and width to decide whether to transform.

For example, the original size of the video is 1280 x 720 which is an aspect ratio of ~1.78. We only want to transform if the aspect ratio is greater than 0.65 and the width is greater than 1000.

```javascript
if: 'ar_gt_0.65_and_w_gt_1000',

```

Execute the following to test this out:

```bash
node conditionals/video/conditional-ar.js
``` 

The full code for this includes a transformation that sets the aspect ratio and width.

```javascript
const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  if: 'ar_gt_0.65_and_w_gt_1000',
  aspect_ratio: '0.65',
  height: 1000,
  crop: 'fill'
})
```

![landscape to portrait with video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589231856/book/conditional-video-ar.png)

