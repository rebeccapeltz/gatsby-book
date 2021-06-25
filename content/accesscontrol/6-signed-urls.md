---
title: "Signed URLs"
metaTitle: "Signed URLs"
metaDescription: "Signed URLs"
---

## Providing access to restricted assets
We've learned 4 ways to "lock down" access to original and transformed images:

1. **private** delivery type restricts access to the original asset
2. **authenticated** delivery type restricts access to both the original asset and any transformations of that asset
3. **access control** option using a start and stop times limits access to a time period
4. enabling the **strict transformation** setting restricts the creation of on the fly transformations for the entire cloud account

Now that we know how to restrict access, let explore ways to open up access to our restricted assets and transformations.  

## What is "signing"?

In the image below the signature of the URL is highlighted in red.

![Signature in URL](https://res.cloudinary.com/cloudinary-training/image/upload/v1590515313/book/signed-url.png)

When we learned to restrict access to original assets we discussed "signing" the URL and mentioned that we use the API_SECRET to sign it.  We saw that the signed url contained a section of its path with some characters that were delimited by `s--` and `--`.  The characters between those delimiters are a the calculated signature.  We'll  more about creating signatures in the **Signing URLs** module.  

Because the signature requires the **API_SECRET**, which is only available to people who have the credentials to see it, Cloudinary can be sure that a properly signed URL is OK to deliver.  When a request for a signed URL is made to Cloudinary, it is verified by matching it to a signature that is calculated using the same calculation used to create the signature.

The signature is created using a cryptographic digest of a string that includes the public id, any transformations and the API_SECRET.  You can hand code this signature or include the option `sign_url: true` in your URL helper function.

## "Hand Coded"

We'll start by writing our own code for a signature.

```bash
node access-control/signature/hand-code.js
```

In the code below, we use a couple of external libraries from npmjs.org to help with the signing.  The `crypto` library provides the `sha1` encryption algorithm.  The `urlsafe-base64` converts the digested bits into a binary format that we can add to a URL.  We're just following the process that the Cloudinary back end is using to create the signature.

1. get the public id string
2. get the transformation string
3. concatenate the transformation and public id with a `/` and the api secret to create the string to sign
4. apply the crypto hash algorithm, digest and slice off the first 8 characters
5. URL base64 encode the characters and then concatenate within `s--` and `--` delimiters
6. Add the signature to the URL right after the delivery type

```javascript
// extract signing information fron env
const cloudname = cloudinary.config().cloud_name
const secret = cloudinary.config().api_secret

const crypto = require('crypto')
const URLSafeBase64 = require('urlsafe-base64')

// dolphin is authenticated
// hand coded signature
const transformation = 'c_limit,h_400,w_400'
const publicId = 'dolphin'

const toSign = [transformation, publicId].join('/') + secret

const s = URLSafeBase64.encode(
  crypto
    .createHash('sha1')
    .update(toSign)
    .digest()
).slice(0, 8)

const signature = 's--' + s + '--'
const url = [
  `https://res.cloudinary.com/${cloudname}/image/authenticated`,
  signature,
  transformation,
  publicId
].join('/')
```

## Sign with URL Helper

Using the URL helper function option `sign_url:true`, we can easily sign any URL from ndoe.js.

```bash
node access-control/signature/cloudinary_url_helper_signed.js
```
In the example below, we are using the **dolphin** asset that we uploaded in the **authenticated** section.  By signing the URL, we can access the original and in this case add transformations.

```javascript
const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  crop: 'limit',
  sign_url: true
})
```