export default {
  logo: "/images/roomz_favicon.png",
  title: "roomz.tk - Collaborative Playlists.",
  hideTitle: false,
  sections: [{
      name: "Create",
      toolbar: true,
      gradient:{
        preset: "BLUEPURPLE"
      },
      ltr: true,
      title: " Create Your Own Private Room.",
      icon: "plus-square-outline",
      subtitle: "Create and share your <b>private room</b> in order for your <b>friends</b> to join in and <b>add songs</b> to the playlist. <b>No downloads required !</b> Roomz is a <b>progressive web-app</b>.",
      hero: "/images/create-join.png",
      cta: [{
          title: "learn more",
          filled: false,
          to: "#Collaborate"
        },
        {
          title: "Get started!",
          filled: true,
          to: "https://roomz.tk/"
        }
      ]
    },
    {
      name: "Collaborate",
      toolbar: true,
      light: false,
      gradient:{
        preset: "PURPLEPINK"
      },
      title: "Share Your Favourite Tracks! ",
      icon: "share-outline",
      subtitle: "Browse for <b>tracks</b> and queue what you would like to hear <b>played next</b>. Roomz' refined <b>YouTube based</b> music search allows for <b>tracks, artists and albums</b> discovery.",
      hero: "/images/collaborate.png",
      cta: [{
          title: "learn more",
          filled: false,
          to: "#Vote"
        },
        {
          title: "Get started!",
          filled: true,
          to: "https://roomz.tk"
        }
      ]
    },
    {
      name: "Vote",
      ltr: true,
      toolbar: true,
      light: false,
      gradient:{
        preset: "REDPINK"
      },
      title: "Let the community decide! ",
      icon: "inbox-outline",
      subtitle: "Let your <b>guests</b> decide whether they would like to <b>keep</b> a track playing or opt to <b>skip</b> it entirely. <b>majority wins</b>. Skipped tracks will be <b>blacklisted</b> and autoplayed tracks will be regenerated to <b>fit the room's mood!</b>",
      hero: "/images/vote.png",
      cta: [{
          title: "back to top",
          filled: false,
          to: "#Create"
        },
        {
          title: "Get started!",
          filled: true,
          to: "https://roomz.tk"
        }
      ]
    },
    {
      name: "Login / signup",
      toolbar: true,
      light: false,
      external: "https://roomz.tk",
      icon: "arrow-circle-right"
    }
  ],
  footer: {
    logo: "/images/roomz_logo-white.png",
    name: "Roomz.tk",
    light: false,
    slogan: "YouTube based collaborative playlist",
    copyright: "2022 Timé Kadel",
    sections: [{
        name: "About",
        items: [{
            name: "Go to roomz.tk",
            to: "https://roomz.tk"
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
            name: "YouTube Data API V3",
            to: "https://developers.google.com/youtube/v3"
          },
          {
            name: "Eva Icons",
            to: "https://akveo.github.io/eva-icons/#/"
          },
          {
            name: "deviceframes.com",
            to: "https://deviceframes.com/"
          }
        ]
      },
      {
        name: "Policies",
        items: [{
            name: "Roomz Terms Of Service",
            to: "./files/roomz_ToS.html"
          },
          {
            name: "YouTube Terms Of Service",
            to: "https://www.youtube.com/static?template=terms"
          }
        ]
      }
    ],
    social: {
      twitter: "https://github.com/timekadel",
      facebook: "https://fr.linkedin.com/in/tim%C3%A9-kadel-56a616129"
    }
  }
}