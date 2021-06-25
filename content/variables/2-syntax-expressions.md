---
title: "Syntax and Expressions"
metaTitle: "Syntax and Expressions"
metaDescription: "Syntax and Expressions"
--- 

The table below shows you that you can declare variables with different data types such as number, floating point, and string.  The declaration always starts with `$` followed by an alphanumeric variable name.  The value is assigned by placing an `_` (underscore) after the variable name and then the value.  If the value is a string it is enclosed in `!` (explanation point).

## Variable Syntax
![variable syntax](https://res.cloudinary.com/cloudinary-training/image/upload/v1588703230/book/variable-syntax.png)

You can also create variables based on context (metadata) values.  This is dependent on creating these key:value pairs for your assets.  You can also create lists using the `!` (explanation point) around each value and separating values with and `_` (underscore).

## Operator Syntax

The set of operators that you can use to create expressions using arithmetic and list searching is shown in the table as it would appear in a URL and in code.  The math operators are standard math operators that you would see in any programming language.  There is an additional pair of list operators that allow you to search lists.  

![operator syntax](https://res.cloudinary.com/cloudinary-training/image/upload/v1588709935/book/operator-syntax.png)

Expressions are built in the URL by concatenating variables with operators separated by an `_` underscore.  For example if we declare a variable `x` and set it to 3, and we want to create an expression that multiplies by 3 it will look like this in a url: `$x_3/$x_mul_3`.  The result of this expression is `9`.

Expressions use operator precedence as you would expect in any programming language.  For example, if we create an expression with two variables and use multiplication and addition in the expression, the multiplication will occur first: `$x_3,$y_2/$x_add_$y_mul_2` will evaluate to `7`.  

## Intrinsic Values  

We've seen how to create user defined variables.  There are also variables that are defined by the system.  They usually refer to properties of assets.  Here are a couple of these variables and what they represent. 

- iw - initial width
- ih - initial height
- fc - face count (image only)
- du - duration (video only)
- ar - aspect ratio

Let's calculate the perimeter of an image. What value is produced if initial width is 300 and initial height is 200?  What would the expression for perimeter of the original asset look like?  What is the result? If you calculated `1000`, you're correct.

```bash
iw_mul_2_add_ih_mul_2

```
## Math Quiz

What’s happening here:

```bash
$small_150,$big_2_mul_$small/c_fill,w_$big,h_$small_add_20
```

What is the value of big?  hint: 150 * 2
What will be the calculated width of this asset?  hint: 150 * 2
What will be the calculated height of this asset? hint: 150 + 20


