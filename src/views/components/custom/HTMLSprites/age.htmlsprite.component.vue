<template>
  <div class="LabelHTMLSprite">
    <Transition name="fade">
      <div v-if="displayed" style="opacity-100">
        <h1 class="text-white opacity-90 z-10 text-6xl sm:text-6xl md:max-w-2xl lg:text-7xl xl:text-8xl font-bold">I'm {{age.years}} Years,</h1>
        <br />
        <h3 class="z-10 text-white text-2xl sm:text-2xl xl:text-3xl max-w-xl font-thin opacity-90">
          <b>{{age.months}}</b> months <b>{{age.days}}</b> days <b>{{age.hours}}</b> hours <b>{{age.minutes}}</b> minutes and <b>{{age.seconds}}</b> Seconds old.
        </h3>
      </div>
    </Transition>
  </div>
</template>

<script>
import * as THREE from "three";
import HTMLSpriteMixin from "@/mixins/HTMLSprite.mixin.js";

export default {
  name: "AgeHTMLSprite",
  mixins: [HTMLSpriteMixin],
  data() {
    return {
      position: new THREE.Vector3(1.2, 0.3, 2.0),
      rotation: new THREE.Vector3(Math.PI / 2, -0.1, 0),
      scale: 1 / 280,
      displayed: false,
      age:{
        years:0,
        months:0,
        days:0,
        hours:0,
        minutes:0,
        seconds:0
      }
    };
  },
  methods: {
    computeBirthDateSting() {
      const birthdate = new Date(756537900 * 1000);
      var diff = new Date(new Date(Date.now()).getTime() - birthdate.getTime());
      this.age.years = diff.getUTCFullYear() - 1970;
      this.age.months = diff.getUTCMonth();
      this.age.days = diff.getUTCDate();
      this.age.hours = diff.getUTCHours();
      this.age.minutes = diff.getUTCMinutes();
      this.age.seconds = diff.getUTCSeconds();
      // return `I am <b>${y_diff}</b> years\n <b>${m_diff}</b> months <b>${d_diff}</b> days <b>${h_diff}</b> hours <b>${mn_diff}</b> minutes and <b>${s_diff}</b> Seconds old.`;
    },
  },
  mounted() {
    this.$el.style.display = "block";
    this.computeBirthDateSting();
    setInterval(() => {
      // this.birthDate = this.computeBirthDateSting();
      this.computeBirthDateSting();
    }, 1000);
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
