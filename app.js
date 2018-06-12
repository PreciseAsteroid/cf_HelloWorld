

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

  if (options.enabled) { // in case the user chose to enable the ad-on


  }

  // element = INSTALL.createElement(options.location, element)
  // element.setAttribute('app', 'self-summary')
  // element.setAttribute('data-position', options.position)

  const wrapper = document.createElement('overlay');
  wrapper.innerHTML = `<overlay-header>header</overlay-header>
  <overlay-message>message</overlay-message>
  <overlay-footer>footer</overlay-footer>`;


  document.documentElement.addEventListener('mouseleave', handleMouseLeave);
  document.documentElement.addEventListener('mouseenter', handleMouseEnter);
  document.documentElement.addEventListener('keydown', handleKeydown);

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
    // body...
    // alert(e);
    console.log(e);
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
    element = INSTALL.createElement(options.location, element);
    element.appendChild(wrapper);
    console.log('update element completed');
  }




}())
