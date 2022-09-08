import {
  throttle
} from "lodash";

const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
}

export default {
  data() {
    return {
      val: 0,
      breakpoint: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      }
    }
  },
  methods: {
    computeBreakpoints() {
      let width = parseInt(window.innerWidth);
      this.val = width;
      Object.keys(BREAKPOINTS).forEach(bpKey => {
        let bpVal = BREAKPOINTS[bpKey];
        this.breakpoint[bpKey.toLowerCase()] = width >= bpVal
      })
      this.breakpoint.sm = true;
    }
  },
  mounted() {
    window.addEventListener('resize', throttle(this.computeBreakpoints.bind(this), 250))
    this.computeBreakpoints();
  }
}