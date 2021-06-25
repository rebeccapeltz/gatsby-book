---
title: "Introduction"
metaTitle: "Welcome to Cloudinary Advanced Concepts For Developers"
metaDescription: "This course follows the Cloudinary Fundamentals for Developers course."
---

# Welcome

Welcome to the Cloudinary Advanced Concepts for Developers course. This course assumes you’ve completed the Cloudinary Fundamentals for Developers course or have equivalent mastery of Cloudinary training concepts using node.js.

In a workshop format, we hope that you can follow along and execute the code with us toward your own cloud.  If you have a question, please share it on the QA tab.  The Zoom chat is good for sharing links or other information with the whole class.  Instructors will serve as tech support when they are not presenting a module.  If any questions don’t get answered in this course, please look for answers by contacting our support team at support@cloudinary.com.  You can reference this course to forward questions directly to me.

You should have received a link to set up notes for this course.  Let’s review some notes on setup now. 

## Cloudinary Account  

You should have node/npm installed with a version > 10.4.    

## Github Repository  

Download or fork/clone the repo found on github at [cloudinary-training/cld-advanced-concepts](https://github.com/cloudinary-training/cld-advanced-concepts). The repo contains the assets that we’ll be using in exercises as well as code.  This repo can serve as a reference for you after the course.  The repo is served on github.io so you can access resources at [https://cloudinary-training.github.io/cld-advanced-concepts/](https://cloudinary-training.github.io/cld-advanced-concepts/). You’ll also be able to access them on localhost once you download the repo.  The repo has folders organized by module. 

## Dev Environment  

We’re using visual studio code as an IDE. Some of the exercises involve requesting an HTML file in the browser.  We’ll be using the [live server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve files locally.   You can also npm install [http-server](https://www.npmjs.com/package/http-server) globally and run npx http-server to start a local server.  

## Environment Variables  

You’ll find a .env.template file in the root of the project. [show .env.template]  Copy this to .env or run touch .env.  Replace the sample cloudinary-url and user-name with the cloudinary-url that you can copy from the Cloudinary console and the email that you used to sign up for the account.  [show Cloudinary console]



Once your environment variables are in place you can run most node scripts from the root by opening a terminal (ctrl -\`) and executing 

```bash
node <path>/script name
```

## Module Flow

The modules flow like this:  we discuss concepts using slides, review the code and then run it in the terminal. Once you see this flow, you should be able to run scripts along with the instructor.  














