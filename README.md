# What is MiniLanding ?

MiniLanding is a minimalistic vue.js/tailwind.css based static landing page generator. Its no-code approach allows for quick and simple landing page generation.

# Installation

Browse to the path of your choice and run the following command from a terminal:

```console
$ git clone https://github.com/timekadel/mini-landing.git
```

Get to the project's root.
```console
$ cd mini-landing
```

Install package dependencies.
```console
$ npm install
```

## Start Environment locally

Serve your MiniLanding instance on a local server.
```console
$ npm run serve
```

Simply browse to the served URL using your favorite browser.

## Build For Production

Build your static landing page from source.

```console
$ npm run build
```

Built files will be located over the local `./dist` folder located at project root.

# Configuration

MiniLanding allows for up to 1 level of depth. Sub pages are configured similarily to minilanding's main page and can be referenced as redirecition paths on the main page's sections CTAs.


## Main Page

Minilanding's main page must be configured using provided preset file:
 ```console
 project_root/
├─ src/
│  ├─ minilanding/
│  │  ├─ index.js

 ```

## Sub Pages

In order to create a new subpage, simply create a new `javascript` file within the sub folder: 
```console
project_root/
├─ src/
│  ├─ minilanding/
│  │  ├─ index.js
│  │  ├─ sub/
│  │  │  ├─ sub_page.js
│  │  │  ├─ sub_page_2.js
│  │  │  ├─ index.js
```

For subpages to be referenced in configuration files, you'll need to edit the `index.js` file under the sub folder to provide subpage configuration to MiniLanding's core with a uniquely identifiable name:

```js
import sub_page_one from "./sub_page.js"
import sub_page_two from "./sub_page_2.js"

export default {
  sub_page_one,
  sub_page_two,
}
```

## Assets

Referenced assets should always be provided into the project's static assets folder. In the following example, `logo_name.png` can be refferenced from a configuration file by providing the string path `/path_to_asset/asset.extension`

```
project_root/
├─ public/
│  ├─ path_to_asset/
│  │  ├─ asset.extension

```


## Page Object Configuration

MiniLanding websites are exclusively configured through simple object definitions. No HTML|JS|CSS Needed. MiniLanding is thought to be a Quick and Easy way to generate minimalistic static landing pages.
Pages come with a set of pre-defined feature that allow for quick and easy content generation:

