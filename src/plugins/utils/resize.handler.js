'use strict'

const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
}

var resizeHandlerInstance = null;

class ResizeHandler {

  constructor() {
    if (!resizeHandlerInstance) {
      this.breakpoints = {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      }
      this.resizeHanlers = [],
      window.addEventListener("resize", this.computeBreakpoints.bind(this));
      this.computeBreakpoints();
    }
  }

  computeBreakpoints() {
    let width = parseInt(window.innerWidth);
    this.val = width;
    Object.keys(BREAKPOINTS).forEach(bpKey => {
      let bpVal = BREAKPOINTS[bpKey];
      this.breakpoints[bpKey.toLowerCase()] = width >= bpVal;
    })
    this.resizeHanlers.forEach(handler=>{
      handler(this.breakpoints);
    })
  }

  pushResizeHandler(handler){
    this.resizeHanlers.push(handler)
    handler(this.breakpoints);
  }

}

resizeHandlerInstance = new ResizeHandler();
export default resizeHandlerInstance;