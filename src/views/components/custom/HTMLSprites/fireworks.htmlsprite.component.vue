<template>
  <div class="HomeHTMLSprite">
    <Transition name="fade">
      <div v-if="displayed">
        <h1 class="text-white opacity-90 z-10 text-6xl sm:text-6xl md:max-w-2xl lg:text-7xl xl:text-8xl font-bold">I Make Fireworks.</h1>
        <br />
        <h3 class="z-10 text-white text-2xl sm:text-2xl xl:text-3xl max-w-xl font-thin opacity-90">
          I'm a <b>professional pyrotechnician</b> firing large <b>pyromusical</b> shows accross <b>France and England</b> since 2012.
        </h3>
        <!-- <div class="flex gap-4 mt-8">
          <div
            @click="fire"
            style="box-shadow: white 0px 0px 0px 2px"
            class="pointer-events-auto pointer text-white font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 w-36 opacity-90"
          >
            fire
          </div>
          <div
            @click="fireMore"
            class="pointer-events-auto border-2 border-transparent bg-white font-medium cursor-pointer uppercase flex items-center justify-center hover:shadow-md hover:opacity-100 transition-all bottom-5 right-5 rounded-full h-12 w-36 opacity-90"
          >
            fire more
          </div>
        </div> -->
      </div>
    </Transition>
  </div>
</template>

<script>
import * as THREE from "three";
import Fireworks from "@/plugins/visualizer/fireworks.js";
import HTMLSpriteMixin from "@/mixins/HTMLSprite.mixin.js";

export default {
  name: "FireworksHTMLSprite",
  mixins: [HTMLSpriteMixin],
  data() {
    return {
      position: new THREE.Vector3(1.5, 5, 5),
      rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
      scale: 1 / 65,
      displayed: false,
    };
  },
  methods: {
    fire() {
      Fireworks.fire();
    },
    fireMore() {
      let rand = Math.floor(Math.random() * 5) + 2;
      for (let i = 0; i < rand; i++) {
        setTimeout(Fireworks.fire, (i * 1000 * rand) / 7);
      }
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
h1,h3{
  /* text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ffffffd3, 0 0 40px #ffffffa3, 0 0 50px #ffffff83, 0 0 60px #ffffff53, 0 0 70px #ffffff23; */
}
</style>
