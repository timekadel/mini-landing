export default {
  title: "MiniLanding",
  hideTitle: true,
  logo: "images/minilanding_logo_alt.svg",
  sections: [{
      name: "About",
      toolbar: true,
      fullHeiht: true,
      light: false,
      ltr: false,
      title: "This Is A MiniLanding Section.",
      subtitle: "MiniLanding is a <b>minimalistic</b> vue.js/tailwind.css based static <b>landing page</b> generator. Its <b>no-code</b> approach allows for <b>quick and simple</b> landing page generation.",
      hero: "/images/minilanding_logo_cropped.svg",
      cta: [{
          title: "learn more",
          filled: false,
          to: "#More"
        },
        {
          title: "repository",
          filled: true,
          to: "https://github.com/timekadel/minilanding"
        }
      ]
    },
    {
      name: "More",
      toolbar: true,
      light: true,
      ltr: true,
      title: "Yet Another MiniLanding Section.",
      subtitle: "MiniLanding websites are exclusively configured through simple <b>object</b> definitions. <b>No HTML|JS|CSS</b> Needed. MiniLanding is thought to be a <b>Quick</b> and <b>Easy</b> way to generate <b>minimalistic</b> static landing pages.",
      hero: "/images/minilanding_logo_dark.svg",
      cta: [{
          title: "back to top",
          filled: false,
          to: "#About"
        },
        {
          title: "repository",
          filled: true,
          to: "https://github.com/timekadel/minilanding"
        }
      ]
    },
    {
      name: "repository",
      toolbar: true,
      light: false,
      external: "https://github.com/timekadel/minilanding",
      icon: "arrow-circle-right"
    },
  ],
  footer: {
    logo: "/images/minilanding_logo_alt.svg",
    name: "MiniLanding",
    light: false,
    slogan: "No-code quick and simple static landing page generator.",
    copyright: "2022 - Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Contact Me",
            to: "mailto:time.kadel@gmail.com"
          },
          {
            name: "Repository",
            to: "https://github.com/timekadel/minilanding"
          }
        ]
      },
      {
        name: "Credits",
        items: [{
          name: "Eva Icons",
          to: "https://akveo.github.io/eva-icons/#/"
        }]
      },
    ],
    social: {
      github: "https://github.com/timekadel/minilanding",
    }
  },
}