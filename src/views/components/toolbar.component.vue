<template>
  <Transition name="scroll-fade">
    <div
      v-if="displayed"
      :class="{ toggledMobile: toggledMobile }"
      class="shadow-md md:pl-16 md:pr-16 wrapper overflow-hidden z-20 p-4 toolbar fixed top-0 left-0 right-0 flex flex-col md:flex-row gap-4 md:gap-x-12 md:items-center font-regular transition-all"
    >
      <span class="flex justify-center items-center">
        <span class="gap-4 justify-center items-center flex">
          <img v-if="logo" :src="logo" class="rounded cursor-pointer opacity-80 h-8 hover:opacity-100" rel="preload" />
          <h4 v-if="title" class="text-white font-medium text-md">{{ title }}</h4>
        </span>
        <div class="flex-1" />
        <span v-if="!toggledMobile" class="flex md:hidden">
          <span class="flex-1" />
          <eva-icon @click="toggledMobile = true" class="block md:hidden cursor-pointer" name="menu" fill="white"></eva-icon>
        </span>
      </span>
      <div :class="{'flex-1': !toggledMobile}"/>
      <div
        v-for="(item, i) in items"
        v-show="item.toolbar"
        @click="goTo(item)"
        :key="i"
        :class="{ toggledMobile: toggledMobile, 'border-white': hash === '#' + item.name.replaceAll(' ', '').match(/([^/]+)/)[0] }"
        :style="{ opacity: hash === '#' + item.name.replaceAll(' ', '') || item.external ? 1 : 0.7 }"
        class="relative border-b-solid border-b-2 underline-offset-8 flex items-center gap-x-2 cursor-pointer font-bold uppercase text-white border-transparent hover:opacity-100 transition-all"
      >
        <p>{{ item.name }}</p>
        <span v-if="item.icon" class="flex">
          <eva-icon :name="item.icon" fill="white"></eva-icon>
        </span>
      </div>
      <span @click="toggledMobile = false" v-if="toggledMobile" class="fixed right-4 top-4 cursor-pointer">
        <eva-icon name="close-outline" fill="white"></eva-icon>
      </span>
    </div>
  </Transition>
</template>

<script>
import EventBus from "@/plugins/eventbus.js";

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
    /**
     * Default toolbar display state
     */
    defaultDisplayState: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      displayed: this.defaultDisplayState,
      toggledMobile: false,
      hash: "#" + this.items[0].name.replaceAll(" ", "").match(/([^/]+)/)[0],
    };
  },
  methods: {
    goTo(item) {
      if (item.external) {
        window.location.href = item.external;
      } else {
        this.$utils.scrollHandler.scrollToAnchor(item.name);
      }
      this.toggledMobile = false;
    },
    setDisplayState(state) {
      this.displayed = state;
    },
  },
  mounted() {
    this.$utils.scrollHandler.pushScrollHandler(() => {
      this.hash = this.$utils.scrollHandler.hash.replaceAll(" ", "").match(/([^/]+)/)[0];
    });
    EventBus.$on("toolbar_display-state", this.setDisplayState);
  },
};
</script>
<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.6) !important;
  max-height: 64px;
  transition: all .5s ease-in-out;
}
.toggledMobile.wrapper {
  max-height: 282px !important;
  height: auto;
}
.toggledMobile > a {
  opacity: 0.7 !important;
}

.scroll-fade-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.5s;
}
.scroll-fade-leave-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0s !important;
}
.scroll-fade-enter-from {
  position: absolute;
  top: -60px;
  opacity: 0;
}
.scroll-fade-leave-to {
  position: absolute;
  top: -60px;
  opacity: 0;
}
</style>
