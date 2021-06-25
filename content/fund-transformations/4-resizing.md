---
title: "Resizing"
metaTitle: "Resizing"
metaDescription: "Resizing"
---

(show a cropped image that is not skewed and one that is)

Let's start with a transformations that changes the dimensions of an asset.  When modifying height and width, we need to be concerned with the effect on aspect ratio so that the image doesn't appear skewed.  

## crop transformations

We use the `crop` transformation option to change dimensions. When using the crop transformation, you will usually apply 1 or more dimensions with a numeric pixel or percentage value. 

## Crop Mode

Let's look at how we can use the cloudinary Video Helper in node.js code to create a transformation.  Then we'll examine the URL it produces.  When you use the **crop** mode, its like you've taken a pair of scissors and cut out a section of the asset according the dimensions specified.  If you don't supply any dimensions, this mode will leave the asset with its original dimensions.

(show skewed video if you use dimensions without `crop` mode specified as the default mode is `scale` and it can result in skewed image).

If you specify dimensions with out the `crop` mode specified as the default mode is `scale` and it can result in skewed image

(show the code for creating a URL that crops a video)
In this example we are cropping with the **crop** mode and providing both width and height dimensions as pixels.  We don't include `px` that way you might in CSS.

The Video helper produces a video tag with video URLs in different formats for different browsers as well as a poster image. 

(show code and url for crop with pixels)
```javascript
cloudinary.video("dog", {
  width: 300,
  height: 200,
  crop: "crop"
})
```
The URL for the mp4 version of the video looks shows the crop and dimensions.
`http://res.cloudinary.com/pictures77/video/upload/c_crop,h_200,w_300/dog.mp4`

The URL generated by this shows that the `crop: "crop"` is abbreviated as `c_crop`, the height dimension is abbreviated as `h_200`, and the the width dimension is abbreviated as `w_300`.  

(read as "c underscore crop", "h underscore 200", "w underscore 300")

We can use pixels or percentage for cropping dimensions.  We've seen pixels used and in the next example, we see that percentage is similar.  The values used for percentage are written as fractions.  If you use a value of 0.20 you are indicated 20%. 

## Percent dimensions


Percent dimensions would look like this in code. The abbreviations in the URL look the same as the URL with pixel dimensions but the numbers are different.

(show code and url for percent)
```javascript
cloudinary.video("dog", {
  width: 0.3,
  height: 0.2,
  crop: "crop"
})
```
`http://res.cloudinary.com/pictures77/video/upload/c_crop,h_0.2,w_0.3/dog.jpg`

## Skewing

The default mode is "scale" which can result in a skewed image.

(show a skewed image where the crop mode wasn't used)


https://res.cloudinary.com/demo/video/upload/w_300,h_300/dog.webm

is equivalent to

https://res.cloudinary.com/demo/video/upload/w_300,h_300,c_scale/dog.webm

## Scaling with 1 dimension

If you scale with 1 dimension you can avoid skewing.

https://res.cloudinary.com/demo/video/upload/w_300/dog.webm

## Using w_auto

If you want to avoid skewing while relying on the default `scale` mode, you can use w_auto with a height dimension.

https://res.cloudinary.com/demo/video/upload/w_auto,h_200/dog.webm

## Responsive Resizing

In our efforts to provide responsive web pages with optimally sized media assets, we can get help from the Cloudinary `responsive` function.

This function will generate derived images that  match the required dimensions to the exact image width available and the DPR (Device Pixel Ratio) of every device.

This involves adding the **cloudinary-core-shrinkwrap** JavaScript library.
(show code to add library)

Then, in the HTML `img` tag add a source URL with `w_auto` and `c_scale` transformations.  Finally add the class `cld-responsive` to the image tag.

In JavaScript, after the DOM is loaded, you can active the responsive function.  This will tell the web page to "listen" for changes to the viewport and respond by loading smaller images with the correct aspect ratio.

(Show the code that calls the repsonsive function)

```javascript
script type="text/javascript">
     var cl = cloudinary.Cloudinary.new({
       cloud_name: "demo"
     });
     cl.responsive();
    </script>
```

### Responsive Breakpoints Generator

Cloudinary provides a web page that can help to generate images that are correctly sized and proportioned for your needs. The tools takes into account the sizes and resolution needed.  It will generate code for your chosen language that implements responsive sizing using the Upload API.

(show picture of upload API with responsive image choices)
(show picture of image tag)

## Assignment Time

(show steps that we're doing in assignment)

We're going to use the Upload API with the `responsive-breakpoints` option to create a set of derived images.  
Start by executing: `node transformations/responsive-breakpoints.js`

The `transformations/w-auto-example.html` HTML file has been set up to serve responsive images.  Change the URL to use your cloud name so that the images you created during upload can be served up with this web page.

