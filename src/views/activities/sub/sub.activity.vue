<template>
  <main class="main" id="main">
    <app-section v-for="(section, i) in subConfig.sections" :key="i" :content="section" />
    <app-footer v-if="subConfig.footer" :content="subConfig.footer" />
  </main>
</template>

<script>
import Content from "@/minilanding/sub/";

export default {
  name: "SubActivity",
  data() {
    return {
      subConfig: {
        sections: [],
        title: "",
      },
    };
  },
  activated() {
    if (this.$route.params.subName) {
      this.subConfig = Content[this.$route.params.subName];
      this.$utils.scrollHandler.bindContainer(this.$el);
      document.title = this.subConfig.title || "Unnamed App";
      var link = document.querySelector("link[rel~='icon']");
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
      link.href = this.subConfig.logo;
    }
  },
  updated() {
    this.$utils.scrollHandler.scrollToAnchor(this.subConfig.sections[0].name);
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
