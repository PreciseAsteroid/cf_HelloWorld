(function() {
  'use strict'

  if (!window.addEventListener)
    return // Check for IE9+

  var options = INSTALL_OPTIONS;
  var element;
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

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  function updateElement() {
    console.log("debuging update element");
    initPopup();

    if (options.endabled == false) {
      return;
    }
    // initialize
    // element = INSTALL.createElement(element);
    // initialize cookies in case frequncies changed to every session
    if (options.frequnciesDetails.frequencies == "session") {
      eraseCookie(INSTALL_SCOPE.appName)
    }

    initCloseButton();
    initHeaderImage();
    initHeaderSetting();
    initGeneralSetting();
    initBodySetting();
    initButton();
    initWarning()
    addHandlers();

    // testing
    // console.log("options", options);
    // console.log("options.btn.btnTextDetails.btnFontFamily", options.btn.btnTextDetails);

  }

  function updateValue(id, value, attribute) {
    console.log("updating value of id: ", id);
    if (attribute == null) {
      document.getElementById(id).textContent = value;
    } else {
      document.getElementById(id).setAttribute(attribute, value);
    }

  }

  function hide() {
    element.setAttribute('popup-visibility', 'hidden');
    isVisible = false;
    document.documentElement.addEventListener('mousedown', handleoMouseDown);
  }

  function hideElement(el) {
    el.style.display = "none";
  }
  function showElement(el) {
    el.style.display = "block";
  }

  function show() {
    // if (event && event.target !== this) return
    if (!isValidtoShow()) {
      // removeHandlers();
      return;
    };
    element.setAttribute('popup-visibility', 'visible');
    isVisible = true;
    popped = true
    eraseCookie(INSTALL_SCOPE.appName)
    setCookie(INSTALL_SCOPE.appName, new Date().toLocaleString(), expirationDays());
    // removeHandlers();
    // document.body.style.overflow = ''
  }

  // are we allowed to show the pop up
  function isValidtoShow() {
    if (options.enabled == false) {
      return false
    };
    if (options.designMode == true) {
      return true;
    };
    if (options.frequnciesDetails.frequencies == "never") {
      return false;
    };

    // console.log("options.enabled: ", options );
    // if (options.enabled == false){return false}
    if (options.frequnciesDetails.frequencies == "session" && popped) {
      return false;
    };
    if ((options.frequnciesDetails.frequencies == "once" || options.frequnciesDetails.frequencies == "every") && (getCookie(INSTALL_SCOPE.appName) != null)) {
      return false;
    }
    return true;

  }
  function isCookie() {
    if (getCookie(INSTALL_SCOPE.appName) != "") {
      console.log("searching for getCookie(INSTALL_SCOPE.appName):", getCookie(INSTALL_SCOPE.appName));
      return true
    };
  };
  function expirationDays() {
    if (options.frequnciesDetails.frequencies == "once") {
      return null
    } // sets cookie without expiration date
    if (options.frequnciesDetails.frequencies == "every") {
      if (options.frequencyNumber) { // making sure a frequencyNumber is in place
        switch (options.frequencyPeriod) {
          case "months":
            return options.frequencyNumber * 30;
            break;
          default:
            return options.frequencyNumber;
        }
      }
    }
  }
  function removeHandlers() {
    document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    document.documentElement.removeEventListener('keydown', handleKeydown);
  };
  function addHandlers() {
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('keydown', handleKeydown);
    document.documentElement.addEventListener('mousedown', handleoMouseDown);
  }
  function handleMouseLeave(e) {
    show();
  }
  function handleMouseEnter(e) {}
  function handleKeydown(e) {
    if (e.key == "Escape" || e.key == "Esc") {
      hide();
    }
  }
  function handleoMouseDown(e) {
    if ((e.target.classList.contains("exit_popup") != true) || // click outside popup
    (e.target.classList.contains("popup_close") == true)) { // click on closeButton ) {
      hide();
    }
  }
  // init popup
  function initPopup() {
    if (popped) { // build popup only once
      if (options.enabled == false) {
        hide();
      };
      return;
    };
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'popup');
    wrapper.innerHTML = `
  <div class="popup_background"></div>
  <div class="popup">
    <div class="exit_popup box">
      <a class="exit_popup popup_close" href="#">&times;</a>
      <div class="exit_popup header_content">
        <img class="exit_popup popup_image" id="exit_popup.header.image" alt="">
      </div>
      <div class="exit_popup content">
        <!-- your content -->
        <div class="exit_popup popup_title"><h1 id="exit_popup.content.header"></h1></div>
        <p class="exit_popup popup_text" id="exit_popup.content.text" text"></p>
        <a class="exit_popup popup_button" id="exit_popup.content.button"></a>
      </div>
    </div>
    <div class="exit_popup popup_signature">
      <p class="popup_signature_text">Powerd with</p>
      <img class="exit_popup popup_signature_image" src= "https://toptab.net/exit-popup/420X268.png" alt="">
    </div>
    <div class="exit_popup popup_warning">
      <p class="popup_warning_text">Don't forget to uncheck Design Mode!</p>
    </div>
  </div>`;
    element.setAttribute('app', 'exit_popup');
    element.setAttribute('popup-visibility', 'hidden');
    element.appendChild(wrapper);
    console.log('doc.getElementsByTagName("body")[0]', document.getElementsByTagName("body")[0]);

    document.getElementsByTagName("body")[0].appendChild(element);
  }
  // initialize CSS values based on options changes
  function initGeneralSetting() {
    rootEl.style.setProperty('--popup-background-color', options.generalDesignSettings.popupBackgroundColor);
    rootEl.style.setProperty('--orig-background-opacity', options.generalDesignSettings.origSiteBackgroundOpac);
    // init colors
    rootEl.style.setProperty('--theme-color', options.themeColor);
  }
  function initCloseButton() {
    rootEl.style.setProperty('--close-button-color', options.closeBtn.closeBtnDetails.CloseBtnFontColor);
    rootEl.style.setProperty('--close-button-font-size', options.closeBtn.closeBtnDetails.CloseBtnFontSize + "px");

    if (options.enableCloseBtn != true) {
      rootEl.style.setProperty('--close-button-display', "none");
    } else {
      rootEl.style.setProperty('--close-button-display', "block");
    }

  };
  function initHeaderImage() {
    updateValue("exit_popup.header.image", options.mainImageDetails.mainImage, "src");
    rootEl.style.setProperty('--image-width', options.mainImageDetails.mainImageWidth + "%");
    if (options.enableImage != true) {
      rootEl.style.setProperty('--image-display', "none");
    } else {
      rootEl.style.setProperty('--image-display', "inline-block");
    }
  }
  function initHeaderSetting() {
    rootEl.style.setProperty('--header-text-size', options.header.headerTextDetails.headerFontSize + "px");
    rootEl.style.setProperty('--header-text-family', options.header.headerTextDetails.headerFontFamily);
    rootEl.style.setProperty('--header-text-color', options.header.headerTextDetails.headerTextColor);
    updateValue("exit_popup.content.header", options.header.headerTextDetails.headerText);

    if (options.enableHeader != true) {
      rootEl.style.setProperty('--header-text-display', "none");
    } else {
      rootEl.style.setProperty('--header-text-display', "block");
    }
  }
  function initBodySetting() {
    rootEl.style.setProperty('--body-text-size', options.body.bodyTextDetails.bodyFontSize + "px");
    rootEl.style.setProperty('--body-text-family', options.body.bodyTextDetails.bodyFontFamily);
    rootEl.style.setProperty('--body-text-color', options.body.bodyTextDetails.bodyTextColor);
    updateValue("exit_popup.content.text", options.body.bodyTextDetails.bodyText)
    if (options.enableBody != true) {
      rootEl.style.setProperty('--body-text-display', "none");
    } else {
      rootEl.style.setProperty('--body-text-display', "block");
    }
  }
  function initButton() {
    rootEl.style.setProperty('--button-background-color', options.btn.btnColor);
    rootEl.style.setProperty('--button-text-color', options.btn.btnTextDetails.btnTextColor);
    rootEl.style.setProperty('--button-text-size', options.btn.btnTextDetails.btnFontSize + 'px');
    rootEl.style.setProperty('--button-text-font-family', options.btn.btnTextDetails.btnFontFamily);

    updateValue("exit_popup.content.button", options.btn.btnLink, "href");
    updateValue("exit_popup.content.button", options.btn.btnTextDetails.btnText);
    if (options.enable_button != true) {
      rootEl.style.setProperty('--button-display', "none");
    } else {
      rootEl.style.setProperty('--button-display', "inline-flex");
    }
    if (options.btn.btnLinkNewTab == true) {
      updateValue("exit_popup.content.button", '_blank', "target");
    } else {
      document.getElementById("exit_popup.content.button").removeAttribute("target");
    }
  }

  function initWarning() {
    if (options.designMode == true) {
      rootEl.style.setProperty('--warning-display', "flex");
    } else {
      rootEl.style.setProperty('--warning-display', "none");
    }
  }
}())
