// Split event names that include a selector
const eventSplitter = /^(\S+)\s*(.*)$/;

/**
 * Bind for jQuery on/off Event Interface.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String|Object} eventName - the event name, or an event object to bind.
 * @param {Function} callback - function bind to eventName.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bind($elm, eventName, callback) {
  if (typeof $elm.on !== 'function') { throw new Error('$elm is missing the on method from jQuery API.'); }
  if (typeof $elm.off !== 'function') { throw new Error('$elm is missing the off method from jQuery API.'); }

  if (typeof eventName === 'string') {
    return bindjQuery($elm, eventName, callback);
  }

  // eventName is an eventObject
  const unbindArray = Object.keys(eventName).map((rawEventName) => {
    const method = eventName[rawEventName];
    return bindjQuery($elm, rawEventName, method);
  });

  // return a function that unbind the entire eventObject
  return function unbind() {
    unbindArray.forEach((remove) => {
      remove();
    });
  };
}
module.exports = bind;


/**
 * Bind for jQuery on/off Event Interface.
 * This just binds a single event to a single callback.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String} eventNameOptionalSelector - the event name to bind with optional selector.
 * @param {Function} callback - function bind to event.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bindjQuery($elm, eventNameOptionalSelector, callback) {
  if (typeof callback !== 'function') { throw new Error('callback must be a function'); }
  const matches = eventNameOptionalSelector.match(eventSplitter);
  const eventName = matches[1];
  const selector = matches[2];
  let args;

  // Selector is optional
  if (selector && selector.length > 0) {
    args = [eventName, selector, callback];
  }
  else {
    args = [eventName, callback];
  }

  // bind the event
  $elm.on.apply($elm, args);

  // return an unbind function.
  return function unbind() {
    $elm.off.apply($elm, args);
  };
}
