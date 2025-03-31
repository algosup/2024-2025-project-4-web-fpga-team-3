# Naming conventions and best practices

## Table of contents

<details>
<summary>Click to expand</summary>

- [Naming conventions and best practices](#naming-conventions-and-best-practices)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [General rules](#general-rules)
  - [Folder structure](#folder-structure)
  - [File names](#file-names)
  - [Extensions](#extensions)
    - [Difference between .html and .htm](#difference-between-html-and-htm)
  - [HTML](#html)
    - [First page](#first-page)
    - [Declaration](#declaration)
    - [Elements](#elements)
      - [Lowercase](#lowercase)
      - [Closing tags](#closing-tags)
      - [Attributes](#attributes)
      - [Image](#image)
      - [Spacing](#spacing)
    - [lines](#lines)
      - [Blank lines](#blank-lines)
    - [Head section](#head-section)
      - [Title](#title)
      - [Omitting `<html>`, `<body>` and `<head>`](#omitting-html-body-and-head)
      - [Empty elements](#empty-elements)
      - [Meta data](#meta-data)
      - [Viewport](#viewport)
    - [HTML Comments](#html-comments)
      - [Single-line comments](#single-line-comments)
      - [Multi-line comments](#multi-line-comments)
    - [Style sheets](#style-sheets)
    - [Scripts](#scripts)
    - [Files interraction](#files-interraction)
  - [Javascript](#javascript)
    - [Variables](#variables)
    - [Space around operators](#space-around-operators)
    - [Indentation](#indentation)
    - [Statements](#statements)
    - [Objects](#objects)
    - [Readability](#readability)
    - [JS Naming conventions](#js-naming-conventions)
    - [Accessing elements](#accessing-elements)
    - [JS Comments](#js-comments)
  - [CSS](#css)
    - [BEM (Block Element Modifier)](#bem-block-element-modifier)
    - [SMACSS (Scalable and Modular Architecture for CSS)](#smacss-scalable-and-modular-architecture-for-css)
    - [OOCSS (Object Oriented CSS)](#oocss-object-oriented-css)
    - [Atomic CSS](#atomic-css)
    - [Source](#source)

</details>

## Introduction

This document describes the naming conventions used in the codebase, for both documentation and code.

## General rules

- **Use English**: All names should be in English.
- **Use descriptive names**: Names should be descriptive and concise.

## Folder structure

- **PascalCase**: Folder names should be in PascalCase.
  e.g. `MyFolder`
- **No spaces**: Folder names should not contain spaces.
  e.g. `MyFolder` instead of `My Folder`
- **No underscores**: Folder names should not contain underscores.
  e.g. `MyFolder` instead of `My_Folder`
- **No hyphens**: Folder names should not contain hyphens.
  e.g. `MyFolder` instead of `My-Folder`

## File names

- **PascalCase**: File names should be in PascalCase.
  e.g. `MyFile.md`
- **No spaces**: File names should not contain spaces.
  e.g. `MyFile.md` instead of `My File.md`
- **No underscores**: File names should not contain underscores.
  e.g. `MyFile.md` instead of `My_File.md`
- **No hyphens**: File names should not contain hyphens.
  e.g. `MyFile.md` instead of `My-File.md`

## Extensions

HTML files should have a **.html** extension (**.htm** is allowed).

CSS files should have a **.css** extension.

JavaScript files should have a **.js** extension.

### Difference between .html and .htm

There is no difference between the .htm and .html file extensions!

Both will be treated as HTML by any web browser and web server.

> [!NOTE]
> The .htm extension is used by some web servers for files that contain server-side code, and the .html extension is used for files that contain client-side code.

## HTML

### First page

When a URL does not specify a filename at the end (like `https://www.thisamazingwebsite.fr/`), the server just adds a default filename, such as "index.html", "index.htm", "default.html", or "default.htm".

If your server is configured only with "index.html" as the default filename, your file must be named "index.html", and not "default.html".

However, servers can be configured with more than one default filename; usually you can set up as many default filenames as you want.

### Declaration

**Always** declare the document type and character encoding at the beginning of the file.

```html
<!DOCTYPE html>
<html lang="en"></html>
```

> [!TIP]
> As a lot of us are using Visual Studio Code, you can use the `!` snippet to generate the HTML boilerplate.

### Elements

#### Lowercase

HTML allows mixing uppercase and lowercase letters in element names.

However, we recommend using lowercase element names, because:

- Mixing uppercase and lowercase names looks bad
- Developers normally use lowercase names
- Lowercase looks cleaner
- Lowercase is easier to type

```html
<!-- Good -->
<p>This is a paragraph.</p>

<!-- Bad -->
<P>This is a paragraph.</p>
```

#### Closing tags

In HTML, you do not have to close all elements (for example the `<p>` element).

However, we strongly recommend closing all HTML elements, like this:

```html
<!-- Good -->
<section>
  <p>This is a paragraph.</p>
  <p>This is a paragraph.</p>
</section>

<!-- Bad -->
<section>
  <p>This is a paragraph.
  <p>This is a paragraph.
</section>
```

#### Attributes

HTML allows attribute values without quotes.

However, we recommend quoting attribute values, because:

- Developers normally quote attribute values
- Quoted values are easier to read
- You MUST use quotes if the value contains spaces

```html
<!-- Good -->
<table class="striped">

<!-- Bad -->
<table class= striped>

<!-- Very bad -->
<table class=table striped>
```

> [!NOTE]
> The last one will not work, because the value contains spaces:

#### Image

**Always** specify the alt attribute for images. This attribute is important if the image for some reason cannot be displayed.

Also, always define the width and height of images. This reduces flickering, because the browser can reserve space for the image before loading.

```html
<!-- Good -->
<img src="html5.gif" alt="HTML5" style="width:128px;height:128px" />

<!-- Bad -->
<img src="html5.gif" />
```

If you're using css to style the image, you can omit the width and height attributes.

```html
<!-- Good -->
<img src="html5.gif" alt="HTML5" class="html5" />
```

#### Spacing

HTML allows spaces around equal signs. But space-less is easier to read and groups entities better together.

```html
<!-- Good -->
<img src="html5.gif" alt="HTML5" />

<!-- Bad -->
<img src = "html5.gif" alt = "HTML5" />
```

### lines

When using an HTML editor, it is NOT convenient to scroll right and left to read the HTML code.

Try to avoid too long code lines.

> ![Note]
> Even if you can enable word wrap in your editor, it is still better to avoid long lines.

#### Blank lines

Do not add blank lines, spaces, or indentations without a reason.

For readability, add blank lines to separate large or logical code blocks.

For readability, add two spaces of indentation. Do not use the tab key.

```html
<!-- Good -->
<body>
  <h1>Famous Cities</h1>

  <h2>Tokyo</h2>
  <p>
    Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the
    most populous metropolitan area in the world.
  </p>

  <h2>London</h2>
  <p>
    London is the capital city of England. It is the most populous city in the
    United Kingdom.
  </p>

  <h2>Paris</h2>
  <p>
    Paris is the capital of France. The Paris area is one of the largest
    population centers in Europe.
  </p>
</body>

<!-- Bad -->
<body>
<h1>Famous Cities</h1>
<h2>Tokyo</h2><p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the most populous metropolitan area in the world.</p>
<h2>London</h2><p>London is the capital city of England. It is the most populous city in the United Kingdom.</p>
<h2>Paris</h2><p>Paris is the capital of France. The Paris area is one of the largest population centers in Europe.</p>
</body>
```

Here's some real examples:

```html
<!-- Good table example-->
<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>A</td>
    <td>Description of A</td>
  </tr>
  <tr>
    <td>B</td>
    <td>Description of B</td>
  </tr>
</table>

<!-- Good list example-->
<ul>
  <li>London</li>
  <li>Paris</li>
  <li>Tokyo</li>
</ul>
```

### Head section

#### Title

**Never** skip the title element.

The `<title>` element is required in HTML.

The contents of a page title is very important for search engine optimization (SEO)! The page title is used by search engine algorithms to decide the order when listing pages in search results.

The `<title>` element:

- defines a title in the browser toolbar
- provides a title for the page when it is added to favorites
- displays a title for the page in search-engine results

So, try to make the title as accurate and meaningful as possible:

```html
<title>HTML Style Guide and Coding Conventions</title>
```

#### Omitting `<html>`, `<body>` and `<head>`

An HTML page will validate without the `<html>` and `<body>` tags:

```html
<!DOCTYPE html>
<head>
  <title>Page Title</title>
</head>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>
```

However, we strongly recommend to always add the `<html>` and `<body>` tags!

Omitting `<body>` can produce errors in older browsers.

Omitting `<html>` and `<body>` can also crash DOM and XML software.

The HTML `<head>` tag can also be omitted.

Browsers will add all elements before `<body>`, to a default `<head>` element:

```html
<!DOCTYPE html>
<html>
<title>Page Title</title>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

However, we recommend using the `<head>` tag.

#### Empty elements

In HTML, it is optional to close empty elements.

```html
<!-- Allowed -->
<meta charset="utf-8">

<!-- Also allowed -->
<meta charset="utf-8" />
```

If you expect XML/XHTML software to access your page, keep the closing slash (/), because it is required in XML and XHTML.

#### Meta data

To ensure proper interpretation and correct search engine indexing, both the language and the character encoding `<meta charset="charset">` should be defined as early as possible in an HTML document:

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
  </head>
</html>
```

#### Viewport

The viewport is the user's visible area of a web page. It varies with the device - it will be smaller on a mobile phone than on a computer screen.

You should include the following `<meta>` element in all your web pages:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

This gives the browser instructions on how to control the page's dimensions and scaling.

The `width=device-width` part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).

The `initial-scale=1.0` part sets the initial zoom level when the page is first loaded by the browser.

Here is an example of a web page without the viewport meta tag, and the same web page with the viewport meta tag:

![viewport comparison](https://www.paypalobjects.com/btdevdoc/braintree/img/developers/pay-with-paypal/viewport-meta-tag-comparison.png)

### HTML Comments

#### Single-line comments

Use single-line comments to explain code when necessary.

```html
<!-- This is a single-line comment -->
```

#### Multi-line comments

Use multi-line comments to explain code when necessary.

```html
<!--
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
-->
```

Long comments are easier to observe if they are indented with two spaces.

### Style sheets

Use simple syntax for linking to style sheets (the `type` attribute is not necessary):

```html
<link rel="stylesheet" href="styles.css" />
```

### Scripts

Use simple syntax for loading external scripts (the `type` attribute is not necessary):

```html
<script src="index.js">
```

### Files interraction

Some web servers (Apache, Unix) are case sensitive about file names: "london.jpg" cannot be accessed as "London.jpg".

Other web servers (Microsoft, IIS) are not case sensitive: "london.jpg" can be accessed as "London.jpg".

If you use a mix of uppercase and lowercase, you have to be aware of this.

If you move from a case-insensitive to a case-sensitive server, even small errors will break your web!

To avoid these problems, always use lowercase file names for your web files.

## Javascript

### Variables

Variables should be in **camelCase** with all names starting with a lowercase letter.

```javascript
firstName = "John";
lastName = "Doe";

price = 19.9;
tax = 0.2;

fullPrice = price + price * tax;
```

### Space around operators

Always put spaces around operators ( = + - \* / ), and after commas:

```javascript
let x = y + z;
const myArray = ["Volvo", "Saab", "Fiat"];
```

### Indentation

As with HTML, use two spaces of indentation.

```javascript
if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
```

### Statements

General rules for simple statements:

- Always end a simple statement with a semicolon.

  ```javascript
  const cars = ["Volvo", "Saab", "Fiat"];

  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };
  ```

General rules for complex (compound) statements:

- Put the opening bracket at the end of the first line.
- Use one space before the opening bracket.
- Put the closing bracket on a new line, without leading spaces.
- Do not end a complex statement with a semicolon.

  ```javascript
  // Function declaration
  function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
  }

  // Loops
  for (i = 0; i < 5; i++) {
    x += i;
  }

  // Conditional statements
  if (time < 20) {
    greeting = "Good day";
  } else {
    greeting = "Good evening";
  }
  ```

### Objects

General rules for object definitions:

- Place the opening bracket on the same line as the object name.
- Use colon plus one space between each property and its value.
- Use quotes around string values, not around numeric values.
- Do not add a comma after the last property-value pair.
- Place the closing bracket on a new line, without leading spaces.
- Always end an object definition with a semicolon.

  ```javascript
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };
  ```

> [!NOTE]
> Short objects can be written on one line, using spaces only between properties, like this:

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
```

### Readability

For readability, avoid lines longer than 80 characters.

If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.

```javascript
document.getElementById("demo").innerHTML = "Hello Dolly.";
```

### JS Naming conventions

- **Use English**: All names should be in English.
- **Variables and functions**: Should be in **camelCase**.
- **Global variables and constants**: Should be in **UPPERCASE**.

### Accessing elements

When accessing HTML elements, use the `document.getElementById()` method.

```javascript
document.getElementById("demo").innerHTML = "Hello JavaScript";
```

### JS Comments

Use single-line comments to explain code when necessary.

```javascript
// This is a single-line comment
```

Use multi-line comments to explain code when necessary.

```javascript
/*
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
*/
```

## CSS

### BEM (Block Element Modifier)

BEM is a simple naming convention in use for segments of CSS selectors into three; Block, Element and Modifier. A Block entails an individual feature or component, and an Element has to do with the specific features of the Blocks, while Modifiers are concerned with the states of Elements. It is a component-based naming convention that divides CSS classes into three categories: Blocks, Elements, and Modifiers.

- **Block**: A standalone component that is meaningful on its own. (e.g., .header)
- **Element**: A part of a Block that has no standalone meaning and is semantically tied to its Block. (e.g., .header\_\_logo)
- **Modifier**: A flag on a Block or Element that changes its appearance or behavior. (e.g., .header\_\_logo--small)

```css
.header {
  background-color: #333;
  color: white;
  padding: 20px;
}
.header__logo {
  width: 100px;
  height: 50px;
  background-color: white;
}
.header__logo--small {
  width: 50px;
  height: 25px;
}
.header__nav {
  display: flex;
  gap: 10px;
}
.header__nav-item {
  color: white;
  text-decoration: none;
}
.header__nav-item:hover {
  text-decoration: underline;
}
```

### SMACSS (Scalable and Modular Architecture for CSS)

According to SMACSS there are five categories of CSS rules – Base, Layout, Module, State and Theme. This approach, stresses the divide between structure and style, no longer referring to layout as a module but a layout module as suggested by its name.

- **Base**: Those basic styles that are set by the CSS browser default styles to the HTML elements to render HTML so usable. (e. g. , body)
- **Layout**: Options regarding the appearance of the main area or sections of any site. (e. g. , . container)
- **Module**: Application of variability principles through reusable Web site components. (e. g. , . button)
- **State**: Styles that depict the ‘state or condition’ of a particular item. (e. g. , . is-active)
- **Theme**: Impulsive and impromptu. (e. g. , . theme-light)

```css
/* Base */
body {
  font-family: Arial, sans-serif;
}

/* Layout */
.layout-header {
  background-color: #333;
  color: white;
  padding: 20px;
}

/* Module */
.button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.button.is-active {
  background-color: blue;
  color: white;
}

/* State */
.is-active {
  border: 2px solid yellow;
}

/* Theme */
.theme-light {
  background-color: #f0f0f0;
  color: #333;
}
```

### OOCSS (Object Oriented CSS)

OOCSS is concerned with creating portable CSS objects and stops short at the application on other elements. It removes constraints that have the purpose of grouping style concepts with model concepts at a higher level, making them easier, more manageable and more adaptable.

- **Object**: Recurring templates that can be used in other HTML sites or components. (e. g. , . box)
- **Variation**: Amendments made to the fundamental shape. (e. g. , . box--rounded)

```css
.box {
  padding: 20px;
  border: 1px solid #ccc;
}

.box--rounded {
  border-radius: 10px;
}
```

### Atomic CSS

Atomic CSS is a process of sweeping up styles into small and combo, Best for having specific functions of design and layouts. It focuses on the use of the utility-first naming convention and benefits from the ability to impeccably fine-tune all the styling properties.

- **Utility**: Div Classes that contain attributes that apply one single style property. (e. g. , . mt-2 for margin-top: 20px)

```css
.mt-2 {  
margin-top: 20px;
}

.p-3 { 
 padding: 30px;
}

.bg-blue { 
 background-color: blue;
}

.text-white {
  color: white;
}
```

### Source

All the information in this document was taken from the following sources:

- [W3Schools](https://www.w3schools.com/)
- [GeeksforGeeks](https://www.geeksforgeeks.org/)
