/**
 * Bind for jQuery on/off Event Interface.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String} eventName - the event name to bind.
 * @param {Function} callback - function bind to event.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bind($elm, eventName, callback) {
  if (typeof $elm.on !== 'function') { throw new Error('$elm is missing the on method from jQuery API.'); }
  if (typeof $elm.off !== 'function') { throw new Error('$elm is missing the off method from jQuery API.'); }
  $elm.on(eventName, callback);

  return function unbind() {
    $elm.off(eventName, callback);
  }
}
module.exports = bind;
