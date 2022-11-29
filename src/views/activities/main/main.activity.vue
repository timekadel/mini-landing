<template>
  <main class="main" id="main">
    <app-section v-for="(section, i) in sections" :key="i" :content="section" />
    <app-footer v-if="footer" :content="footer" />
  </main>
</template>

<script>
import Content from "@/minilanding";
import Contact from "@/views/components/contact.component.vue";
import { markRaw } from "vue";

export default {
  name: "App",
  data() {
    return Content;
  },
  activated() {
    this.$utils.scrollHandler.bindContainer(this.$el);
    document.title = this.title || "Unnamed App";
    var link = document.querySelector("link[rel~='icon']");
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
    link.href = Content.logo;
  },
  mounted() {
    if (this.contact) {
      this.sections.push({
        name: this.contact.name || "Contact",
        toolbar: true,
        light: this.contact.light,
        icon: "message-square-outline",
        custom: {
          component: markRaw(Contact),
          props: {
            content: this.contact,
          },
        },
        nofill: true,
      });
    }
  },
};
</script>

<style scoped>
.main {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
