<template>
  <div class="LabelHTMLSprite">
    <Transition name="fade">
      <div v-if="displayed" style="opacity-100">
        <h3 class="z-10 text-white text-2xl sm:text-2xl xl:text-3xl max-w-xl font-thin opacity-90" v-html="birthDate"/>
      </div>
    </Transition>
  </div>
</template>

<script>
import * as THREE from "three";
import HTMLSpriteMixin from "@/mixins/HTMLSprite.mixin.js";

export default {
  name: "LabelHTMLSprite",
  mixins: [HTMLSpriteMixin],
  data() {
    return {
      position: new THREE.Vector3(1.3, 0.3, 1.8),
      rotation: new THREE.Vector3(Math.PI / 2, -0.1, 0),
      scale: 1 / 300,
      displayed: false,
      birthDate: "",
    };
  },
  methods:{
    computeBirthDateSting(){
      const birthdate = new Date(756537900*1000);
      var diff = new Date(new Date(Date.now()).getTime() - birthdate.getTime());
      const y_diff = diff.getUTCFullYear() - 1970;
      const m_diff = diff.getUTCMonth();
      const d_diff = diff.getUTCDate();
      const h_diff = diff.getUTCHours();
      const mn_diff = diff.getUTCMinutes();
      const s_diff = diff.getUTCSeconds();
      return `I am <b>${y_diff}</b> years\n <b>${m_diff}</b> months <b>${d_diff}</b> days <b>${h_diff}</b> hours <b>${mn_diff}</b> minutes and <b>${s_diff}</b> Seconds old.`
    }
  },
  mounted() {
    this.$el.style.display = "block";
    this.computeBirthDateSting();
    setInterval(()=>{
      this.birthDate = this.computeBirthDateSting();
    },1000)
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
