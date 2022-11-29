<template>
  <Transition mode="out-in" name="scroll-fade">
    <div
      v-if="displayed"
      :class="{ toggledMobile: toggledMobile, 'shadow-none': sub }"
      :style="{ background: color + (toggledMobile ? 'E6' : '99') }"
      class="shadow-md md:pl-16 md:pr-16 wrapper overflow-hidden z-20 p-4 toolbar right-0 flex flex-col md:flex-row gap-4 md:gap-x-12 md:items-center font-regular transition-all"
    >
      <span class="flex justify-center items-center">
        <span class="gap-4 justify-center items-center flex cursor-pointer h-8">
          <Transition mode="out-in" name="slide-fade">
            <eva-icon v-if="history" name="arrow-back-outline" fill="white" @click="back" />
            <img v-else-if="logo" :src="logo" class="rounded cursor-pointer opacity-80 h-8 hover:opacity-100" rel="preload" @click="goUp()" />
          </Transition>
          <Transition mode="out-in" name="fade">
            <h4 v-if="title" :class="{ 'text-black': sub }" class="text-white font-medium text-md">{{ title }}</h4>
          </Transition>
        </span>
        <div class="flex-1" />
        <span v-if="!toggledMobile" class="flex md:hidden">
          <span class="flex-1" />
          <eva-icon @click="toggledMobile = true" class="block md:hidden cursor-pointer" name="menu" fill="white"></eva-icon>
        </span>
      </span>
      <div :class="{ 'flex-1': !toggledMobile }"/>
      <Transition mode="out-in" :name="$utils.resizeHandler.breakpoints.lg ? 'slide-fade-reverse' : ''">
        <div :key="$route.name" class="flex flex-col md:flex-row gap-4 md:gap-x-12 md:items-center">
          <div
            v-for="(item, i) in items"
            v-show="item.toolbar"
            @click="goTo(item)"
            :key="i"
            :class="{
              cta: item.external,
              toggledMobile: toggledMobile,
              'border-white': hash === '#' + item.name.replaceAll(' ', '').match(/([^/]+)/)[0],
            }"
            :style="{ opacity: hash === '#' + item.name.replaceAll(' ', '') || item.external ? 1 : 0.7 }"
            class="relative p-1 border-b-solid border-b-2 underline-offset-8 flex items-center gap-x-2 cursor-pointer font-bold uppercase text-white border-transparent hover:opacity-100 transition-all"
          >
            <span v-if="item.icon && !item.external" class="flex">
              <eva-icon :name="item.icon" fill="white"></eva-icon>
            </span>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </Transition>
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
     * Enable history mode
     */
    history: {
      type: null,
      default: false,
    },
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
     * Toolbar color
     */
    color: {
      type: String,
      default: "#000000",
    },
    /**
     * Toolbar hero alternate styling
     */
    sub: {
      default: false,
    },
  },
  data() {
    return {
      displayed: true,
      toggledMobile: false,
      hash: this.items.length ? "#" + this.items[0].name.replaceAll(" ", "").match(/([^/]+)/)[0] : "",
    };
  },
  methods: {
    goTo(item) {
      if (item.external) {
        this.openInNewTab(item.external)
      } else {
        this.$utils.scrollHandler.scrollToAnchor(item.name);
      }
      this.toggledMobile = false;
    },
    back() {
      this.$router.back();
    },
    goUp() {
      if (this.$route.path === "/") {
        this.goTo(this.items[0]);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    setDisplayState(state) {
      this.displayed = state;
    },
    updateHashFromScrollHandler() {
      if (this.$utils.scrollHandler.hash) {
        this.hash = this.$utils.scrollHandler.hash.replaceAll(" ", "").match(/([^/]+)/)[0];
      } else {
        this.hash = null;
      }
    },
    //Somehow window.open would close specific newly opened tabs (cached/service worker related ?)
    //Spawn-clicking a new <a/> tag seems to prevent problems for these specific edge cases.
    //TODO: see if window.open can be implemented correctly 
    openInNewTab(href) {
      Object.assign(document.createElement("a"), {
        target: "_blank",
        rel: "noopener noreferrer",
        href: href,
      }).click();
    },
  },
  beforeUnmount() {
    this.$utils.scrollHandler.destroyNamespaceHandlers("toolbar");
  },
  mounted() {
    this.$utils.scrollHandler.pushScrollHandler(this.updateHashFromScrollHandler.bind(this), "toolbar");
    this.$utils.scrollHandler.pushScrollIdleHandler(this.updateHashFromScrollHandler.bind(this), "toolbar");
    EventBus.$on("toolbar_display-state", this.setDisplayState);
  },
};
</script>
<style scoped>
.wrapper {
  max-height: 64px;
  transition: all 0.25s ease-in-out;
  position: fixed;
  top: 0px;
  left: 0px;
}
.toggledMobile.wrapper {
  max-height: 282px !important;
  height: auto;
}
.toggledMobile > a {
  opacity: 0.7 !important;
}
.cta {
  border: 2px solid white;
  padding: 6px 16px;
  border-radius: 50px;
  /* margin-left: 24px; */
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

.fade-reverse-enter-active,
.fade-reverse-leave-active {
  transition: all 0.25s ease-in-out;
}
.fade-reverse-enter-from,
.fade-reverse-leave-to {
  opacity: 0;
  position: absolute;
  margin-left: -50px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-fade-enter-from {
  position: absolute;
  margin-left: -50px;
  opacity: 0;
}
.slide-fade-leave-to {
  position: absolute;
  margin-left: -50px;
  opacity: 0;
}

.slide-fade-reverse-enter-active,
.slide-fade-reverse-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-fade-reverse-enter-from,
.slide-fade-reverse-leave-to {
  position: absolute !important;
  right: 64px;
  margin-top: -100%;
  opacity: 0;
}
</style>
