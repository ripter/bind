# bind
The goal is to provide a consistent interface for adding/removing, start/stop, bind/unbind, event listeners.

```
// Bind/Listen to an event emitted by obj
const unbind = bind(obj, eventName, callback);

// Unbind/Stop Listening to event created with bind
unbind();
```

## Why?
Let's look at a common issue with `addEventListener` and `removeEventListener`. You want to listen to events on an element for a while, and then cleanup and stop listening to the event.

With `addEventListener` and `removeEventListener` you must keep a reference to your callback. if you do not, then you can not call `removeEventListener`.

Example issue: Can't use arrow function.
https://codepen.io/ripter/pen/jmgNKN
```
// hover over
elHover.addEventListener('mouseover', () => {
  elHover.classList.add('is-hovering');
});
// hover out
elHover.addEventListener('mouseout', () => {
  elHover.classList.remove('is-hovering');
});

// stop listening to hover events
elButton.addEventListener('click', () => {
  // OOPS! We don't have a reference to our arrow functions.
  elHover.removeEventListener('mouseover', /*need function reference here */);
  elHover.removeEventListener('mouseout', /*need function reference here */);
});
```
