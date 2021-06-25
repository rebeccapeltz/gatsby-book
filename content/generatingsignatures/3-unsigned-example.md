---
title: "Unsigned Example"
metaTitle: "Unsigned Example"
metaDescription: "Unsigned Example"
---



## Unsigned Widgets

Before we look at how to sign data associated with a widget, let look at how to set up unsigned widgets.  The code for the front end is very similar whether you are signing or not.  We'll see that the inputs for the Upload and Media Library widgets are different, but that the organization of the front end code and libraries is similar.  

## Credentials for Unsigned Widgets

![Credentials for Unsigned Widgets](https://res.cloudinary.com/cloudinary-training/image/upload/book/unsigned-widgets.png)

## Exercise: Coding Unsigned Widgets  

Create an unsigned preset “widget-preset” for upload widget: 

```bash
node signing-widgets/unsigned-example/create-preset.js
```


Locate `signing-widget/unsigned-example/script.js` and update with the following

```javascript
const cloudName = '<cloudname>'
// upload widget needs unsigned preset
const uploadPreset = 'widget-preset'
// media library widget needs apiKey and user email
const apiKey = '<api key>'
const userEmail = '<account email>'

```

## Code Snippets

Set up the library and client JavaScript imports.

```html
 <!-- upload widget -->
    <script
      src="https://widget.cloudinary.com/v2.0/global/all.js"
      type="text/javascript">
    </script>
  
    <!-- media library -->
    <script src="https://media-library.cloudinary.com/global/all.js"
      type="text/javascript">
    </script>

    <!-- instantiate widgets -->
    <script src="script.js"
     type="text/javascript">
    </script>

```  

### Upload Widget

#### HTML

For the upload widget, we'll render a button.  We'll see in the JavaScript that we can attach a click event handler to this button.  We'll also render an id'd image tag.  Once the image is uploaded, we'll receive the upload response containing the secure_url from Cloudinary. We can apply the secure_url to the image `src` to get visual confirmation that the upload was successful.

```html
<h2>Upload Widget</h2>
    <div>
      <button id="upload_widget" class="cloudinary-button">Upload files</button>
    </div>
    <div>
      <img id="uploaded" />
    </div>
```

### Media Library Widget 

For the Media Library Widget, we'll render an id'd block element, in this case a `div`. The media library code will take care of setting up the event handler.  There is no need to provide a visual cue of activities that take place on the media library, since you can see the effect of the changes as you make them with this widget.

```html 
 <h2>Media Library</h2>
    <div id="ml-button"></div>

```

#### Client JavaScript

First we can set up code that will wait for the JavaScript libraries request in the HTML to load.  Then we call functions to set up the widgets.

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  renderUploadWidget()
  renderMediaLibrary()
})
```

##### Upload Widget  
With the credentials setup, we can supply the options.

```javascript
const uploadOptions = {
  cloudName: cloudName,
  uploadPreset: uploadPreset
}
```

Next we can define a callback function that will test the callback event.  The upload widget fires a number of events that allow the developer to monitor the callback process.  In this code we test for 'success' and the apply the secure_url from the response to the image tag already rendered.

```javascript
const processResults = (error, result) => {
  if (!error && result && result.event === 'success') {
    console.log(result)
    // if successful renders to page
    document.querySelector('#uploaded').src = result.info.secure_url
  }
}
```

Finally we instantiate the upload widget and pass it the options and callback defined above.  Then we add a click event to the button rendered and call the widget's `open()` function.

```javascript
const renderUploadWidget = () => {
  const myWidget = window.cloudinary.createUploadWidget(
    uploadOptions,
    processResults
  )
  document
    .getElementById('upload_widget')
    .addEventListener('click', () => myWidget.open(), false)
}
```

#### Media Library Widget

With the credentials setup, we can supply the options.

```javascript
const mlOptions = {
  cloud_name: cloudName,
  api_key: apiKey,
  username: userEmail,
  button_class: 'myBtn',
  button_caption: 'Select Image or Video'
}
```
We create an insert handler that will log back to the client and assets inserted while working in the Media Library.

```javascript
const insertHandler = data => {
  data.assets.forEach(asset =>
    console.log('Inserted asset:', JSON.stringify(asset, null, 1))
  )
}
```

Finally, we'll create the media library using the options and insert handler created above, as well as supplying it the element rendered in html where we want the media library to appear on the page.

```javascript
const renderMediaLibrary = () => {
  window.cloudinary.createMediaLibrary(
    mlOptions,
    insertHandler,
    document.querySelector('#ml-button')
  )
}
```



