(function () {
  var options = INSTALL_OPTIONS
  var element;
  var elements = {}
  var prevElements = {}

  // element = INSTALL.createElement(block.location);
  // elements[locationHash] = element;

  console.log("options.message:",options.message);

  window.onbeforeunload = function (e) {
// Your logic to prepare for 'Stay on this Page' goes here

    return "Please click 'Stay on this Page' and we will give you candy";
};

})()
