  updateStores () {

    const scrollValues = this.AnimationHelper.captureScrollValues();

    try{

      this.props.dispatch(updateScrollDirection(scrollValues.scrollDirection));
      this.props.dispatch(updateScrollPosition(scrollValues.scrollPos));
      this.props.dispatch(updateScrollHeight(scrollValues.scrollHeight));

      }catch(e){
        console.log(e);
      }

    window.requestAnimationFrame(this.updateStores.bind(this));

  }