```js
export default {
  logo: "/path_to_asset/logo.svg",
  title: "My cool page",
  sections: SECTIONS_CONFIGURATION,
  footer: FOOTER_CONFIGURATION
}
```

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| title     | String | Page [title](#title)                                    |
| logo      | String | Path to page's [logo](#assets)                          |
| sections  | Array  | An array of  [section configuration objects](#sections) |
| footer    | Object | A [footer configuration object](#footer)                |
| Contact   | Object | A [contact form configuration object](#contact-form)    |


### Title 

The string provided within the title parameter affects the document's title property.

### Sections

Sections are part of MiniLanding's key features. They're used to describe uniquely configurable page sections in a matter of minutes. Sections comes with the following set of configurations:

```js
[
  {
    name: "Section1",
    toolbar: true,
    gradient:GRADIENT_CONFIGURATION,
    icon: "flash-outline",
    title: "My Cool Section",
    subtitle: "Here is a <b>cool</b> section I made <b>myself</b>",
    hero: "/assets/hero_section1.png",
    cta: CTA_CONFIGURATION,
    light: false,
    color: "#0E0E0E"
    ltr: false,
  },
  //Next sections configurations
]

```

| Parameter | Type      | Description                                                                                      |
| --------- | --------- | ------------------------------------------------------------------------------------------------ |
| name      | String    | Section Name used internally for anchoring and referencing. **MUST BE UNIQUE TO PAGE!**          |
| toolbar   | Boolean   | Whether section should appear on toolbar's navigation.                                           |
| gradient  | Object    | A [gradient background definition object](#gradients).                                           |
| icon      | String    | Toolbar icon provided as a string from the [Eva Icons](https://akveo.github.io/eva-icons/#/)     |
| title     | String    | Text displayed as section title.                                                                 |
| subtitle  | String    | Text displayed as section's content to provide further information.                              |
| hero      | String    | [Path to section's hero](#assets) image                                                          |
| cta       | Array     | An array of [Call To Action configuration Object](#cta)                                          |
| light     | Boolean   | Whether light styling should be applied to section                                               |
| color     | HexString | Solid section background image                                                                   |
| ltr       | Boolean   | Whether content should be displayed left to right (hero image first)                             |
| external  | String    | External link to section. Adds a virtual navigation link to toolbar but doesn't generate section |

#### Gradients

You may pick and configure a gradient from the gradient's preset list or generate your very own. The gradient configuration object comes with the following editable parameters:

```js
gradient:{
  preset: "DISCRETEPURPLE2",
  reverse: false,
  fadeOut: false,
  //custom parameter cannot be coupled with preset and vice-versa.
  //custom: ["#85359c08", "#85359c15","#9C359A00", "#5A359C00"],
},
```

| name    | Type    | Description                                                                                                                                                                                          |
| ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| preset  | String  | A preset string from the list: <ul><li>ORANGERED</li><li>PURPLEPINK</li><li>REDPINK</li><li>GREENBLUE</li><li>BLUEPURPLE</li><li>DISCRETEPURPLE</li><li>DISCRETEPURPLE2</li><li>DISCRETEPURPLE3</li> |
| custom  | Array   | A 4 cells array defining each of the gradien't point color in the following order: <ul><li>top-left</li><li>top-right</li><li>bottom-left</li><li>bottom-right</li><ul>                              |
| reverse | Boolean | Whether the mesh should be vertically flipped (usefull for sections symetry)                                                                                                                         |
| fadeOut | Boolean | Whether the gradient should be vertically faded out to black                                                                                                                                         |

#### CTA

Section's call to actions objects can be configured in three unique ways:

* Smoothly scroll to an existing page's section
* Change route to pre-configured subpage/page
* Link to external resources/links

```js
cta: [{
  title: "view next",
  filled: false,
  to: "#Section2"
},
{
  title: "view subpage",
  filled: true,
  to: "/aboutMe"
},
{
  title: "external link",
  filled: false,
  to: "https://domain.com"
}]
```

| name   | Type    | Description                                                                                                                                                    |
| ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title  | String  | String to be displayed on the CTA                                                                                                                              |
| filled | Boolean | Whether filled styling should be applied                                                                                                                       |
| to     | String  | A specially formated link string: <ul><li>Section Anchor: `#section_name`</li><li>Subpage: `/subpage_name`</li><li>external: `https://external_link`</li></ul> |


### Footer

MiniLanding's pages footers contain information relative to the page's content and author and provides useful section-ordered lists of useful links such as credits, Terms of services. A page's footer can be configured as follows:

```js
footer: {
  logo: "/path_to_assets/footer_logo.svg",
  name: "My Cool Page",
  slogan: "That's a cool landing page for sure !",
  copyright: "2022 John Doe",
  sections: SECTIONS_CONFIGURATION,
  social: SOCIAL_CONFIGURATION
}
``` 

| name      | Type    | Description                                                        |
| --------- | ------- | ------------------------------------------------------------------ |
| logo      | String  | [Path to page's footer logo](#assets)                              |
| name      | Boolean | Name to be displayed under the logo                                |
| slogan    | String  | An optional slogan to be displayed under the name                  |
| copyright | String  | An optional copyright                                              |
| Sections  | Array   | An array of configurable lists of [footer links](#footer-sections) |
| social    | Object  | A footer's [social configuration object](#social)                  |

#### Footer Sections

Footer sections are used in order to display a set of links on the page's footer. 


```js
sections: [
  {
    name: "About",
    items: [{
        name: "Repository",
        to: "https://github.com/user/repository"
      },
      {
        name: "Get in touch",
        to: "mailto:contact@domain.com"
      }
    ]
  },
  //Next footer sections
],
``` 

| name      | Type   | Description                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------- |
| name      | String | Name of the link section (about, credits...)                                                      |
| items     | Array  | An array of link items with the following format: <pre lang="json">{name:String,to:String} </pre> |
| slogan    | String | An optional slogan to be displayed under the name                                                 |
| copyright | String | An optional copyright                                                                             |
| Sections  | Array  | An array of configurable lists of [footer links](#footer-sections)                                |

Here is a basic example of footer sections configuration

#### Social

You may opt to display one or many of the following social link on your footer:

* Linkedin
* GitHub
* Facebook
* Twitter

Social links should be configured as follow:

```js
social: {
  github: "https://github.com/github_profile",
  linkedin: "https://fr.linkedin.com/in/linkedin_id"
  facebook: "https://www.facebook.com/profile.id"
  twitter: "https://twitter.com/TwitterId",
}
``` 

### Contact Form

Finally, you may opt to display a contact section over which anyone can send you messages through [FormSubmit](https://formsubmit.co/). 

```js
contact: {
  title: "Get in touch",
  subtitle: "Hello World! Lets get in touch.",
  icon: "message-circle-outline",
  formSubmitUrl: "https://formsubmit.co/ajax/my_formsubmit_id",
  toolbar: true,
},
```

| name          | Type    | Description                                                                                   |
| ------------- | ------- | --------------------------------------------------------------------------------------------- |
| title         | String  | Contact section title                                                                         |
| subtitle      | String  | Contact section subtitle                                                                      |
| icon          | String  | toolbar  icon provided as a string from the [Eva Icons](https://akveo.github.io/eva-icons/#/) |
| formSubmitUrl | String  | [FormSubmit](https://formsubmit.co/) ajax url                                                 |
| toolbar       | Boolean | An array of configurable lists of [footer links](#footer-sections)                            |
| toolbar       | Boolean | Whether section should appear on toolbar's navigation.                                        |