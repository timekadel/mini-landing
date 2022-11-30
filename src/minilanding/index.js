export default {
  logo: "/images/minilanding_logo.svg",
  title: "My cool page",
  sections: [{
    name: "Section 1",
    toolbar: true,
    icon: "hash-outline",
    title: "My Cool Section.",
    subtitle: "Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Maecenas aliquam tincidunt dui, <b>sit amet</b> lacinia nisi venenatis at. <b>Nulla facilisi</b>. Sed aliquam magna in laoreet dignissim. ",
    hero: "/images/minilanding_logo.svg",
    cta: [{
        title: "view next",
        filled: false,
        to: "#Section2"
      },
      {
        title: "view subpage",
        filled: true,
        to: "/subpage1"
      },
    ],
    light: false,
    ltr: true,
  }, {
    name: "Section 2",
    toolbar: true,
    icon: "hash-outline",
    title: "Some Other Section.",
    subtitle: "Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Maecenas aliquam tincidunt dui, <b>sit amet</b> lacinia nisi venenatis at. <b>Nulla facilisi</b>. Sed aliquam magna in laoreet dignissim. ",
    hero: "/images/minilanding_logo_dark.svg",
    cta: [{
        title: "contact me",
        filled: false,
        to: "#Contact"
      },
      {
        title: "Open link",
        filled: true,
        to: "https://github.com/timekadel/mini-landing/"
      },
    ],
    light: true,
    ltr: false,
  }, ],
  contact: {
    title: "Get in touch",
    subtitle: "Don't be shy, get in touch with me.",
    icon: "message-circle-outline",
    formSubmitUrl: "",
    toolbar: true,
  },
  footer: {
    logo: "/images/minilanding_logo.svg",
    name: "My Cool Page",
    slogan: "That's a cool landing page for sure !",
    copyright: "2022 John Doe",
    sections: [{
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
    social: {
      github: "https://github.com/github_profile",
      linkedin: "https://fr.linkedin.com/in/linkedin_id",
      facebook: "https://www.facebook.com/profile.id",
      twitter: "https://twitter.com/TwitterId",
    }
  }
}