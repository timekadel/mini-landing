<template>
  <router-view class="router-view" v-slot="{ Component }">
    <app-toolbar
      :logo="logo"
      :sub="$route.params.subName"
      :color="$route.params.subName ? '#000000' : '#000000'"
      :history="$route.params.subName && canGoBack"
      :items="content.sections"
    />
    <Transition @enter="updateToolbar" @after-enter="restoreScrollPosition" :name="$route.path == '/' ? 'slide-right' : 'slide-left'">
      <keep-alive>
        <component :key="$route.path" :is="Component" />
      </keep-alive>
    </Transition>
  </router-view>
</template>

<script>
import Content from "@/minilanding";
import SubContent from "@/minilanding/sub";

export default {
  name: "App",
  data() {
    return {
      logo: Content.logo,
      content: {
        sections: [],
      },
      canGoBack: false
    };
  },
  methods: {
    updateToolbar() {
      if (this.$route.params.subName) {
        this.content = SubContent[this.$route.params.subName];
        this.canGoBack = true;
      } else {
        this.content = Content;
        this.$router.historyCount = window.history.length;
        this.canGoBack = false;
      }
    },
    restoreScrollPosition() {
      if (this.$route.meta.lastHash) {
        this.$utils.scrollHandler.scrollToAnchor(this.$route.meta.lastHash.replaceAll(" ", "").replaceAll("#", ""), false, "end");
      }
      this.updateToolbar();
    },
  },
  mounted() {
    this.canGoBack = false
  },
};
</script>

<style scoped>
* {
  user-select: none;
}

.router-view {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-left-enter-from {
  position: fixed !important;
  transform: translateX(100%) !important;
}
.slide-left-leave-to {
  position: fixed !important;
  transform: translateX(-100%) !important;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-right-enter-from {
  position: fixed !important;
  transform: translateX(-100%) !important;
}
.slide-right-leave-to {
  position: absolute !important;
  transform: translateX(100%) !important;
}
</style>
