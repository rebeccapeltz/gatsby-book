---
title: "Environment Variables"
metaTitle: "Environment Variables"
metaDescription: "Environment Variables"
---



## .env
Your `.env` file is `.gitignored `and can’t be accidentally checked into a repository
because it will contain your `API_SECRET`.   

In the root of the project, you’ll find a `.env.template` file.
Copy it to an `.env` file and add your information: 
```bash
cp .env.template .env
```
This link will take you to the Console, where you can copy the Cloudinary 
URL into your buffer: https://www.cloudinary.com.

The .env file should contain the CLOUDINARY_URL and a USER_NAME which is the email you used to sign up for the account.

```bash
CLOUDINARY_URL=<cloudinary URL from console>
USER_NAME=<cloudinary account email>
```

## How to Run the node.js scripts 
See the .env.template for example of what is needed as described above.  Before running any scripts you need to run `npm install` in the terminal in the directory containing the package.json.  

You may want to run npm install in all the subdirectories prior to starting the
course. This can guarantee you are ready if you are accessing the course in a
network where npm install may be blocked.
These are the directories that contain a package.json and need the npm install:

1. signing-widgets/bonus  
2. signing-widgets/server  
3. user-upload-workflows/remote-functions  
4. video-player/vuejs  

All scripts (unless otherwise noted in a module) can be run from the root of the
project in the terminal.  

If I want to run a script in the /access-control directory to upload a private asset, I
can run it from the terminal like this from the root directory:
```bash
node access-control/private/upload-private.js
```

## Test your setup

Test that your environment variables are setup correctly:

```bash
node test-env.js
```

Test that you can upload assets:

```bash
node test-update.js
``` 
