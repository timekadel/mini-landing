<template>
  <main class="main" id="main">
    <app-toolbar :defaultDisplayState="toolbarDefaultDisplayed" :logo="logo" :title="hideTitle ? '' : title" :items="sections" />
    <app-section class="sections" v-for="(section, i) in sections" :key="i" :content="section" />
    <app-footer v-if="footer" :content="footer" />
  </main>
</template>

<script>
import Content from "@/minilanding.js";
import Contact from "@/views/components/contact.component.vue"
import {markRaw} from "vue"

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
    if(this.contact){
      this.sections.push({
        name: this.contact.name || "Contact",
        toolbar: true,
        light: this.contact.light,
        custom: {
          component: markRaw(Contact),
          props: {
            content: this.contact
          }
        },
        nofill: true
      })
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
