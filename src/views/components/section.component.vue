<template>
  <div
    v-if="!content.external"
    :id="content.name.replaceAll(' ', '')"
    :class="{ 'grainy-gradient-bg-light': content.light, 'grainy-gradient-bg-dark': !content.light, 'no-fill': content.nofill }"
    :style="content.color ? `background: linear-gradient(-200deg, ${content.color}CC, ${content.color}BF), url(images/noise.png)` : ''"
    class="section flex w-screen justify-center items-center flex-col p-0 pb-0 pt-0 m-0 lg:p-16 min-h-full lg:h-full relative"
  >
    <MeshGradient v-if="content.gradient" v-bind="content.gradient" />
    <component v-if="content.custom" :is="content.custom.component" v-bind="content.custom.props" />
    <div
      v-else
      :class="content.ltr ? 'lg:flex-row' : 'lg:flex-row-reverse'"
      class="pt-20 pb-16 flex items-center justify-center gap-8 md:gap-16 flex-col w-full"
    >
      <img v-if="content.hero && breakpoints.lg" :src="content.hero" class="hero-img z-0 w-full md:w-1/2" rel="preload" />
      <div
        class="w-full text flex flex-col max-w-xs sm:max-w-xl gap-y-8 lg:max-w-4xl xl:max-w-6xl lg:w-1/2 xl:gap-y-12"
        :class="{ 'items-center': content.centered }"
      >
        <h1
          :class="{ 'text-white': !content.light, 'text-center': content.centered }"
          class="title' z-10 text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-opacity-90"
        >
          {{ content.title }}
        </h1>
        <img v-if="content.hero && !breakpoints.lg" :src="content.hero" class="hero-img z-0 w-full lg:w-1/2" rel="preload" />
        <h3
          :class="{ 'text-white': !content.light, 'text-center': content.centered }"
          class="z-10 text-xl sm:text-2xl xl:text-3xl max-w-3xl font-thin text-opacity-90"
          v-html="content.subtitle"
        />
        <div class="cta flex flex-row gap-4 items-center justify-start">
          <CTAComponent v-bind="cta" :light="content.light" v-for="(cta, i) in content.cta" :key="i" @pressed="goTo(cta.to)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CTAComponent from "./cta.component.vue";
import MeshGradient from "./meshgradient.component.vue";

export default {
  name: "sectionComponent",
  components: {
    CTAComponent,
    MeshGradient,
  },
  props: {
    content: Object,
  },
  data() {
    return {
      inFrame: false,
      mounted: false,
      breakpoints: {},
    };
  },
  methods: {
    computeButtonStyle(button) {
      return {
        color: this.content.light ? (button.filled ? "white" : "black") : button.filled ? "black" : "white",
        backgroundColor: button.filled ? (this.content.light ? "black" : "white") : "transparent",
        border: button.filled ? "none" : `2px solid ${this.content.light ? "black" : "white"}`,
      };
    },
    scrollHandler() {
      if (this.mounted) {
        let el = this.$el;
        if (el.querySelector) {
          let heroImg = el.querySelector(".hero-img");
          let bb = el.getBoundingClientRect();
          let visPercY = (bb.top + bb.height) / bb.height;
          this.inFrame = visPercY >= 0.5 && visPercY <= 1.5;
          if (heroImg) {
            heroImg.style.transform = `rotateZ(${-(1.0 - visPercY) * 10}deg)`;
            if (this.breakpoints.lg) {
              heroImg.style.marginBottom = `${(1.0 - visPercY) * 500}px`;
            }
          }
        }
      }
    },
    scrollIdleHandler() {
      this.scrollHandler();
      if (this.inFrame && location.hash != "#" + this.content.name && !this.$utils.scrollHandler.scrollingFlag) {
        let hash = this.content.name.replace(" ", "");
        history.replaceState({}, null, "#" + hash);
      }
    },
    resizeHandler() {
      Object.assign(this.breakpoints, this.$utils.resizeHandler.breakpoints);
    },
    async goTo(link) {
      if (link.includes("https://") || link[0] === ".") {
        this.openInNewTab(link)
      } else if (link.includes("#")) {
        this.$utils.scrollHandler.scrollToAnchor(link.replace("#", ""));
      } else if (link[0] === "/") {
        this.$route.matched[0].meta.lastHash = this.content.name;
        this.$utils.scrollHandler.scrollToAnchor(this.content.name, false, "end");
        this.$utils.scrollHandler.pushScrollIdleHandler(() => {
          this.$router.push(link);
          this.$utils.scrollHandler.destroyNamespaceHandlers("pageTransition");
        }, "pageTransition");
      } else {
        throw new Error(`Unsupported link type. Expecting: [#link, /link, https://link], got ${link}`);
      }
    },
    //Somehow window.open would close specific newly opened tabs (cached/service worker related ?)
    //Spawn-clicking a new <a/> tag seems to prevent problems for these specific edge cases.
    //TODO: see if window.open can be implemented correctly 
    openInNewTab(href) {
      Object.assign(document.createElement("a"), {
        target: "_blank",
        rel: "noopener noreferrer",
        href: href,
      }).click();
    },
    init() {
      this.$utils.scrollHandler.pushScrollHandler(this.scrollHandler.bind(this), "section" + this.content.name);
      this.$utils.scrollHandler.pushScrollIdleHandler(this.scrollIdleHandler.bind(this), "section" + this.content.name);
      this.$utils.resizeHandler.pushResizeHandler(this.resizeHandler.bind(this), "section" + this.content.name);
      this.$nextTick(() => {
        this.mounted = true;
        this.scrollHandler();
        this.resizeHandler();
      });
    },
    deinit() {
      this.$utils.scrollHandler.destroyNamespaceHandlers("section" + this.content.name);
      this.$utils.resizeHandler.destroyNamespaceHandlers("section" + this.content.name);
    },
  },
  deactivated() {
    this.deinit();
  },
  activated() {
    this.init();
  },
  unmounted() {
    this.deinit();
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
h1 {
  opacity: 0;
  animation: text ease-in-out 0.5s forwards;
  animation-delay: 0.25s;
}
h3 {
  opacity: 0;
  animation: text ease-in-out 0.5s forwards;
  animation-delay: 0.5s;
}
.cta {
  opacity: 0;
  animation: text ease-in-out 0.5s forwards;
  animation-delay: 0.75s;
}
@keyframes hero-img {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes text {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.no-fill {
  height: auto !important;
  min-height: unset !important;
}
.grainy-gradient-bg-dark {
  background: linear-gradient(-200deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.75)), url(@/assets/noise.png);
  background-color: black;
}
.grainy-gradient-bg-light {
  background: linear-gradient(-200deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.75)), url(@/assets/noise.png);
  background-color: white;
}
.section {
  overflow: hidden;
}
</style>
