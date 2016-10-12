/**
 * This is a utility class which will give you a load of useful data if you want to animate stuff
 */

export default class AnimationHelper {

  constructor () {

    this.scrollPosition = 0;
    this.scrollHeight = 0;
    this.scrollDirection = 'down';

    /**
     * We don't want people using it if it's on the server
     */

    if(typeof window === undefined){

      throw new Error('AnimationHelper Class: You\'ve called the AnimationHelper Class in a server side environment.\nMake sure it\'s only called in browser when a window object is available!' )

    }else{

      /**
       * This is the call to the function that does all of the work
       */

      window.requestAnimationFrame(this.captureScrollValues.bind(this));

    }

  }

  checkAndSetBodyVals () {

    if(this.getDocumentHeight() > 1000) {

      document.body.setAttribute('style', `height: ${this.getDocumentHeight()}px`);

      return true;

    }else {

      return false;

    }

  }

  getScrollDirection (st) {

    switch(true){
      case(st > this.scrollPosition):
        return 'down';
      case(st < this.scrollPosition):
        return 'up';
      case(st == this.scrollPosition):
        return false;
    }

  }

  captureScrollValues () {

    const node = document.body;

    /**
     * Push the scrollTop and scrollHeight into the store, so we can use it in other places
     * Also now added it to the state, so we can check when it changes and dispatch then,
     * to save on memory
     */

    if(this.scrollTop !== node.scrollTop || this.scrollHeight !== node.scrollHeight){

      this.scrollTop = node.scrollTop;
      this.scrollHeight = node.scrollHeight;

      // Only updates if we're scrolling
      if(this.getScrollDirection(node.scrollTop)){

        this.scrollDirection = this.getScrollDirection(node.scrollTop);

      }

      this.scrollPosition = node.scrollTop;
      this.scrollHeight = node.scrollHeight;

    }

    /**
     * Call the function again (when ready for another paint)
     */

    window.requestAnimationFrame(this.captureScrollValues.bind(this));

    return {
      scrollPos: this.scrollPosition,
      scrollHeight: this.scrollHeight,
      scrollDirection: this.scrollDirection,
    }

  }

  /**
   * Gets the height of the body by finding the maximum of all browser calculated values
   */

  getDocumentHeight () {

    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  }

}
