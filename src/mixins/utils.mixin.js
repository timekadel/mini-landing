export default {
  data() {
    return {
      scroll: this.$utils.scrollHandler,
      resize: this.$utils.resizeHandler, 
    }
  },
  watch:{
    scroll:{
      deep: true,
    }
  }
}