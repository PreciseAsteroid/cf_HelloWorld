(function() {
  'use strict'

  if (!window.addEventListener)
    return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element
  var popped = false; // trackes if the pop up was thrown already
  var isVisible = false;

  const rootEl = document.documentElement;


  // const defaultFontFamily = '"Palatino Linotype", "Book Antiqua", "Palatino", "serif""';
  element = INSTALL.createElement(element);


  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
      updateElement();
    }
  }


  // exit immediately if user disabled popup
  if (options.enabled == false) {
    return;
  } // in case the user chose to enable the ad-on
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'popup');
  wrapper.innerHTML = `
  <div class="popup_background"></div>
  <div class="popup">
    <div class="exit_popup box">
      <a class="exit_popup popup_close" href="#">&times;</a>
      <div class="exit_popup header_content">
        <img class="exit_popup image" src=${options.mainImage} alt="">
        <div class="exit_popup title"><h1>${options.header.headerTextDetails.headerText}</h1></div>
      </div>
      <div class="exit_popup content">
        <!-- your content -->
        <p class="exit_popup text">${options.body.bodyTextDetails.bodyText}</p>
        <a class="exit_popup popup_button" href=${options.btn.btnTextDetails.btnLink}>${options.btn.btnTextDetails.btnText}</a>
      </div>
    </div>
  </div>`;

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
    // element = INSTALL.createElement(element);
    // initialize cookies in case frequncies changed to every session
    if (options.frequencies == "session") {
      eraseCookie(INSTALL_SCOPE.appName)
    }

    element.setAttribute('app', 'exit_popup');
    element.setAttribute('popup-visibility', 'hidden');
    element.appendChild(wrapper);
    document.getElementsByTagName("body")[0].appendChild(element);
    initCloseButton(rootEl);
    initGeneralSetting(rootEl);
    initHeaderSetting(rootEl);
    initBodySetting(rootEl);
    initButton(rootEl);



    addHandlers();
    // testing
    // console.log("options", options);
    // console.log("options.btn.btnTextDetails.btnFontFamily", options.btn.btnTextDetails);

  }

  /// Hide and Show Popup

  function hide(event) {
    element.setAttribute('popup-visibility', 'hidden');
    isVisible = false;
    document.documentElement.addEventListener('mousedown', handleoMouseDown);
  }

  function hideElement(el){el.style.display = "none";}


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
    // hide();
  }

  function handleoMouseDown(e) {
    if ((e.target.classList.contains("exit_popup") != true) || // click outside popup
        (e.target.classList.contains("popup_close") == true)) {// click on closeButton ) {
      hide();
    }
  }

// initialize CSS values based on options changes
  function initGeneralSetting(el){
  // init orig site background opacity
  el.style.setProperty('--orig-background-opacity', options.origSiteBackgroundOpac);
  // init colors
  el.style.setProperty('--theme-color', options.themeColor);
};
  function initCloseButton (el) {
    el.style.setProperty('--close-button-color',options.closeBtn.closeBtnDetails.CloseBtnFontColor);
    el.style.setProperty('--close-button-font-size',options.closeBtn.closeBtnDetails.CloseBtnFontSize);
  };
  function initHeaderSetting (el) {
    el.style.setProperty('--header-text-size',options.header.headerTextDetails.HeaderFontSize);
    el.style.setProperty('--header-text-family',options.header.headerTextDetails.headerFontFamily);
    el.style.setProperty('--header-text-color',options.header.headerTextDetails.headerTextColor);
  }
  function initBodySetting (el) {
    el.style.setProperty('--body-text-size',options.body.bodyTextDetails.HeaderFontSize);
    el.style.setProperty('--body-text-family',options.body.bodyTextDetails.headerFontFamily);
    el.style.setProperty('--body-text-color',options.body.bodyTextDetails.headerTextColor);
  }
  function initButton (el) {
    rootEl.style.setProperty('--button-background-color', options.btn.btnTextDetails.btnColor);
    rootEl.style.setProperty('--button-text-color', options.btn.btnTextDetails.btnTextColor);
    rootEl.style.setProperty('--button-text-size', options.btn.btnTextDetails.btnFontSize + 'px');
    rootEl.style.setProperty('--button-text-font-family',options.btn.btnTextDetails.btnFontFamily);

    const buttonEl = document.getElementsByClassName("popup_button")[0];
    if(options.enable_button != true){hideElement(buttonEl);}
    if(options.btn.btnTextDetails.btnLinkNewTab == true){buttonEl.setAttribute('target','_blank')}
  }

}())
