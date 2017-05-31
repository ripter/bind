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

### Example issue: Can't use arrow function.
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
  // OOPS! Can't unbind this function from the click event!
});
```

After some reflexion you can solve this issue by assigning the arrow functions to variables, or using named functions.



### Example Fixed: Can use arrow function.
https://codepen.io/ripter/pen/KmOBBa
```
const unbindMouseover = bind(elHover, 'mouseover', () => {
  elHover.classList.add('is-hovering');
});
const unbindMouseout = bind(elHover, 'mouseout', () => {
  elHover.classList.remove('is-hovering');
});

const unbindClick = bind(elButton, 'click', () => {
  unbindMouseover();
  unbindMouseout();
  // We can unbind ourselves!
  unbindClick();
});
```


---
## Mental Complexity

Bind reduces the chance of bugs by reducing the number of [Mental Chunks](https://en.wikipedia.org/wiki/Chunking_(psychology)) the developer has to hold in [working memory](https://en.wikipedia.org/wiki/Working_memory). The average person can hold between 4 and 7 chunks at a time.

### Chunk cost for addEventListener, removeEventListener
* Variables
  * **element** that emits the event.
  * **eventName** the event that should trigger the callback.
  * **callback** The function that should be triggered whenever the event is triggered on the element.
* Code requiring the variables
  * addEventListener
  * removeEventListener

To write either `addEventListener` or `removeEventListener` isolated and alone, has a chuck cost of four. The three variables and the function to be called. That is already at the bottom limit for an average person. Leaving little room for other chunks which could include the problem being solved and placing the matching event method.

Since events need to be written as pairs, the add and remove, the chunk cost is even higher. A developer that has to add a new event handler has to add both functions, which increases the chunk cost to eight. Over the average limit, increasing the chance of introducing a bug.

### Chunk cost for bind, unbind
* Variables
  * **element** that emits the event.
  * **eventName** the event that should trigger the callback.
  * **callback** The function that should be triggered whenever the event is triggered on the element.
* Code requiring the variables
  * bind

To write a bind function, the developer still needs to know the same three variables plus the bind function. Giving us a chunk cost of four.

To write the pair of event functions, the developer only needs a total of five chunks. The original four to create the event binding, then the returned unbind function. This is still safely in the chunk range. The developer can easily free up more chunks because they do no need to hold on to the three variables after creating the event.

## Inspiration:
* [Atom's Disposable](https://github.com/atom/event-kit)
