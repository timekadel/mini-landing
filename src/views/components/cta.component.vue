<template>
  <div
    @click="$emit('pressed')"
    :class="{ light, filled }"
    class="btn font-medium cursor-pointer uppercase flex items-center justify-center bottom-5 right-5 rounded-full h-12 p-4 md:pl-8 md:pr-8 opacity-90"
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    filled: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  name: "CTAComponent",
};
</script>

<style scoped>
.btn {
  border: 2px solid white;
  color: white;
  transition: all ease-in-out .25s;
  border-radius: 50px;
}
.btn.light {
  border-color: black;
  color: black;
}
.btn.light.filled {
  background: black;
  color: white;
}
.btn.filled {
  background: white;
  color: black;
  border-color: transparent;
}
.btn:hover {
  opacity: 1!important;
}
</style>
