<template>
  <div
    :class="{ shown: displayed }"
    class="md:pl-16 md:pr-16 wrapper overflow-hidden z-20 h-14 md:h-16 p-4 toolbar fixed top-0 left-0 right-0 flex flex-col md:flex-row gap-4 md:gap-x-12 md:items-center font-regular bg-opacity-80 transition-all"
  >
    <span class="flex">
      <span class="gap-4 justify-center items-center flex">
        <img v-if="logo" :src="logo" class="rounded cursor-pointer opacity-80 h-8 hover:opacity-100" rel="preload" />
        <h4 v-if="title" class="text-white font-medium text-md">{{ title }}</h4>
      </span>
      <div class="flex-1" />
      <span v-if="!displayed" class="flex md:hidden">
        <span class="flex-1" />
        <eva-icon @click="displayed = true" class="block md:hidden cursor-pointer" name="menu" fill="white"></eva-icon>
      </span>
    </span>
    <div class="flex-1" />
    <div
      v-for="(item, i) in items"
      v-show="item.toolbar"
      @click="goTo(item)"
      :key="i"
      :class="{ shown: displayed, 'border-white': hash === '#' + item.name.replaceAll(' ', '') }"
      :style="{ opacity: hash === '#' + item.name.replaceAll(' ', '') || item.external ? 1 : 0.7 }"
      class="relative border-b-solid border-b-2 underline-offset-8 flex items-center gap-x-2 cursor-pointer font-bold uppercase text-white border-transparent hover:opacity-100 transition-all"
    >
      <p>{{ item.name }}</p>
      <span v-if="item.icon" class="flex">
        <eva-icon :name="item.icon" fill="white"></eva-icon>
      </span>
    </div>
    <span @click="displayed = false" v-if="displayed" class="fixed right-4 top-4 cursor-pointer">
      <eva-icon name="close-outline" fill="white"></eva-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: "toolbarComponent",
  props: {
    /**
     * Toolbar items
     */
    items: Object,
    /**
     * Path to toolbar logo
     */
    logo: String,
    /**
     * App title
     */
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      orderedItems: [],
      displayed: false,
      hash: this.$utils.scrollHandler.hash,
    };
  },
  methods: {
    goTo(item) {
      if (item.external) {
        window.location.href = item.external;
      } else {
        this.$utils.scrollHandler.scrollToAnchor(item.name);
      }
      this.displayed = false;
    },
  },
  mounted() {
    this.$utils.scrollHandler.pushScrollHandler(() => {
      this.hash = this.$utils.scrollHandler.hash;
    });
  },
};
</script>
<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.5) !important;
}
.shown.wrapper {
  height: 282px !important;
}
.shown > a {
  opacity: 0.7 !important;
}
</style>
