
// import ScrollHandler from '@/plugins/scroll.handler.js';
import throttle from "lodash"

export default {
  data() {
    // return ScrollHandler; 
    return {
      scrollY: 0,
      scrollX: 0,
      scrollHandlers: [],
      hash: undefined
    };
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
      this.scrollX = window.scrollX;
      this.hash = window.location.hash;
      this.scrollHandlers.forEach(handler => {
        handler();
      })
    },
    pushScrollHandler(handler) {
      this.$utils.scrollHandlers.push(handler)
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
     if (document.getElementById("main")) {
      document.getElementById("main").addEventListener("scroll", throttle(this.handleScroll.bind(this), 150));
      // instanced = true;
     }
    this.handleScroll();
    window.scroll({
      behavior: "smooth",
      left: 0,
      // top: element.offsetTop,
    });
    
  }
}