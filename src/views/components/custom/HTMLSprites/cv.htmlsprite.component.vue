<template>
  <div class="LabelHTMLSprite flex items-center justify-center">
    <Transition name="fade">
      <div class="flex flex-row gap-2" v-if="displayed">
        <a
          download
          href="/files/resume.pdf" 
          style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5)"
          class="pointer-events-auto bg-white text-xs text-black font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-90 transition-all rounded-full p-2 opacity-70"
        >
          <eva-icon name="download-outline" fill="black" height="16"/>hire me
        </a>
      </div>
    </Transition>
  </div>
</template>

<script>
import * as THREE from "three";
import HTMLSpriteMixin from "@/mixins/HTMLSprite.mixin.js";

export default {
  name: "CVHTMLSprite",
  mixins: [HTMLSpriteMixin],
  data() {
    return {
      position: new THREE.Vector3(0.5, 0, 0.91),
      rotation: new THREE.Vector3(0, 0, Math.PI),
      scale: 1 / 1500,
      displayed: false,
    };
  },
};
</script>

<style scoped>
.LabelHTMLSprite {
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
