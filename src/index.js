// Split event names that include a selector
const eventSplitter = /^(\S+)\s*(.*)$/;

/**
 * Bind for jQuery on/off Event Interface.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String|Object} eventName - the event name, or an event object to bind.
 * @param {Function} callback - function bind to event.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bind($elm, eventName, callback) {
  if (typeof $elm.on !== 'function') { throw new Error('$elm is missing the on method from jQuery API.'); }
  if (typeof $elm.off !== 'function') { throw new Error('$elm is missing the off method from jQuery API.'); }

  if (typeof eventName === 'string') {
    return bindNoSelectors($elm, eventName, callback);
  }

  return bindWithSelectors($elm, eventName);
}
module.exports = bind;


/**
 * Bind for jQuery on/off Event Interface.
 * This just binds a single event to a single callback.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String} eventName - the event name to bind.
 * @param {Function} callback - function bind to event.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bindNoSelectors($elm, eventName, callback) {
  $elm.on(eventName, callback);

  return function unbind() {
    $elm.off(eventName, callback);
  }
}

/**
 * Bind for jQuery on/off with selectors
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {Object} events - Object, keys are eventName + selector, value is callback.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bindWithSelectors($elm, events) {
  const unbinds = Object.keys(events).map((rawEventName) => {
    const method = events[rawEventName];
    const matches = rawEventName.match(eventSplitter);
    const eventName = matches[1];
    const selector = matches[2];

    // Selector is optional
    if (selector && selector.length > 0) {
      $elm.on(eventName, selector, method);
      return function unbind() {
        $elm.off(eventName, selector, method);
      };
    }
    else {
      return bindNoSelectors($elm, eventName, method);
    }
  });

  return function unbind() {
    unbinds.forEach((remove) => {
      remove();
    });
  }
}
