<template>
  <div class="gradient-wrapper">
    <div class="gradient-overlay" v-if="fadeOut"/>
    <div class="gradients" :style="'transform:' + (reverse ? 'scale(1.5,-1.5)':'scale(1.5)')">
      <div
        class="infobar-bg-gradient"
        :style="{ backgroundColor: meshGradient[0] }"
        style="border-radius: 50%; position: absolute; width: 50%; height: 100%; top: -20%"
      />
      <div
        class="infobar-bg-gradient"
        :style="{ backgroundColor: meshGradient[1] }"
        style="border-radius: 50%; position: absolute; width: 70%; height: 100%; left: 40%; top: -30%"
      />
      <div
        class="infobar-bg-gradient"
        :style="{ backgroundColor: meshGradient[2] }"
        style="border-radius: 50%; position: absolute; width: 75%; height: 100%; top: 50%"
      />
      <div
        class="infobar-bg-gradient"
        :style="{ backgroundColor: meshGradient[3] }"
        style="border-radius: 50%; position: absolute; width: 70%; height: 100%; left: 30%; top: 60%"
      />
    </div>
  </div>
</template>

<script>
const GRADIENT_PRESETS = {
  ORANGERED: ["#9c6035", "#9c5235", "#9c3535", "#9c3535"],
  PURPLEPINK: ["#9C359A", "#5A359C", "#85359c", "#85359c"],
  REDPINK: ["#9c3535", "#9c356a", "#a8235b", "#9c356a"],
  GREENBLUE: ["#359c62", "#359c9c", "#199d7e", "#2c989d"],
  BLUEPURPLE: ["#47359c", "#354a9c", "#3d359c", "#35589c"],
  DISCRETEPURPLE: ["#9C359A25", "#5A359C22", "#85359c21", "#85359c05"],
  DISCRETEPURPLE2: ["#85359c15", "#85359c08","#9C359A00", "#5A359C32"],
  DISCRETEPURPLE3: ["#85359c08", "#85359c15","#9C359A00", "#5A359C00"],
};

export default {
  name: "MeshGradientComponent",
  props: {
    preset: String,
    custom: Array,
    reverse: {
      type: Boolean,
      default: false
    },
    fadeOut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      meshGradient: this.getPresetFromString(this.preset) || this.custom || GRADIENT_PRESETS.ORANGERED,
    };
  },
  methods: {
    getPresetFromString(preset) {
      return GRADIENT_PRESETS[preset];
    },
  },
};
</script>

<style scoped>
.gradient-overlay {
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-image: linear-gradient(rgba(30, 30, 30, 0) 60%, #131314A1 100%);
}
.gradient-wrapper {
  width: 100%;
  height: 100%;
}
.gradients {
  position: absolute;
  filter: blur(4rem);
  width: 100%;
  height: 100%;
  /* transform: scale(2); */
}
</style>
