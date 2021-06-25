---
title: "Syntax"
metaTitle: "Syntax"
metaDescription: "Syntax"
---

Before addressing use cases, let's look at the syntax for working with conditionals.

## Comparison Operators

The logical operators provide tests for equality and *in/not in* list or set of strings.

![logical operators](https://res.cloudinary.com/cloudinary-training/image/upload/v1589228208/book/conditional-logic-ops.png)

## Boolean Operators

The boolean operators allow you to create boolean expressions testing multiple values.  Operator precedence follows what is done in conventional programming languages, so that **AND** is processed before **OR**.

![boolean expressions](https://res.cloudinary.com/cloudinary-training/image/upload/v1589229786/book/conditional-boolean-ops.png)

## Built in values: Image

Cloudinary provides built in values based on image properties that can be tested for using comparison operators.

![built in values based on asset properties](https://res.cloudinary.com/cloudinary-training/image/upload/v1589230126/book/conditional-builtin-image.png)

## Build in values: Video

Cloudinary provides built in values base on video properties that can be be tested for using comparison operators.

## User Defined Variables

In addition to the built in properties that are available based on asset, specifics you can define your own variables as described in the **Variables** modules.  User Defined variables can be used for testing in logical expressions or overlaying.   

If you want to use a built in variables in a text overlay, you need to assign it to a user defined variable first.  For example in the following code, we're assigning the `public_id` to a user defined variable `$img`. 

```javascript
 variables: [
  ['$img', 'current:public_id'],
]
```

Remember when creating user defined variable that they cannot contain underscore `_`.

