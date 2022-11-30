export default {
  logo: "/images/minilanding_logo.svg",
  title: "My cool page",
  sections: [{
    name: "Section 1",
    toolbar: true,
    icon: "hash-outline",
    title: "My Cool subpage Section.",
    gradient:{
      preset: "BLUEPURPLE"
    },
    subtitle: "Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Maecenas aliquam tincidunt dui, <b>sit amet</b> lacinia nisi venenatis at. <b>Nulla facilisi</b>. Sed aliquam magna in laoreet dignissim. ",
    hero: "/images/minilanding_logo.svg",
    cta: [{
        title: "view next",
        filled: false,
        to: "#Section2"
      },
      {
        title: "Open link",
        filled: true,
        to: "https://github.com/timekadel/mini-landing/"
      },
    ],
    light: false,
    ltr: true,
  }, {
    name: "Section 2",
    toolbar: true,
    icon: "hash-outline",
    title: "some other subpage section.",
    gradient:{
      preset: "PURPLEPINK"
    },
    subtitle: "Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Maecenas aliquam tincidunt dui, <b>sit amet</b> lacinia nisi venenatis at. <b>Nulla facilisi</b>. Sed aliquam magna in laoreet dignissim. ",
    hero: "/images/minilanding_logo_dark.svg",
    cta: [{
        title: "back to top",
        filled: false,
        to: "#Section1"
      },
      {
        title: "Open link",
        filled: true,
        to: "https://github.com/timekadel/mini-landing/"
      },
    ],
    light: false,
    ltr: false,
  }, ],
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