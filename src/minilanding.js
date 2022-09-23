import Home from "@/views/components/home.component.vue"
import { markRaw } from "vue"

export default {
  title: "Timé Kadel's portfolio",
  hideTitle: true,
  logo: "/images/timekadel.svg",
  toolbarDefaultDisplayed: false,
  sections: [
    {
      name: "About Me",
      toolbar: true,
      fullHeiht: true,
      light: false,
      custom: {
        component: markRaw(Home),
        props:{}
      }
    },
    {
      name: "Selected Work",
      ltr: true,
      toolbar: true,
      title: "Autonomous Stage Lighting Systems.",
      subtitle: "<b>ASLS</b> is an <b>organization</b> which specialises in the <b>Research & Development</b> of innovative and <b>open source</b> solutions for <b>show control</b> and show automation.",
      hero: "/images/asls_xs.png",
      cta: [{
          title: "next project",
          filled: false,
          to: "#SelectedWork/Roomz"
        },
        {
          title: "learn more",
          filled: true,
          to: "https://asls.timekadel.com"
        }
      ]
    },
    {
      name: "SelectedWork/Roomz",
      toolbar: false,
      fullHeiht: true,
      light: true,
      color: "white",
      ltr: false,
      title: "Roomz.tk Collaborative Playlists.",
      subtitle: "<b>Roomz.tk</b> takes a modern approach to <b>jukeboxes</b> by enabling its users to <b>queue tracks</b> into uniquely identified <b>virtual online rooms</b>.",
      hero: "/images/roomz_xs.png",
      cta: [{
          title: "next project",
          filled: false,
          to: "#SelectedWork/Lazy"
        },
        {
          title: "learn more",
          filled: true,
          to: "https://roomz.timekadel.com"
        }
      ]
    }, {
      name: "SelectedWork/Lazy",
      toolbar: false,
      fullHeiht: true,
      light: false,
      ltr: true,
      title: "Lazy, Node.JS ORM & API Framework.",
      subtitle: "Yet another <b>Node.js API framework</b>. Easy setup and migration of <b>MySQL</b> table models, intuitive <b>API endpoint</b> generation and automated <b>integration tests</b>.",
      hero: "/images/lazy_server_logo.svg",
      cta: [{
          title: "next project",
          filled: false,
          to: "#SelectedWork/MiniLanding"
        },
        {
          title: "learn more",
          filled: true,
          to: "https://lazy.timekadel.com"
        }
      ]
    }, {
      name: "SelectedWork/MiniLanding",
      toolbar: false,
      fullHeiht: true,
      light: true,
      ltr: false,
      title: "MiniLanding, Landing Page Generator.",
      subtitle: "Minimalistic <b>vue.js/tailwind.css</b> based static <b>landing page</b> generator. Its <b>no-code</b> approach allows for <b>quick and easy</b> landing page generation.",
      hero: "/images/minilanding_logo_dark.svg",
      cta: [{
          title: "back to top",
          filled: false,
          to: "#SelectedWork"
        },
        {
          title: "learn more",
          filled: true,
          to: "https://minilanding.timekadel.com"
        }
      ]
    },
  ],
  contact: {
    title: "Get in touch",
    subtitle: "<b>Feel free</b> to get in touch with me.",
    hero: "/images/minilanding_logo.svg",
    ltr: true,
    toolbar: true,
    type: "contact",
    onSubmit: ()=>{
      
    }
  },
  footer: {
    logo: "/images/timekadel.svg",
    name: "timekadel.com",
    light: false,
    slogan: "Timé Kadel's personal website.",
    copyright: "2022 - Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Contact Me",
            to: "#Contact"
          },
          {
            name: "Repository",
            to: "https://github.com/timekadel"
          }
        ]
      },
      {
        name: "Credits",
        items: [{
          name: "Eva Icons",
          to: "https://akveo.github.io/eva-icons/#/"
        }, {
          name: "deviceframes.com",
          to: "https://deviceframes.com/"
        },{
          name: "craftwork",
          to: "https://craftwork.design/"
        }]
      }
    ],
    social: {
      github: "https://github.com/timekadel",
      linkedin: "https://fr.linkedin.com/in/tim%C3%A9-kadel-56a616129"
    }
  },
}