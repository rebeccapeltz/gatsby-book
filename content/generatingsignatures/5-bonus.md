---
title: "Bonus: API Sign URL"
metaTitle: "Bonus: API Sign URL"
metaDescription: "Bonus: API Sign URL"
---



## Create an API that could help with asset signing from the front end
Since we're creating APIs to help with securing widgets via AJAX, in this bonus section we look at creating an API that can make it easy to sign a URL from the front end.  If you make this API call available on the front end, you'll want any pages using it to be available only behind a firewall or using token authentication.

Remember that you don't want your front end code to have access to API_SECRET, but if you want to take advantage of code the relies on API_SECRET like the Cloudinary Node SDK, you can run that code in a web API or a serverless function that has access to environmental variables.

In this section, we'll set up a server that takes an object with two strings: public ID and transformation.  The transformation is an object of key value pairs where the key is a valid transformation option.  

### Use Case

You're using a front end library or framework (think Vue.js, Angular, React, jQuery), and you need to sign your URLs.

You can use an HTTP client to call your API with a public ID and a transformation.

### Exercise: Create a server to provide API that could sign a URL

Copy your .env file to `signing-widgets/bonus`.  Upload an image for this exercise. Go into the `signing-widgets/bonus` directory and install packages.

```bash
cp .env signing-widgets/bonus
node signing-widgets/bonus/upload-image.js
cd signing-widgets/bonus
run npm install
run node app.js

```
Open the server in a browser and see that that GET tells you need to post to the `/api/signurl` route.

```javascript
{"message":"post to /api/signurl an object with public_id and transformation keys"}
```

You can use cURL to post an object with a public ID and a transformation to the API.

```bash
curl --location --request POST 'http://localhost:3000/api/signurl' \
--header 'Content-Type: application/json' \
--data-raw '{
 "public_id":"tiger-lilly",
 "transformation":{
   "type": "upload",
   "width": 400,
   "quality": "auto",
   "fetch_format": "auto",
   "secure": "true",
   "sign_url": "true"
 }
}
'
```

You should this response.

```bash
{"status":"accepted","url":"https://res.cloudinary.com/pictures77/image/upload/s--dlCfufWD--/f_auto,q_auto,w_400/tiger-lilly"}

```

So, we input a JSON object 

```javascript
{
 "public_id":"tiger-lilly",
 "transformation":{
   "type": "upload",
   "width": 400,
   "quality": "auto",
   "fetch_format": "auto",
   "secure": "true",
   "sign_url": "true"
 }
}
```
and we got back a signed URL.

What do you think happened in our API?  We called the node SDK url helper. Let's look at the server code.

### Server code snippets  

We begin by setting up an express server and we use body parser to parse the object that we're posting.

```javscript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
app.use(bodyParser.json())

const port = 3000

```

Our GET endpoint just informs the user that they should use the `/api/signurl`. 

```javascript
app.get('/', (req, res) => {
  res.json({
    message:
      'post to /api/signurl an object with public_id and transformation keys'
  })
})

```

Now, the API is not really signing the URL.  The input is requesting that the URL be signed by providing the `sign_url: true`.  I leave it to you to create an API that adds that option to any URL.

The post pulls the public id and transformation out of the input and then calls `cloudinary.url` to create a signed URL.

 ```javascript
app.post('/api/signurl', (req, res) => {
  console.log('req.body', req.body)
  console.log(req.body.public_id)
  console.log(req.body.transformation)

  const url = cloudinary.url(req.body.public_id, req.body.transformation)
  console.log(url)
  res.json({ status: 'accepted', url: url })
})

 ```



