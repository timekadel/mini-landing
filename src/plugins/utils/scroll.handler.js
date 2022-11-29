'use strict'

var scrollHandlerInstance = null;
var handlerID = 0;

const SCROLL_DIRECTIONS = {
  UP: 0,
  DOWN: 1
}

var scrollTimeout = null;

class ScrollHandler {

  constructor() {
    if (!scrollHandlerInstance) {
      this.scrollEl = null;
      this.scrollY = 0;
      this.scrollX = 0;
      this.touchY = 0;
      this.scrollingFlag = false;
      this.scrollDown = SCROLL_DIRECTIONS.DOWN;
      this.scrollHandlers = [];
      this.wheelHandlers = [];
      this.scrollIdleHandlers = [];
      this.hash = undefined;
      this.bound = false;
      this.disabledScroll = false;
      this.invisibleAnchor = document.createElement("a");
      this.invisibleAnchor.style.position = "absolute";
      this.invisibleAnchor.id = "invisibleScrollAnchor";
    }
  }

  set hash(hash) {
    this._hash = hash;
  }

  get hash() {
    return this._hash
  }

  get position() {
    return {
      x: this.scrollX,
      y: this.scrollY
    }
  }

  scrollVertical(position) {
    if (this.scrollEl) {
      this.scrollEl.scrollTop = position;
      this.scrollHandlers.forEach(h => {
        h.handler();
      })
    }
  }

  scrollToAnchor(anchor, disableScroll = false, block) {
    if (anchor) {
      this.disableScroll(disableScroll);
      let parsedAnchor = anchor.replaceAll(' ', '');
      let el = document.getElementById(parsedAnchor);
      history.replaceState({}, null, "#" + parsedAnchor);
      this.scrollingFlag = true;
      this.handleScrollingState();
      el.scrollIntoView({
        behavior: "smooth",
        block: block || "nearest",
      })
    }
  }

  bindContainer(el) {
    this.unbindContainer();
    this.scrollEl = el;
    this.scrollHandlerHandle = this.handleScroll.bind(this);
    this.wheelHandlerHandle = this.handleWheel.bind(this);
    this.touchStartHandlerHandle = this.handleTouchStart.bind(this);
    this.touchMoveHandlerHandle = this.handleWheel.bind(this);
    this.scrollEl.addEventListener("scroll", this.scrollHandlerHandle);
    this.scrollEl.addEventListener("wheel", this.wheelHandlerHandle);
    this.scrollEl.addEventListener("touchstart", this.touchStartHandlerHandle);
    this.scrollEl.addEventListener("touchmove", this.touchMoveHandlerHandle);
    this.pushScrollHandler(this.handleScrollingState.bind(this))
    this.disableScroll(this.disabledScroll);
  }

  unbindContainer() {
    if (this.scrollEl) {
      this.scrollEl.removeEventListener("scroll", this.scrollHandlerHandle);
      this.scrollEl.removeEventListener("wheel", this.wheelHandlerHandle);
      this.scrollEl.removeEventListener("touchstart", this.touchStartHandlerHandle);
      this.scrollEl.removeEventListener("touchmove", this.touchMoveHandlerHandle);
    }
  }

  handleScrollingState() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      this.scrollingFlag = false;
      /** 
       * Well, that's dodgy  AF but I was too lazy to implement code priority 
       * So everything will be run twice as to ensure hash propagation
       * whenever hash value is modified outside. This is BAD. Do not reproduce,
       * however it does do the job at the moment.
       * */
      for (let i = 0; i < 2; i++) {
        this.scrollIdleHandlers.forEach(h => {
          h.handler();
        })
        this.hash = window.location.hash;
      }
    }, 50);
  }

  disableScroll(state = true) {
    this.disabledScroll = state;
    if (this.scrollEl) {
      this.scrollEl.style.overflowY = (state ? "hidden" : "auto");
    }
  }

  handleScroll(e) {
    if (this.scrollEl && e) {
      var newScrollY = this.scrollEl.scrollTop;
      this.scrollDown = newScrollY > this.scrollY;
      this.scrollY = newScrollY;
      this.hash = window.location.hash;
      this.scrollHandlers.forEach(h => {
        h.handler(e);
      })
    }
  }

  handleWheel(e) {
    let delta;
    if (e.type === "wheel") {
      delta = 8 * e.deltaY / Math.abs(e.deltaY);
    } else {
      delta = 240 * (this.touchStart - e.touches[0].clientY) / screen.height;
      this.touchStart = e.touches[0].clientY
    }
    this.wheelHandlers.forEach(h => {
      h.handler(delta);
    })
  }

  handleTouchStart(e) {
    this.touchStart = e.touches[0].clientY;
  }

  pushScrollHandler(handler, namespace) {
    let handlerObj = {
      handler: handler,
      id: handlerID++,
      namespace: namespace
    }
    this.scrollHandlers.push(handlerObj)
    return handlerObj.id;
  }

  pushWheelHandler(handler, namespace) {
    let handlerObj = {
      handler: handler,
      id: handlerID++,
      namespace: namespace
    }
    this.wheelHandlers.push(handlerObj)
    return handlerObj.id;
  }

  pushScrollIdleHandler(handler, namespace) {
    let handlerObj = {
      handler: handler,
      id: handlerID++,
      namespace: namespace
    }
    this.scrollIdleHandlers.push(handlerObj)
    return handlerObj.id;
  }

  removeScrollHandler(id) {
    let index = this.scrollHandlers.findIndex(h => h.id == id);
    if (index > -1) {
      this.scrollHandlers.splice(index)
    }
  }

  removeWheelHandler(id) {
    let index = this.wheelHandlers.findIndex(h => h.id == id);
    if (index > -1) {
      this.wheelHandlers.splice(index)
    }
  }

  removeScrollIdleHandler(id) {
    let index = this.scrollIdleHandlers.findIndex(h => h.id == id);
    if (index > -1) {
      this.scrollIdleHandlers.splice(index)
    }
  }

  /**
   * Well that seem's like a massive waste of event-loop time...
   * TODO: Find a better approach...
   * eg. loop handlers from end to start to avoid indexion error due to previous splicing
   */
  destroyNamespaceHandlers(namespace) {
    let nsScrollHandlers = this.scrollHandlers.filter(h => h.namespace === namespace);
    let nsWheelHandlers = this.wheelHandlers.filter(h => h.namespace === namespace);
    let nsScrollIdleHandlers = this.scrollIdleHandlers.filter(h => h.namespace === namespace);
    nsScrollHandlers.forEach(h => {
      this.removeScrollHandler(h.id);
    })
    nsWheelHandlers.forEach(h => {
      this.removeWheelHandler(h.id);
    })
    nsScrollIdleHandlers.forEach(h => {
      this.removeScrollIdleHandler(h.id);
    })
  }

}

scrollHandlerInstance = new ScrollHandler();
export default scrollHandlerInstance;