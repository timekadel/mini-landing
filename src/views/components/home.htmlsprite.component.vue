<template>
  <div class="HomeHTMLSprite">
    <Transition name="fade">
      <div v-if="displayed">
        <h1 class="text-white opacity-90 z-10 text-6xl sm:text-6xl md:max-w-2xl md:text-7xl xl:text-8xl font-bold">Hi, My Name Is Timé Kadel.</h1>
        <br />
        <h3 class="z-10 text-white text-2xl sm:text-2xl xl:text-3xl max-w-xl font-thin opacity-90">
          I'm an <b>engineer</b> in <b>Electronics</b> and <b>Information Technology</b> who enjoys working on a various range of
          <b>Innovative </b> technologies and <b>projects</b>.
        </h3>
        <div class="flex gap-4 mt-8">
          <div
            @mousedown="displayAboutMe"
            @touchstart="displayAboutMe"
            style="box-shadow: white 0px 0px 0px 2px"
            class="pointer-events-auto pointer text-white font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 w-36 opacity-90"
          >
            about me
          </div>
          <div
            @mousedown="displayWork"
            @touchstart="displayWork"
            class="pointer-events-auto border-2 border-transparent bg-white font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 w-36 opacity-90"
          >
            View My Work
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import * as THREE from "three";

import HTMLSpriteMixin from "@/mixins/HTMLSprite.mixin.js";
import DollyInstance from "@/plugins/visualizer/dolly.js";

export default {
  name: "HomeHTMLSprite",
  mixins: [HTMLSpriteMixin],
  data() {
    return {
      position: new THREE.Vector3(0, -11, 9),
      rotation: new THREE.Vector3(Math.PI / 2, Math.PI, 0),
      scale: 1 / 40,
      displayed: false,
    };
  },
  methods: {
    displayWork() {
      this.$utils.scrollHandler.scrollToAnchor("SelectedWork");
    },
    displayAboutMe() {
      DollyInstance.travelToStop("character");
    },
  },
  mounted() {
    this.$el.style.display = "block";
  },
};
</script>

<style scoped>
.HomeHTMLSprite {
  pointer-events: none !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
