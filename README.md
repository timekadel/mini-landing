# What is MiniLanding ?

MiniLanding is a minimalistic vue.js/tailwind.css based static landing page generator. Its no-code approach allows for quick and simple landing page generation.

## Installation

Browse to the path of your choice and run the following command from a terminal:

```
$ git clone https://github.com/timekadel/mini-landing.git
```

Get to the project's root.
```
$ cd mini-landing
```

Install package dependencies.
```
$ npm install
```

## Start Environment locally

Serve your MiniLanding instance on a local server.
```
$ npm run serve
```

MiniLanding will start a server at http://localhost:4515. Simply browse to the following URL using your favorite browser.

## Build For Production

Build your static landing page from source.

```
$ npm run build
```

Built files will be located over the local `./dist` folder located at project root.

## Configuration

MiniLanding websites are exclusively configured through simple object definitions. No HTML|JS|CSS Needed. MiniLanding is thought to be a Quick and Easy way to generate minimalistic static landing pages.

In order to customize your landing page, simply edit the configuration file available under `mini-landing/src/minilanding.js` as follows:.

```js
export default {
  //Website title
  title: "Landing Page Title",
  //Whether the title should be displayed on the toolbar or not
  hideTitle: true,
  //Website logo
  //images should be put under the project's "public" folder
  logo: "path/to/landing_page_logo.svg",
  //Website sections definition
  sections: [{
    //Section Name
      name: "Section Name",
      //Whether the section should be available on the toolbar
      toolbar: true, 
       //Whether light appearance should be applied to section
      light: false,
       //Hero placement (left or right)
      ltr: false,
       //Optional background color override
      color: "#8a2be2"
      //Section Title
      title: "Section Title",
      //Section Subtitle
      subtitle: "Section Subtitle",
      //Path to section hero image 
      //images should be put under the project's "public" folder
      hero: "/path/to/hero_image.svg",
      //Calls to action
      cta: [{
          //CTA button title
          title: "learn more",
          //CTA button filling style
          filled: false,
          //CTA button link 
          //Internally link sections using #+SectionName
          //Provite external links through urls
          to: "#SectionName"
        }
      ],
      //Optional toolbar reference icon
      //Please see https://akveo.github.io/eva-icons/
      icon: "arrow-circle-right",
      //If provided, Section will not be generated.
      //A redirection to the provided external url will be dne instead
      external: false
    },
  ],
  //Website footer definition
  footer: {
    //Footer logo
    //images should be put under the project's "public" folder
    logo: "/path/to/website_logo.svg",
    //Footer Name
    name: "MiniLanding",
    //Whether light appearance should be applied to footer
    light: false,
    //Footer slogan
    slogan: "My Cool App Slogan.",
    //Footer copyright
    copyright: "2022 - Timé Kadel",
    //Footer interactive sections
    sections: [{
        //Section Name
        name: "About",
        //Section items definition
        items: [{
            name: "Contact Me",
            to: "mailto:contact@myemail.com"
          },
          {
            name: "Repository",
            to: "https://github.com/timekadel/minilanding"
          }
        ]
      },
    ],
    //Footer social links
    social: {
      //github link
      github: "https://github.com/me/mycoolapp",
      //linkedin link
      linkedin: "https://linkedin.com/me",
    }
  },
}
```
