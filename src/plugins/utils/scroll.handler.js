'use strict'

var scrollHandlerInstance = null;
var handlerID = 0;

const SCROLL_DIRECTIONS = {
  UP: 0,
  DOWN: 1
}

class ScrollHandler {

  constructor() {
    if (!scrollHandlerInstance) {
      this.scrollEl = null;
      this.scrollY = 0;
      this.scrollX = 0;
      this.touchY = 0;
      this.scrollDown = SCROLL_DIRECTIONS.DOWN;
      this.scrollHandlers = [];
      this.hash = undefined;
      this.bound = false;
      this.handleScroll();
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
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  bindContainer(el) {
    this.scrollEl = el;
    this.scrollEl.addEventListener("scroll", this.handleScroll.bind(this));
  }

  disableScroll(scrollState){
    if(this.scrollEl){
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


  removeScrollHandler(id) {
    let index = this.scrollHandlers.findIndex(h=>h.id == id);
    if(index > -1){
      this.scrollHandlers.splice(index)
    }
  }

}

scrollHandlerInstance = new ScrollHandler();
export default scrollHandlerInstance;