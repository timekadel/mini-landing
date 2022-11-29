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
var handlerID = 0;

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
    this.resizeHanlers.forEach(h=>{
      h.handler(this.breakpoints);
    })
  }

  pushResizeHandler(handler, namespace) {
    let handlerObj = {
      handler: handler,
      id: handlerID++,
      namespace: namespace
    }
    this.resizeHanlers.push(handlerObj)
    return handlerObj.id;
  }

  removeResizeHandler(id) {
    let index = this.resizeHanlers.findIndex(h => h.id == id);
    if (index > -1) {
      this.resizeHanlers.splice(index)
    }
  }

  /**
   * Well that seem's like a massive waste of event-loop time...
   * TODO: Find a better approach...
   * eg. loop handlers from end to start to avoid indexion error due to previous splicing
   */
   destroyNamespaceHandlers(namespace){
    let nsResizeHandlers = this.resizeHanlers.filter(h=>h.namespace === namespace);
    nsResizeHandlers.forEach(h=>{
      this.removeResizeHandler(h.id);
    })
  }

}

resizeHandlerInstance = new ResizeHandler();
export default resizeHandlerInstance;