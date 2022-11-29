<template>
  <div class="flex-col wrapper" :class="{ light: content.light }">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-32 justify-center flex-shrink-0 p-8">
      <div
        class="flex flex-col gap-8 pb-8 lg:flex-row lg:gap-32 flex-shrink-0"
        style="border-bottom: 1px solid"
        :style="{ 'border-color': content.light ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)' }"
      >
        <div class="flex gap-4 lg:flex-row flex-col lg:items-start lg:justify-start lg:text-left items-center justify-center text-center">
          <img v-if="content.logo" :src="content.logo" class="w-16 h-16 rounded-lg" rel="preload" />
          <div class="flex flex-col gap-2 lg:gap-0 lg:pb-0 pb-8">
            <h1 v-if="content.name" :class="{ 'text-white': !content.light }" class="text-black text-xl font-medium">{{ content.name }}</h1>
            <p v-if="content.slogan" :class="{ 'text-white': !content.light }" class="text-black">{{ content.slogan }}</p>
            <p v-if="content.copyright" :class="{ 'text-white': !content.light }" class="text-black font-thin">©{{ content.copyright }}</p>
          </div>
        </div>
        <div
          class="flex gap-4 lg:gap-16 flex-wrap flex-col lg:flex-row lg:items-start lg:justify-start lg:text-left items-center justify-center text-center"
        >
          <div class="flex flex-col" v-for="(section, i) in content.sections" :key="'A' + i">
            <span :class="{ 'text-white': !content.light }" class="text-black font-medium">{{ section.name }}</span>
            <a
              class="text-black font-thin hover:text-blue-500 transition-colors cursor-pointer"
              @click="goTo(item.to)"
              v-for="(item, j) in section.items"
              :key="'B' + j"
              target="_blank"
              :class="{ 'text-white': !content.light }"
              >{{ item.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="content.social" class="flex gap-4 items-center justify-center pb-8">
      <eva-icon
        class="cursor-pointer"
        animation="pulse"
        v-if="content.social.github"
        name="github"
        @click="goTo(content.social.github)"
        :fill="content.light ? 'black' : 'white'"
      />
      <eva-icon
        class="cursor-pointer"
        animation="pulse"
        v-if="content.social.linkedin"
        name="linkedin"
        @click="goTo(content.social.linkedin)"
        :fill="content.light ? 'black' : 'white'"
      />
      <eva-icon
        class="cursor-pointer"
        animation="pulse"
        v-if="content.social.facebook"
        name="facebook"
        @click="goTo(content.social.facebook)"
        :fill="content.light ? 'black' : 'white'"
      />
      <eva-icon
        class="cursor-pointer"
        animation="pulse"
        v-if="content.social.twitter"
        name="twitter"
        @click="goTo(content.social.twitter)"
        :fill="content.light ? 'black' : 'white'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "footerComponent",
  props: {
    content: Object,
  },
  methods: {
    async goTo(link) {
      if (link.includes("https://") || link[0] === ".") {
        this.openInNewTab(link);
      } else if (link.includes("#")) {
        this.$utils.scrollHandler.scrollToAnchor(link.replace("#", ""));
      } else if (link[0] === "/") {
        this.$route.matched[0].meta.lastHash = this.content.name;
        this.$utils.scrollHandler.scrollToAnchor(this.content.name, false, "end");
        this.$utils.scrollHandler.pushScrollIdleHandler(() => {
          this.$router.push(link);
          this.$utils.scrollHandler.destroyNamespaceHandlers("pageTransition");
        }, "pageTransition");
      } else if(link.includes("mailto:")){
        window.location.href = link
      }else {
        throw new Error(`Unsupported link type. Expecting: [#link, /link, https://link], got ${link}`);
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
};
</script>

<style scoped>
.wrapper {
  background: linear-gradient(-200deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.75)), url(@/assets/noise.png);
}
.wrapper.light {
  background: linear-gradient(-200deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.75)), url(@/assets/noise.png);
}
</style>
