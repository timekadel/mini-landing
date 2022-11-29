export default {
  logo: "/images/asls-logo.png",
  title: "ASLS - Autonomous Stage Lighting Systems",
  hideTitle: true,
  sections: [
    {
      name: "Software",
      toolbar: true,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: false
      },
      icon: "browser-outline",
      title: "Lighting Management Sofware.",
      subtitle: "<b>ASLS Studio</b> is a powerful open-source, web-based, <b>DMX</b> lighting control <b>software</b> and <b>visualizer</b>. It comes with standard DMX lighting control software </b>features</b> such as <b>Universe</b> patching, <b>Fixture</b> grouping, <b>Scene</b> generation, <b>Effect</b> engines and <b>much more</b>.",
      hero: "/images/studio-cropped.png",
      cta: [{
          title: "Firmware",
          filled: false,
          to: "#Firmware"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://studio.asls.timekadel.com"
        }
      ]
    },
    {
      name: "Firmware",
      toolbar: true,
      ltr: true,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: true,
      },
      icon: "flash-outline",
      title: "Embedded Solutions For Show Control.",
      subtitle: "ASLS' <b>CueOS</b> designed for <b>Arm® Cortex-M4</b> Microcontrollers provides built-in show control features such as multi-protocol <b>Cue triggering</b>, diverse <b>control outputs</b> and show programmation through <b>web interface</b>.",
      hero: "/images/chip-branded.png",
      cta: [{
          title: "Protocol",
          filled: false,
          to: "#Protocol"
        },
        {
          title: "browse docs",
          filled: true,
          to: "https://cueos.asls.timekadel.com"
        }
      ]
    },
    {
      name: "Protocol",
      toolbar: true,
      gradient:{
        preset: "DISCRETEPURPLE2",
        reverse: false,
        fadeOut: true
      },
      icon: "layers-outline",
      title: "\"Q\", Show Control Protocol To Rule Them All.",
      subtitle: "ASLS' <b>Q protocol</b> proposal was designed in order to stop once and for all <b>compatibility issues</b> in show control. <b>MSC</b> inspired, Q's modern approach aims to <b>unify and standardize</b> cue-triggering  approaches in show control.",
      hero: "/images/controls.png",
      cta: [{
          title: "back to top",
          filled: false,
          to: "#Software"
        },
        {
          title: "view proposal",
          filled: true,
          to: "./files/q_proposal.pdf"
        }
      ]
    },
    {
      name: "repositories",
      icon: "github",
      toolbar: true,
      external: "https://github.com/ASLS-org"
    }
  ],
  footer: {
    logo: "/images/asls-logo.png",
    name: "ASLS - Autonomous Stage Lighting Systems",
    slogan: "Research & Development of innovative solutions for show control.",
    copyright: "2022 Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Repository",
            to: "https://github.com/ASLS-org"
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
            name: "Device Frames",
            to: "https://deviceframes.com/"
          },
          {
            name: "Craftwork",
            to: "https://craftwork.design"
          }
        ]
      }
    ],
    social: {
      github: "https://github.com/ASLS-org"
    }
  }
}