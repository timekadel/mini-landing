export default {
  logo: "/images/asls.logo.white.png",
  title: "ASLS - Autonomous Stage Lighting Systems",
  hideTitle: true,
  sections: [
    {
      name: "Home",
      ltr: true,
      toolbar: true,
      title: "Autonomous Stage Lighting Systems.",
      subtitle: "<b>Research & Development</b> of innovative and <b>open source</b> solutions for <b>show control</b> and show automation.",
      hero: "/images/chip-cropped.png",
      cta: [
        {
          title: "learn more",
          filled: false,
          to: "#About"
        },
        {
          title: "contribute",
          filled: true,
          to: "https://github.com/ASLS-org"
        }
      ]
    },
    {
      name: "About",
      toolbar: true,
      light: true,
      title: "Looking to improve show control ?",
      subtitle: "<b>ASLS</b> focuses on finding ways to <b>automate</b> and <b>synchronize</b> the many aspects of <b>show control</b> such as lighting, pyrotechnics and media servers.",
      hero: "/images/knob-cropped.png",
      cta: [
        {
          title: "learn more",
          filled: false,
          to: "#Studio"
        },
        {
          title: "contribute",
          filled: true,
          to: "https://github.com/ASLS-org"
        }
      ]
    },
    {
      name: "Studio",
      toolbar: true,
      ltr: true,
      title: "Web Based Lighting Control Sofware.",
      subtitle: "<b>ASLS Studio</b> is a powerful open-source, web-based, DMX lighting control <b>software</b> and <b>visualizer</b>.",
      hero: "/images/studio-cropped.png",
      cta: [
        {
          title: "Try live",
          filled: false,
          to: "https://demo.studio.asls.timekadel.com"
        },
        {
          title: "Install",
          filled: true,
          to: "https://github.com/ASLS-org/studio"
        }
      ]
    },
    {
      name: "Firmware",
      toolbar: true,
      light: true,
      title: "Light Embedded Solutions For Show Control.",
      subtitle: "ASLS' <b>CueOS</b> designed for <b>Arm® Cortex-M4</b> Microcontrollers provides built-in show control features such as multi-protocol <b>Cue triggering</b>, diverse <b>control outputs</b> and show programmation through <b>web interface</b>.",
      hero: "/images/chip-cropped.png",
      cta: [
        {
          title: "browse docs",
          filled: false,
          to: "https://docs.cueos.asls.timekadel.com"
        },
        {
          title: "download",
          filled: true,
          to: "https://github.com/ASLS-org/cueos"
        }
      ]
    },
    {
      name: "contribute",
      icon: "github",
      toolbar: true,
      external: "https://github.com/ASLS-org"
    }
  ],
  footer: {
    logo: "/images/asls.logo.white.only.png",
    name: "ASLS - Autonomous Stage Lighting Systems",
    slogan: "Research & Development of innovative solutions for show control.",
    copyright: "2022 Timé Kadel",
    sections: [
      {
        name: "About",
        items: [
          {
            name: "Repository",
            to: "https://github.com/ASLS-org"
          },
          {
            name: "Special Thanks",
            to: "https://timekadel.com"
          },
          {
            name: "Get in touch",
            to: "mailto:time.kadel@gmail.com"
          }
        ]
      },
      {
        name: "Credits",
        items: [
          {
            name: "Eva Icons",
            to: "https://akveo.github.io/eva-icons/#/"
          },
          {
            name: "Device Frames",
            to: "https://deviceframes.com/"
          },
          {
            name: "Craftwork",
            to: "https://craftwork.design"
          }
        ]
      },
      {
        name: "Policies",
        items: [
          {
            name: "Licensing",
            to: "https://asls.timekadel.com/licensing"
          },
          {
            name: "Code Of Conduct",
            to: "https://asls.timekadel.com/coc"
          }
        ]
      }
    ],
    social:{
      github: "https://github.com/ASLS-org"
    }
  }
}