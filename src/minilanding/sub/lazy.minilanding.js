export default {
  logo: "/images/lazy_logo_light.png",
  title: "Lazy.js - Yet another Node.js API framework.",
  hideTitle: true,
  sections: [

    {
      name: "ORM",
      toolbar: true,
      light: false,
      ltr: false,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: false
      },
      icon: "book-outline",
      title: "Simple Object Relational Mapping.",
      subtitle: "<b>SQL queries</b> can be <b>time consuming</b>. Lazy's <b>ORM</b> allows for quick and easy complex SQL <b>table setup</b> and data <b>manipulation</b>. Table schemas are described using straight-forward synthax through <b>JavaScript objects</b>. Lazy handles <b>table migrations</b> automatically.",
      hero: "/images/db.svg",
      cta: [{
          title: "next feature",
          filled: false,
          to: "#API"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/lazy"
        }
      ]
    },
    {
      name: "API",
      toolbar: true,
      light: false,
      ltr: true,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: true,
        fadeOut: false
      },
      icon: "book-open-outline",
      title: "Integrated REST API Controllers.",
      subtitle: "Setting up <b>API</b> routes and controllers is a <b>fastidious</b> process. Lazy comes built-in with object-defined API <b>routes controllers</b>. It handles routing hierarchy and authentication through highly configurable <b>middleware functions</b>.",
      hero: "/images/api.svg",
      cta: [{
          title: "next feature",
          filled: false,
          to: "#Test"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/lazy"
        }
      ]
    },
    {
      name: "Test",
      toolbar: true,
      light: false,
      ltr: false,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: false,
        fadeOut: true
      },
      icon: "checkmark-circle-outline",
      title: "End To End Integration Tests.",
      subtitle: "It is no secret that setting up <b>integration tests</b> is a <b>tedious process</b>. Lazy comes <b>built-in</b> with standard end-to-end <b>API endpoints tests</b> and allows for quick and easy <b>test-cases setup</b> for each individual <b>endpoint methods</b>.",
      hero: "/images/lazy_server_logo.svg",
      cta: [{
          title: "Back To Top",
          filled: false,
          to: "#ORM"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/lazy"
        }
      ]
    },
    {
      name: "repository",
      icon: "github",
      toolbar: true,
      external: "https://github.com/timekadel/lazy"
    }
  ],
  footer: {
    logo: "/images/lazy_logo_light.png",
    name: "Lazy.js",
    slogan: "Yet another Node.js API framework.",
    copyright: "2022 Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Repository",
            to: "https://github.com/timekadel/lazy"
          },
          {
            name: "Get in touch",
            to: "mailto:time.kadel@gmail.com"
          }
        ]
      },
      {
        name: "Credits",
        items: [{
            name: "Eva Icons",
            to: "https://akveo.github.io/eva-icons/#/"
          },
          {
            name: "Craftwork",
            to: "https://craftwork.design"
          },
          {
            name: "Vecteezy",
            to: "https://vecteezy.com"
          }
        ]
      }
    ],
    social: {
      github: "https://github.com/timekadel/lazy"
    }
  }
}