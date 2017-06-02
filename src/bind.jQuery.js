/**
 * bind - listens to event on element, returning a function to stop listening to the event.
 * https://api.jquery.com/on/
 * https://api.jquery.com/off/
 * @param {jQuery} $obj - a jQuery object.
 * @param {String} eventName - Name of the event. Like 'click', or 'did-custom-event'
 * @param {Function} callback - function that will be called every time eventName happens.
 * @return unbind - function that unbinds the callback from the event on element.
 */
function bind($obj, eventName, callback) {
  // remove the $obj from the arguments and make an array
  const args = Array.prototype.slice.call(arguments, 1);

  // Add the event listener
  $obj.on.apply(this, args);

  return function unbind() {
    // remove the event listener
    $obj.off.apply(this, args);
  }
}

// Export it
module.exports = bind;
