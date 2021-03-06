/**
 * bind - listens to event on element, returning a function to stop listening to the event.
 * @param {EventTarget} element - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @param {String} eventName - Name of the event. Like 'click', or 'did-custom-event'
 * @param {Function} callback -
 * @return unbind - function that unbinds the callback from the event on element.
 */
function bind(element, eventName, callback) {
  element.addEventListener(eventName, callback);

  return function unbind() {
    element.removeEventListener(eventName, callback);
  };
}

// Exports
module.exports = bind;
