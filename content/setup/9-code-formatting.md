---
title: "Code Formatting"
metaTitle: "Code Formatting"
metaDescription: "Code Formatting"
---

## Using prettier in VS Code

This repo uses prettier for formatting.  If you're using Visual Studio Code you can add the prettier extension.  You can also rename the `.prettierrc.suggest` to the hidden file `.prettier` to use the rules followed in formatting the code in this repo.
Contents of `.prettier` below


```
{
  "singleQuote": true,
  "tabWidth": 2,
  "semi": false,
  "arrowParens": "avoid",
  "space-before-function-paren": true
}
```