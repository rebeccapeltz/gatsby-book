---
title: "Generating Signatures"
metaTitle: "Generating Signatures for Upload Widget and Media Library"
metaDescription: "You can generate signatures for  the upload and media library widgets to ensure controlled access to the processes that allow uploading assets."
---

# Generating Signatures

You've learned how to use access control to secure your assets. One of the techniques for making private or authenticated URLs accessible to your users is to sign them which can do by set the `secure_url` option to `true`.  You've seen the signature created when you sign a url. The signature appears as a string enclosed in `s-- --` as in the URL below
`https://res.cloudinary.com/cloudname/image/authenticated/s--O4xouy00--/v1595543030/dolphin.jpg`

Cloudinary provides widgets that allow you to upload and manage your assets in the cloud.  If you are restricting and signing your assets, you will want to learn how to sign the processes allow you upload and manage them.  

In this module, you'll learn how to generate the signatures that can be applied to the upload and media library widgets than enabled a signed process.  We'll generate signatures in an express signature and make them available to the widgets through api calls and through server side rendering.

As a bonus we can look at creating an API that accepts an image with options that include the `secure_url` set to `true` and returns a signed URL.  

The important thing about generating signatures is that the API SECRET is always part of the string to be signed.  The API SECRET should never be revealed.  This means that it can't be included in front end code and must be used on the server side.  This is why we access it by an API call from the front end or we render the web page containing it from the server.  The web page that contains the widget with a signature should be an authenticated page.

