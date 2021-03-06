---
title: "Named Transformations"
metaTitle: "Named Transformations"
metaDescription: "Named Transformations"
---

## Named Transformations

We've seen and created complex transformations using overlays and chained transformations.  When you look at the URL, you can see that there is a lot going on there.  A named transformation allows us to assign a name to a transformation. Whether its just a simple crop or a complex chained transformation with overlays, we can refer to the functionality it provides with a simple name.


(show a picture of a URL containing a lot of transformations and an overlay)

## Fundamentals of Transformations and Applying as Presets


Named transformations solve a couple of potential problems:

- Search Engine Optimization (SEO) favors a simpler URL which can be provided by a named transformation.  All that we add to a URL when we have a named transformations is a t_**chosen name** ("t underscore followed by the name that has been assigned)

(show a picture of how a named transformation is constructed with the t_ instead of the full name)

- Keep the details private and URLs are public.  Transformations can reveal a lot about assets we are storing.  If you're using overlays to provide a watermark, you might not want to make the details of your watermarking known to the public.

(show a picture of a URL with a custom logo)

- The transformation might be something you want to reuse.  A transformation used to apply a watermark could be used on many assets.  If it need to change, you'd just have to change the named transformation, not every previously derived asset.

(show a picture of different asset with the same watermark)

## Assignment Time: Named Transformations

Let's turn one of the transformations you've already created into a named transformation.

We're using a function from the Admin SDK to create a named transformation.

(show code and execute)

```bash
node chained-and-named-transformations/create-named-transformation.js
```
You can see that the `create_transformation` function takes a string that will be used as the name of the transformation and an object that contains the transformation options.

```javascript
cloudinary.api.create_transformation('small_fill2_1', {
  width: 150,
  height: 100,
  crop: 'fill'
})
```

When we apply this named transformation to an asset, which is done by pre-pending the name with `t_` (t underscore), the asset will use it as if we had assigned it directly.

(show code for using an named transformation and run it)

```bash
node chained-and-named-transformations/use-named-transformation.js
```

```javascript
const url = cloudinary.url('cute_animals/kitten', {
  secure: true,
  transformation: ['small_fill2_1']
});
```

(show the url created in the browser)

Look at the URL that is created.  It's shorter but it creates the same effect.  We can now create our own abbreviations for transformation instructions.  We can start to think in terms of templates that we have created and named.

The name itself can contain any US-Ascii character like alpha numerics,  `_`, `-`, and `~`.  It cannot contain a `.`.  Think about URL encoding and stay away from control characters and reserved characters in naming transformations.

## Creating Named Transformation in the DAM

If you Click on the Transformations tab in the DAM, you'll see a list of all the transformations  that have been requested.  The select control on this page lets you filter on named and dynamic transformation.  You can create a named transformation out of an existing dynamic transformation here.

(navigate to DAM transformation page and show the filter for named/dynamic)

Locate a dynamic transformation.  It will NOT start with `t_`. Click on the edit link.  Locate the "Save as" button and give it a name.

(walk through saving a dynamic transformation and giving it a name)

(click on the link to go back to all transformation)

Go back to the list of all transformations.  You'll see the named transformation you created.  Click on view sample to see it applied to the demo Sample image of flowers. 

(point out the URL)
Notice that the `t_` has been pre-pended to the name you gave it.  You don't need to add that yourself.

## Creating a named transformation preset

While we're in the DAM let's look another useful feature associated with named transformation.  

(locate the named transformation just made)

Now click on the link to "Add to Presets".  You'll see that the link gets replaced with a link to  "Remove from Presets".  Let's see what this feature does for us.  Go to the Media library, locate an uploaded image and click on the icon to "manage" the image.  You'll see the set of "Transformation Presets" beneath the original image.  You should see the named transformation you just created and added to presets in this list.  Click on the preset to see it applied to the original image.

## Application Techniques

We can add other transformations to a named transformations,  in the same way we add transformation options.

Use the `transformation` option to add an array with the named transformation you want to use.  You don't need to add the `t_`.

(show the code for adding a named transformation)

```javascript
cloudinary.image("sample.jpg", {
  transformation: ["jpg_with_quality_30"],
  width: 100,
  height: 50,
  crop: "fit"
})
```
(show the URL in the browser)
https://res.cloudinary.com/demo/image/upload/t_jpg_with_quality_30,w_100,h_50,c_fit/sample.jpg

Notice that this is NOT a chained transformation.  The named transformation is with in the same `/ /` delimiters as the other options.

But we can use named transformations in a Chained transformation.

In fact, this is a good way to add f_auto to a named transformation.  You shouldn't include formatting options in your named transformation because formatting is handled at the CDN and cropping and effect are handled within the Cloudinary server.  So you can add `/f_auto` after the named transformation.

(you could add the /f_auto,q_auto/ to the transformation above)

(show the code for using named transform in a chained transform )

In the code below we have a 3 named transformations set up as chained transformations.  We can guess on the instructions in each of the named transformations.  It looks like this code will add compression with quality of 30, then crop to a 400 by 400 square and finally crop to 100 x 150 using fit to handle the change in aspect ratio.



```javascript
cloudinary.image("sample.jpg", {
transformation: [{
    transformation: ["jpg_with_quality_30"]
  },
  {
    transformation: ["crop_400x400"]
  },
  {
    transformation: ["fit_100x150"]
  }
]
})
```


(show URL in browser)


https://res.cloudinary.com/demo/image/upload/t_jpg_with_quality_30/t_crop_400x400/t_fit_100x150/sample.jpg



## Assignment: Applying Named Transformation Techniques

Find a transformation that you already created and make it a named transformation.  Try the named transformation out on some images.  Add it to the transformation presets and try it out there.








