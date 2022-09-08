<template>
  <div
    v-if="!content.external"
    :id="content.name.replaceAll(' ', '')"
    :class="content.light ? 'grainy-gradient-bg-light' : 'grainy-gradient-bg-dark'"
    :style="content.color ? `background: linear-gradient(-200deg, ${content.color}CC, ${content.color}BF), url(images/noise.png)` : ''"
    class="section flex w-screen justify-center items-center flex-col p-0 pt-16 pb-16 md:p-16 min-h-screen md:h-screen"
  >
    <component v-if="content.custom" :is="content.custom" />
    <div v-else :class="content.ltr ? 'md:flex-row' : 'md:flex-row-reverse'" class="flex items-center justify-center gap-8 md:gap-16 flex-col w-full">
      <img v-if="content.hero && $utils.resizeHandler.breakpoint.md" :src="content.hero" class="hero-img z-0 w-full md:w-1/2" rel="preload" />
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
        <img v-if="content.hero && !$utils.resizeHandler.breakpoint.md" :src="content.hero" class="hero-img z-0 w-full md:w-1/2" rel="preload" />
        <h3
          :class="{ 'text-white': !content.light, 'text-center': content.centered }"
          class="z-10 text-xl sm:text-2xl xl:text-3xl max-w-3xl font-thin text-opacity-90"
          v-html="content.subtitle"
        />
        <div>
          <img class="object-scale-down max-h-10 opacity-90" v-if="content.watermark" :src="content.watermark" rel="preload" />
        </div>
        <div class="flex flex-row gap-4 items-center">
          <div
            v-for="(button, i) in content.cta"
            @click="goTo(button.to)"
            :key="i"
            :style="computeButtonStyle(button)"
            class="font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 w-36 opacity-90"
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
          if (heroImg) {
            let bb = el.getBoundingClientRect();
            let visPerc = (bb.top + bb.height) / bb.height;
            this.inFrame = visPerc >= 0.5 && visPerc <= 1.5;
            if (this.inFrame && location.hash != "#" + this.content.name && !this.$utils.scrollHandler.scrollingFlag) {
              history.replaceState({}, null, "#" + this.content.name);
            }
            heroImg.style.transform = `rotateZ(${-(1.0 - visPerc) * 15}deg)`;
          }
        }
      }
    },
    scrollIdleHandler() {
      if ((this.inFrame && location.hash != "#" + this.content.name) || (!this.inFrame && location.hash == "#" + this.content.name)) {
        this.$utils.scrollHandler.scrollToAnchor(this.content.name);
      }
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
    this.$utils.scrollHandler.pushScrollHandler(this.scrollHandler);
    this.$nextTick(() => {
      this.mounted = true;
      this.scrollHandler();
    });
  },
};
</script>

<style scoped>
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
