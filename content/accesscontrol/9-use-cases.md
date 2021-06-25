---
title: "Use Cases"
metaTitle: "Use Cases"
metaDescription: "Use Cases"
---

We'll review the use cases for each of the access control methods we've discussed.  First it's good to point out that all of these methods are available to customers with a free account.  If you have a paid account, this can open the way for some additional access control methods including using cookies and tokens. 

## Cookies and Tokens

The chart below compares features offered by each of the three major access control methods: signing, tokens and cookies.  Using access tokens requires a private CDN and using cookies requires a CNAME.  If you are interested in using cookies or tokens, contact support@cloudinary.com to get help setting it up.

![tokens and cookies](https://res.cloudinary.com/cloudinary-training/image/upload/v1590525707/book/ac-cookies-tokens.png)

## Review Use Cases

The chart below summarizes the access control methods that you have learned to implement in this module.  The `access_control` option is the only one of the methods available to customers with free plans that want to control access by time. 

The **private** is intended for customers who don't want the original image accessed.  This could in a situations where all assets should be served as watermarked.  However, if you want to enforce watermarking, you would need to upload the asset as **authenticated**, or a user could add the `a0` transformations and see the asset as it would appear in its original state.

Enabling the **strict transformations** flag is useful for preventing non-user traffic from creating transformations. It is often used in work flows or build processes for creating transformations.  We know that we can still create transforms using **named transformations** or **eager explicit** transformations even with strict enabled.

![use cases](https://res.cloudinary.com/cloudinary-training/image/upload/v1590526046/book/ac-review-use-cases.png)

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!