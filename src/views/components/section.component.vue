<template>
  <div
    v-if="!content.external"
    :id="content.name.replaceAll(' ', '')"
    :class="{ 'grainy-gradient-bg-light': content.light, 'grainy-gradient-bg-dark': !content.light, 'no-fill': content.nofill }"
    :style="content.color ? `background: linear-gradient(-200deg, ${content.color}CC, ${content.color}BF), url(images/noise.png)` : ''"
    class="section flex w-screen justify-center items-center flex-col p-0 pb-0 pt-0 m-0  md:p-16 min-h-screen md:h-full"
  >
    <component v-if="content.custom" :is="content.custom.component" v-bind="content.custom.props" />
    <div v-else :class="content.ltr ? 'md:flex-row' : 'md:flex-row-reverse'" class="pt-20 pb-16 flex items-center justify-center gap-8 md:gap-16 flex-col w-full">
      <img v-if="content.hero && breakpoints.md" :src="content.hero" class="hero-img z-0 w-full md:w-1/2" rel="preload" />
      <div
        class="w-full text flex flex-col max-w-xs sm:max-w-xl md:max-w-3xl gap-y-8 lg:max-w-4xl xl:max-w-6xl md:w-1/2 xl:gap-y-12"
        :class="{ 'items-center': content.centered }"
      >
        <h1
          :class="{ 'text-white': !content.light, 'text-center': content.centered }"
          class="z-10 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-opacity-90"
        >
          {{ content.title }}
        </h1>
        <img v-if="content.hero && !breakpoints.md" :src="content.hero" class="hero-img z-0 w-full md:w-1/2" rel="preload" />
        <h3
          :class="{ 'text-white': !content.light, 'text-center': content.centered }"
          class="z-10 text-xl sm:text-2xl xl:text-3xl max-w-3xl font-thin text-opacity-90"
          v-html="content.subtitle"
        />
        <div>
          <img class="object-scale-down max-h-10 opacity-90" v-if="content.watermark" :src="content.watermark" rel="preload" />
        </div>
        <div class="flex flex-row gap-4 items-center justify-center md:justify-start">
          <div
            v-for="(button, i) in content.cta"
            @click="goTo(button.to)"
            :key="i"
            :style="computeButtonStyle(button)"
            class="font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 p-4  md:pl-8 md:pr-8 opacity-90"
          >
            {{ button.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sectionComponent",
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
          let visPerc = (bb.top + bb.height) / bb.height;
          this.inFrame = visPerc >= 0.5 && visPerc <= 1.5;
          if (this.inFrame && location.hash != "#" + this.content.name && !this.$utils.scrollHandler.scrollingFlag) {
            let hash = this.content.name.replace(" ", "");
            history.replaceState({}, null, "#" + hash);
          }
          if (heroImg && this.inFrame) {
            heroImg.style.transform = `rotateZ(${-(1.0 - visPerc) * 10}deg)`;
            if (this.breakpoints.lg) {
              heroImg.style.marginBottom = `${(1.0 - visPerc) * 500}px`;
            }
          }
        }
      }
    },
    scrollIdleHandler() {
      if ((this.inFrame && location.hash != "#" + this.content.name) || (!this.inFrame && location.hash == "#" + this.content.name)) {
        this.$utils.scrollHandler.scrollToAnchor(this.content.name);
      }
    },
    resizeHandler(breakpoints) {
      Object.assign(this.breakpoints, breakpoints);
    },
    goTo(anchor) {
      if (anchor.includes("https://")) {
        window.location.href = anchor;
      } else {
        this.$utils.scrollHandler.scrollToAnchor(anchor.replace("#", ""));
      }
    },
  },
  mounted() {
    this.$utils.scrollHandler.pushScrollHandler(this.scrollHandler.bind(this));
    this.$utils.resizeHandler.pushResizeHandler(this.resizeHandler.bind(this));
    this.$nextTick(() => {
      this.mounted = true;
      this.scrollHandler();
    });
  },
};
</script>

<style scoped>
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
.text.shown > h1 {
  opacity: 0.9;
  transition-delay: 0s;
}
.text > * {
  transition-property: opacity;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
}
.text.shown > h3 {
  opacity: 0.9;
  transition-delay: 0.4s;
}
.text.shown > div {
  opacity: 0.9;
  transition-delay: 0.8s;
}
.section {
  overflow: hidden;
}
</style>
