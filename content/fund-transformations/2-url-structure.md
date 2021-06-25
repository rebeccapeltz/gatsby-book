---
title: "URL Structure"
metaTitle: "URL Structure"
metaDescription: "URL Structure"
---

```bash
https://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<transformations>/<version>/<public_id>.<format>
```
(Show a picture of a URL with transformations and point out the "anatomy")
 
(highlight the protocol) 
A URL is a standard for requesting any kind of resource on the Internet.  It beging with a protocol like HTTP (http or https if its encrypted) 

(highlight the domain name) 
After the URL we see the domain name which is a reference to the server that we are making our request to. 

(highlight rest of URL) 
The rest of the URL contains a path to the resource.  Let's look at details in the path to a Cloudinary resource.

## "Anatomy" of a Cloudinary URL

We've be creating URL and using them to request images throughout this course.  In uploading and managing our assets, we've focused on the **cloud name**, the **resource type** and the **type**.   

Let's review what we learned so far about these elements of the URL.  

(highlight cloud name in URL)  
Cloud name is the unique identifier for our cloud repository.  It appears directly after the res.cloudinary.com in the URL.  We can always find the cloud name in the cloudinary console.  

(highlight the resource types of 4 URL representing the types)
Resource type tells us whether we are dealing with an **image**, a **video** or a **raw** file.  We also have learned about the **fetch** type which we use to upload a remote image using it's full URL.

(highlight the type in the URL)  
The type is also referred to as "delivery type".  You've seen then when you've set up presets in the console.  We've used the **upload** delivery type in this course.  In the advanced concepts course you can learn about private and authenticated delivery types.  The **upload** deliver type is used for public assets.  

(highlight transformation within a URL)  
In this section will be learning about transformations.  Transformations follow delivery type in the URL.  We'll start with single transformations which are specified as comma separated abbreviations within a pair of forward slashes.   

(highlight transformations within a chained transform URL)  
Later will learned about chained transformations.  These act like piped bash commands where the output of one transformation becomes the input for the next.  

(highlight a version)  
After the transformations you might see a version.  This starts with a **v** followed by 10 digits.  We've studied versioning so you know that using versions in your request URL is optional depending on how you are setup.  

(highlight public id and format)  
At the end of the URL you'll find a public id and format.    

(highlight a public id with a directory)  
The public id may include a directory so there could be a forward slash in it.    

(highlight the format)  
At the end of the URL is the format.  This looks like a file extension.  Its not usually part of the public id.  We'll see that using transformations will allow us to serve a given public id with different formats.    