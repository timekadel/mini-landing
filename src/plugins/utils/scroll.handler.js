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
      this.scrollIdleHandlers = [];
      this.hash = undefined;
      this.bound = false;
      // this.handleScroll();
    }
  }

  set hash(hash) {
    this._hash = hash;
  }

  get hash() {
    return this._hash
  }

  scrollToAnchor(anchor) {
    let el = document.getElementById(anchor.replaceAll(' ', ''));
    history.replaceState({}, null, "#" + anchor);
    this.scrollingFlag = true;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  bindContainer(el) {
    this.scrollEl = el;
    this.scrollEl.addEventListener("scroll", this.handleScroll.bind(this));
    this.pushScrollHandler(this.handleScrollingState.bind(this))
  }

  handleScrollingState(){
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(()=>{
      this.scrollingFlag = false;
      this.scrollIdleHandlers.forEach(h => {
        h.handler();
      })
    }, 100);
  }

  disableScroll(scrollState) {
    if (this.scrollEl) {
      this.scrollEl.style.overflow = (scrollState ? "hidden" : "auto");
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

  pushScrollHandler(handler) {
    let handlerObj = {
      handler: handler,
      id: handlerID++
    }
    this.scrollHandlers.push(handlerObj)
    return handlerObj.id;
  }

  pushScrollIdleHandler(handler){
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

}

scrollHandlerInstance = new ScrollHandler();
export default scrollHandlerInstance;