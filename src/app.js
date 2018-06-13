

(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  // function updateElement () {
  // }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      // updateElement()
    }
  }

  if (options.endabled == false) {return;} // in case the user chose to enable the ad-on




  // element = INSTALL.createElement(options.location, element)
  // element.setAttribute('app', 'self-summary')
  // element.setAttribute('data-position', options.position)

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'popup');
  wrapper.innerHTML = `<div class="popup-header popup">${options.header}</div>
  <div class="popup-body popup">${options.body}</div>`;


  document.documentElement.addEventListener('mouseleave', handleMouseLeave);
  document.documentElement.addEventListener('mouseenter', handleMouseEnter);
  document.documentElement.addEventListener('keydown', handleKeydown);
  document.documentElement.addEventListener('mousedown', handleoMouseDown);

  function handleMouseLeave (e) {
    // body...
    // alert(e);
    console.log(e);
    // console.log(element);
    // console.log(wrapper);
    updateElement();
  }

  function handleMouseEnter (e) {
    // body...
    // alert(e);
    console.log(e);

  }

  function handleKeydown (e) {
    console.log(e);
    hide();
  }

  function handleoMouseDown (e) {
    // close popup when clicking outside the popup
    if(e.target.classList.contains("popup") != true){
      hide();
    }
  }
  // This code ensures that the app doesn't run before the page is loaded.
  // if (document.readyState === 'loading') {
  //   document.addEventListener('DOMContentLoaded', updateElement)
  // } else {
  //   // updateElement()
  // }

  // function sendAlert() {
  // window.onbeforeunload = (e) => {
  //   // const dialogText = 'Random Text';
  //   e.returnValue = options.message;
  //   // updateElement();
  //   console.log(options.message);
  //   return options.message;
  // }
  function updateElement(){
    // element = INSTALL.createElement(options.location, element);
    element = INSTALL.createElement(element);
    // console.log("options.location: ",options.location);
    element.setAttribute('app', 'exit_popup');
    element.setAttribute('popup-visibility', 'visible');
    element.appendChild(wrapper);
    document.getElementsByTagName("body")[0].appendChild(element);
    console.log('update element completed: ', element);
  }

  function hide (event) {
    // if (event && event.target !== this) return
    element.setAttribute('popup-visibility', 'hidden');
    console.log("hide event is called on element: ",element);

    // document.body.style.overflow = ''
  }




}())
