---
title: "Signed vs. Unsigned"
metaTitle: "Signed vs. Unsigned"
metaDescription: "Signed vs. Unsigned"
---



It is possible to render and use both signed and unsigned widgets.  In order to better understand the difference, we'll code both of them.  

## Signed vs. Unsigned Widget Input

![Signed vs Unsigned Inputs](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093966/book/unsigned-v-signed-input.png)

The two widgets require different inputs, and noticed that both widgets require the **API_SECRET** and a **timestamp** in order to be signed.  The API_SECRET is a part of your Cloudinary credentials that must remain hidden.  You can't supply it in front end code.  You'll either need to use a server or a serverless function to write code that uses the API_SECRET.  Your CLOUDINARY_URL contains the API_SECRET, so this is a good value to add to your environment variables.  Remember, you can access the individual variables from the CLOUDINARY_URL by using the SDK.  

```JavaScript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name
const apiSecret = cloudinary.config().api_secret
const apiKey = cloudinary.config().api_key

```
## Unsigned Credentials
Notice that the Media Library Widget uses the API_KEY and user name while the Upload Widget uses an unsigned preset for front end credentials when they are unsigned.  This is sufficient for may workflows.  Whether you're using signed or unsigned widgets, its a good idea to host them on web pages that are authenticated in some way or behind a firewall because they allow you to modify the contents of your cloud.



The API_KEY and username that are required by the media library widget reflect the fact that you are essentially logging in to use this widget.  In many cases, the user using the media library widget is also logged in to the cloud account that is associated with the username.  Unsigned presets make it possible for front end uploads whether you are using the Upload API or the Upload widget. 

