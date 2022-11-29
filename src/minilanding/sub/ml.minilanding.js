export default {
  logo: "/images/minilanding_logo.svg",
  title: "Minilanding - Minimalistic landing page generator.",
  hideTitle: true,
  sections: [

    {
      name: "Quick",
      toolbar: true,
      light: false,
      ltr: false,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: true
      },
      icon: "flash-outline",
      title: "Quick Responsive Landing Pages.",
      subtitle: "Build <b>landing pages</b> in a matter of <b>minutes</b> using minilanding's <b>no-code</b> approach. Simply provide <b>description</b> for your content through <b>Javascript Objects</b>, MiniLanding handle's <b>everything else!</b>",
      hero: "/images/ml.png",
      cta: [{
          title: "Next Feature",
          filled: false,
          to: "#Editable"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/mini-landing"
        }
      ]
    },
    {
      name: "Editable",
      toolbar: true,
      light: false,
      ltr: true,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: false,
        fadeOut: true
      },
      icon: "color-palette-outline",
      title: "Editable Built-In Features.",
      subtitle: "<b>Play around</b> with MiniLanding's built-in <b>features</b> to generate truly <b>unique</b> landing pages. Pick your sections <b>colors</b>, fill in your <b>content</b>, import your <b>assets</b> and you're ready to go!",
      hero: "/images/ml_customize_light2.png",
      cta: [{
          title: "Next Feature",
          filled: false,
          to: "#Customizable"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/mini-landing"
        }
      ]
    },
    {
      name: "Customizable",
      toolbar: true,
      light: false,
      ltr: false,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: true,
        fadeOut: true
      },
      icon: "code-outline",
      title: "Customize Sections At Will.",
      subtitle: "Feeling <b>Fancy?</b> MiniLanding is built using <b>Vue.js and TailwindCSS</b>. Create and provide your very own sections through <b>Vue components</b>. Minilanding comes <b>pre-packed</b> with features that will <b>guide you along.</b>",
      hero: "/images/ml_customize_light.png",
      cta: [{
          title: "back to top",
          filled: false,
          to: "#Quick"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://github.com/timekadel/mini-landing"
        }
      ]
    },
    {
      name: "repository",
      icon: "github",
      toolbar: true,
      external: "https://github.com/timekadel/mini-landing"
    }
  ],
  footer: {
    logo: "/images/minilanding_logo.svg",
    name: "MiniLanding",
    slogan: "Minimalistic landing page generator.",
    copyright: "2022 Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Repository",
            to: "https://github.com/timekadel/mini-landing"
          },
          {
            name: "Get in touch",
            to: "mailto:contact@timekadel.com"
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
            name: "Device Frames",
            to: "https://deviceframes.com/"
          }
        ]
      }
    ],
    social: {
      github: "https://github.com/timekadel/mini-landing"
    }
  }
}