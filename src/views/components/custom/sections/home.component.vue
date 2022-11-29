<template>
  <div class="absolute flex-1 w-screen h-full flex">
    <IntroHTMLSprite />
    <AgeHTMLSprite />
    <FireworksHTMLSprite />
    <CVHTMLSprite />
    <Transition name="fade">
      <div
        ref="loader"
        style="z-index: 10000"
        v-if="loading.state"
        class="bg-black fixed top-0 bottom-0 md:p-16 h-full w-full z-100 flex flex-col gap-y-8 xl:gap-y-12 justify-center items-center"
      >
        <img class="loader_logo" src="/images/tk.svg" width="150" />
        <h3 class="text-white mt-8 z-10 text-xl xl:text-3xl max-w-xl font-light text-opacity-90 opacity-100 uppercase">
          {{ loading.message }}... {{ loading.value }}%
        </h3>
      </div>
    </Transition>
    <div class="visualizer" :class="{ loading: loading.state }">
      <canvas class="visualizer" id="visualizer" ref="visualizer" />
    </div>
    <Transition name="button">
      <div
        v-if="!loading.state && state === 0"
        style="margin-left: 50%; transform: translate(-50%, 0%)"
        class="flex absolute gap-2 flex-col bottom-4 opacity-60 items-center justify-center"
      >
        <div class="pt-2 pb-2 pl-1 pr-1 rounded-full bg-black flex flex-col items-center justify-center shadow-lg">
          <eva-icon id="scrollArrowTop" name="arrow-ios-upward-outline" fill="white" />
          <eva-icon id="scrollArrowDown" name="arrow-ios-downward-outline" fill="white" />
        </div>
        <h3 class="text-white text-md uppercase font-bold">scroll</h3>
      </div>
    </Transition>
    <Transition name="button">
      <div
        v-if="!loading.state && state === 1"
        style="margin-left: 50%; transform: translate(-50%, 0%)"
        class="flex absolute gap-2 flex-col bottom-4 opacity-60 items-center justify-center"
      >
        <div class="pt-2 pb-2 pl-1 pr-1 w-10 rounded-full bg-black flex flex-col items-center justify-center shadow-lg">
          <eva-icon name="eye-outline" fill="white" />
        </div>
        <h3 class="text-white text-md uppercase font-bold">look around</h3>
      </div>
    </Transition>
    <Transition name="button">
      <div
        v-if="!loading.state && state === 2"
        style="margin-left: 50%; transform: translate(-50%, 0%)"
        class="flex absolute gap-4 bottom-4 items-center justify-center"
      >
        <div class="flex flex-col gap-2 items-center justify-center opacity-60 hover:opacity-90 cursor-pointer">
          <div @click="dollyPrev" class="pt-2 pb-2 pl-1 pr-1 w-10 rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
            <eva-icon name="corner-up-left-outline" fill="black" />
          </div>
          <h3 class="text-white text-md uppercase font-bold">back</h3>
        </div>
        <div class="flex flex-col gap-2 items-center justify-center opacity-60">
          <div class="pt-2 pb-2 pl-1 pr-1 w-10 rounded-full bg-black flex flex-col items-center justify-center shadow-lg">
            <eva-icon name="eye-outline" fill="white" />
          </div>
          <h3 class="text-white text-md uppercase font-bold">&nbsp;</h3>
        </div>
        <div v-if="dollyNextEnabled" class="flex flex-col gap-2 items-center justify-center opacity-60 hover:opacity-90 cursor-pointer">
          <div @click="dollyNext" class="pt-2 pb-2 pl-1 pr-1 w-10 rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
            <eva-icon name="corner-up-right-outline" fill="black" />
          </div>
          <h3 class="text-white text-md uppercase font-bold">next</h3>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import Visualizer from "@/plugins/visualizer/visualizer.js";
import IntroHTMLSprite from "../HTMLSprites/intro.htmlsprite.component.vue";
import AgeHTMLSprite from "../HTMLSprites/age.htmlsprite.component.vue";
import FireworksHTMLSprite from "../HTMLSprites/fireworks.htmlsprite.component.vue";
import CVHTMLSprite from "../HTMLSprites/cv.htmlsprite.component.vue";
import DollyInstance from "@/plugins/visualizer/dolly.js";
import EventBus from "@/plugins/eventbus.js";
import VUE3DRenderer from "@/plugins/visualizer/vue3d_renderer.js";
import Fireworks from "@/plugins/visualizer/fireworks.js";
import Terminal from  "@/plugins/visualizer/terminal.canvas.js"

const ANIMATION_STATES = {
  OVERVIEW: 0,
  TARGET: 1,
  ABOUT: 2,
};

