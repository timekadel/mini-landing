<template>
  <main class="main" id="main">
    <app-toolbar :logo="logo" :title="hideTitle ? '' : title" :items="sections" />
    <app-section class="sections" v-for="(section, i) in sections" :key="i" :content="section" />
    <app-footer :content="footer" />
  </main>
</template>

<script>
import Content from "@/minilanding.js";

export default {
  name: "App",
  data() {
    return Content;
  },
  mounted() {
    this.$utils.scrollHandler.bindContainer(this.$el);
    document.title = this.title || "Unnamed App";
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = Content.logo;
  },
};
</script>

<style scoped>
.main {
  position: relative;
  z-index: 1000;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  scroll-snap-type: y proximity;
  -webkit-overflow-scrolling: touch;
}
</style>
