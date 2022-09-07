'use strict'

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

const RESIZE_THROTTLE = 250;
var resizeHandlerInstance = null;

class ResizeHandler {

  constructor() {
    if (!resizeHandlerInstance) {
      this.breakpoint = {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      }
      window.addEventListener("resize", throttle(this.computeBreakpoints.bind(this), RESIZE_THROTTLE));
      this.computeBreakpoints();
    }
  }

  computeBreakpoints() {
    let width = parseInt(window.innerWidth);
    this.val = width;
    Object.keys(BREAKPOINTS).forEach(bpKey => {
      let bpVal = BREAKPOINTS[bpKey];
      this.breakpoint[bpKey.toLowerCase()] = width >= bpVal
    })
    this.breakpoint.sm = true;
  }

}

resizeHandlerInstance = new ResizeHandler();
export default resizeHandlerInstance;