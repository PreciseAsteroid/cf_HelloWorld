(function() {
  'use strict'

  if (!window.addEventListener)
    return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element
  var popped = false; // trackes if the pop up was thrown already
  var isVisible = false;


  window.INSTALL_SCOPE = {
    appName: "exit_popup",
    setOptions: function setOptions(nextOptions) {
      options = nextOptions
    }
  }

  // exit immediately if user disabled popup
  if (options.endabled == false) {
    return;
  } // in case the user chose to enable the ad-on



  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'popup');
  wrapper.innerHTML = `<div class="popup" id="text"><div class="box"><a class="close" href="#">&times;</a><div class="title"><h1>${options.header}</h1></div><div class="content"><!-- your content --><img class="image" src=${options.mainImage} alt=""><p class="text">${options.body}</p><h3><a class="button" href="#">Sign Up</a></h3></div></div></div>`;
  // wrapper.innerHTML = `
  //   <a class="popup-close popup" href="#" aria-label="Close Account Info Modal Box">&times;</a>
  //   <div class="popup-header popup">${options.header}</div>
  //   <div class="popup-body popup">${options.body}</div>
  //   `;
  // <a class="link" href="#">No thanks. Let me out</a>

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  function updateElement() {
    if (options.endabled == false) {
      return;
    }
    // initialize
    element = INSTALL.createElement(element);
    // initialize cookies in case frequncies changed to every session
    if (options.frequencies == "session") {
      eraseCookie(INSTALL_SCOPE.appName)
    }

    element.setAttribute('app', 'exit_popup');
    element.setAttribute('popup-visibility', 'hidden');
    element.appendChild(wrapper);
    document.getElementsByTagName("body")[0].appendChild(element);
    addHandlers();

  }

  /// Hide and Show Popup

  function hide(event) {
    element.setAttribute('popup-visibility', 'hidden');
    isVisible = false;
    document.documentElement.addEventListener('mousedown', handleoMouseDown);
  }


  function show(event) {
    // if (event && event.target !== this) return
    if (!isValidtoShow()) {
      removeHandlers();
      return;
    };
    element.setAttribute('popup-visibility', 'visible');
    isVisible = true;
    popped = true
    eraseCookie(INSTALL_SCOPE.appName)
    setCookie(INSTALL_SCOPE.appName,new Date().toLocaleString(), expirationDays());
    removeHandlers();
    // document.body.style.overflow = ''
  }

  // are we allowed to show the pop up
  function isValidtoShow() {
    // console.log("options.enabled: ", options );
    // if (options.enabled == false){return false}
    if (options.frequencies == "session" && popped) {
      return false;
    };
    if ((options.frequencies == "once" || options.frequencies == "every")
      &&(getCookie(INSTALL_SCOPE.appName) != null)) {
      return false;
    }
    return true;

  }

  // handling cookies
  // TODO: consider giving up that function
  function isCookie() {
    if (getCookie(INSTALL_SCOPE.appName) != "") {
      console.log("searching for getCookie(INSTALL_SCOPE.appName):",getCookie(INSTALL_SCOPE.appName));
      return true
    };
  };

// calculate cookie expiraion time
  function expirationDays() {
    if (options.frequencies == "once"){ return null} // sets cookie without expiration date
    if (options.frequencies == "every") {
      if (options.number) { // making sure a number is in place
        switch (options.period) {
          case "months":
            return options.number * 30;
            break;
          default:
            return options.number;
        }
      }
    }
  }

  function removeHandlers(){
    document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    document.documentElement.removeEventListener('keydown', handleKeydown);
  };

  function addHandlers(){
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('keydown', handleKeydown);
    document.documentElement.addEventListener('mousedown', handleoMouseDown);
  }

  function handleMouseLeave(e) {
    show();
  }

  function handleMouseEnter(e) {
  }

  function handleKeydown(e) {
    hide();
  }

  function handleoMouseDown(e) {
    if (e.target.classList.contains("popup") != true) {
      hide();
    }
  }

}())
