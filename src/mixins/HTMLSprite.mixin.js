'use strict'

import VUE3DRenderer from "@/plugins/visualizer/vue3d_renderer.js";

export default {
  mounted() {
    VUE3DRenderer.addHTMLSprite(this);
    this.$el.style.display = "none"
  }
}