export default {
  name: "homeComponent",
  data() {
    return {
      loading: {
        state: true,
        value: Visualizer.loadingValue,
        message: Visualizer.loadingMessage,
      },
      state: ANIMATION_STATES.OVERVIEW,
      dollyNextEnabled: true,
    };
  },
  components: {
    IntroHTMLSprite,
    AgeHTMLSprite,
    FireworksHTMLSprite,
    CVHTMLSprite,
  },
  methods: {
    dollyPrev() {
      this.dollyNextEnabled = DollyInstance.travelToPreviousStop();
    },
    dollyNext() {
      if (this.dollyNextEnabled) {
        this.dollyNextEnabled = DollyInstance.travelToNextStop();
      }
    },
    async initVisualizer() {
      Visualizer.on("loading", () => {
        this.loading.value = Visualizer.loadingValue;
        this.loading.message = Visualizer.loadingMessage;
      });
      await Visualizer.init(this.$refs.visualizer);
      window.addEventListener("resize", () => {
        Visualizer.resize();
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          Visualizer.resize();
          resolve();
        }, 500);
      });
    },
    setupDollyStopsCallbacks() {
      DollyInstance.getStop("overview").onEnd = () => {
        DollyInstance.travelToStop("introduction", 1);
        this.$utils.scrollHandler.disableScroll(true);
      };
      DollyInstance.getStop("introduction").onStart = () => {
        if (this.state !== ANIMATION_STATES.OVERVIEW) {
          this.state = ANIMATION_STATES.TARGET;
        }
      };
      DollyInstance.getStop("introduction").onEnd = () => {
        this.state = ANIMATION_STATES.TARGET;
        VUE3DRenderer.getHTMLSpriteHandle("IntroHTMLSprite").vInstanceHandle.displayed = true;
        EventBus.$emit("toolbar_display-state", true);
      };
      DollyInstance.getStop("introduction").onExit = () => {
        this.state = ANIMATION_STATES.ABOUT;
        VUE3DRenderer.getHTMLSpriteHandle("IntroHTMLSprite").vInstanceHandle.displayed = false;
      };
      DollyInstance.getStop("fireworks").onStart = () => {
        Fireworks.start();
      };
      DollyInstance.getStop("fireworks").onEnd = () => {
        VUE3DRenderer.getHTMLSpriteHandle("FireworksHTMLSprite").vInstanceHandle.displayed = true;
      };
      DollyInstance.getStop("fireworks").onExit = () => {
        VUE3DRenderer.getHTMLSpriteHandle("FireworksHTMLSprite").vInstanceHandle.displayed = false;
        Fireworks.stop();
      };
      DollyInstance.getStop("laptop").onStart = () => {
        Terminal.restart();
      };
      DollyInstance.getStop("curriculum").onEnd = () => {
        VUE3DRenderer.getHTMLSpriteHandle("CVHTMLSprite").vInstanceHandle.displayed = true;
      };
      DollyInstance.getStop("curriculum").onExit = () => {
        VUE3DRenderer.getHTMLSpriteHandle("CVHTMLSprite").vInstanceHandle.displayed = false;
      };
      DollyInstance.getStop("age").onEnd = () => {
        VUE3DRenderer.getHTMLSpriteHandle("AgeHTMLSprite").vInstanceHandle.displayed = true;
      };
      DollyInstance.getStop("age").onExit = () => {
        VUE3DRenderer.getHTMLSpriteHandle("AgeHTMLSprite").vInstanceHandle.displayed = false;
      };
    },
    handleRenderingState() {
      let el = this.$el;
      if (el) {
        let bb = el.getBoundingClientRect();
        if (bb.x + bb.width < 0 || bb.y + bb.height < 0 || bb.x > window.innerWidth || bb.y > window.innerHeight) {
          Visualizer.stopRender();
        } else {
          Visualizer.startRender();
        }
      }
    },
  },
  deactivated() {
    this.$utils.scrollHandler.destroyNamespaceHandlers("home");
  },
  activated() {
    this.$utils.scrollHandler.pushScrollHandler(this.handleRenderingState, "home");
  },
  async mounted() {
    try {
      EventBus.$emit("toolbar_display-state", false);
      document.body.appendChild(this.$refs.loader);
      await this.initVisualizer();
      this.$utils.scrollHandler.scrollToAnchor("AboutMe", true);
      this.setupDollyStopsCallbacks();
      DollyInstance.travelToStop("overview");
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100% - 64px);
  padding: 0;
}
.visualizer {
  padding: 0;
  top: 0px;
  left: 0px;
  height: 100% !important;
  width: 100% !important;
  transition: opacity 0.5s;
  opacity: 1;
  transition-delay: 0.5s;
}
.visualizer.loading {
  opacity: 0;
}
.scene {
  perspective: 600px;
}
.loader {
  background-position: 14px 0, 0 0;
  background-size: 14px;
  background-image: linear-gradient(90deg, white 0, white 12px, transparent 12px, transparent 14px);
}
.text-enter-active,
.text-leave-active {
  transition: all 0.2s linear;
}

.text-enter-from {
  position: absolute;
  transform: translateY(-100%);
  opacity: 0;
}
.text-leave-to {
  position: absolute;
  transform: translateY(120%);
  opacity: 0;
}

.button-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.5s;
}

.button-leave-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0s !important;
}

.button-enter-from {
  position: absolute;
  margin-bottom: -50px;
  opacity: 0;
}
.button-leave-to {
  position: absolute;
  margin-bottom: -50px;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader_logo {
  animation: loading 2.5s ease-in-out infinite;
}

#scrollArrowTop {
  animation: scrollPulseTop 1s alternate-reverse infinite;
}

#scrollArrowDown {
  animation: scrollPulseDown 1s alternate-reverse infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes scrollPulseTop {
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes scrollPulseDown {
  from {
    transform: translateY(5px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
