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
    }
  }

  set hash(hash) {
    this._hash = hash;
  }

  get hash() {
    return this._hash
  }

  scrollToAnchor(anchor, disableScroll=false) {
    this.disableScroll(disableScroll);
    let parsedAnchor = anchor.replaceAll(' ', '');
    let el = document.getElementById(parsedAnchor);
    history.replaceState({}, null, "#" + parsedAnchor);
    this.scrollingFlag = true;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  bindContainer(el) {
    this.scrollEl = el;
    this.scrollEl.addEventListener("scroll", this.handleScroll.bind(this));
    this.scrollEl.addEventListener("wheel", this.handleWheel.bind(this));
    this.scrollEl.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.scrollEl.addEventListener("touchmove", this.handleWheel.bind(this));
    this.pushScrollHandler(this.handleScrollingState.bind(this))
    this.disableScroll(this.disabledScroll);
  }

  handleScrollingState() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      this.scrollingFlag = false;
      this.scrollIdleHandlers.forEach(h => {
        h.handler();
      })
    }, 100);
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
      delta = 4 * e.deltaY / Math.abs(e.deltaY);
    } else {
      delta = 60 * (this.touchStart - e.touches[0].clientY) / screen.height;
      this.touchStart = e.touches[0].clientY
    }
    this.wheelHandlers.forEach(h => {
      h.handler(delta);
    })
  }

  handleTouchStart(e) {
    this.touchStart = e.touches[0].clientY;
  }

  pushScrollHandler(handler) {
    let handlerObj = {
      handler: handler,
      id: handlerID++
    }
    this.scrollHandlers.push(handlerObj)
    return handlerObj.id;
  }

  pushWheelHandler(handler) {
    let handlerObj = {
      handler: handler,
      id: handlerID++
    }
    this.wheelHandlers.push(handlerObj)
    return handlerObj.id;
  }

  pushScrollIdleHandler(handler) {
    let handlerObj = {
      handler: handler,
      id: handlerID++
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

}

scrollHandlerInstance = new ScrollHandler();
export default scrollHandlerInstance;