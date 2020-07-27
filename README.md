[LIVE](https://mashuduek.github.io/DOMesticate/)

# DOMesticate

DOMesticate is a JavaScript library used for DOM manipulation.
The library is used for creating/removing DOM elements, add/remove/toggle elements classes, traverse elements, create/remove listeners, and make ajax reqs.

## API
### Core function
#### $domesticate
```$domesticate()``` is the function we use to wrap HTML elements, to be able to use the libraries functions.
$domesticate can take string and function arguments. If the argument is a string it will query the DOM looking for string CSS selector passed in. If the argument is a function, it will queue it up to the list of callbacks to invoke for once the DOM is loaded. 

### Manipulation of the DOM
#### html
```html()``` will set the innerHTML of ```this``` to argument - if no argument is supplied it will return ```this```'s current innerHTML.
#### empty
```empty()``` will reset the innerHTML of ```this```.
#### append
```append()``` is used to add HTMLElements to the DOM.
#### attr
```attr()``` is used as a getter or setter (depending on arguments passed in) of attributes on a DOM element.
#### addClass & removeClass
These two methods serve to add a class to the list of classes, or remove all classes.
#### remove
```remove()``` will remove the element from the DOM entirely. 

### DOM node traversal
#### children
```children()``` will return a node collection of all inner HTMLElements 
#### parent
```parent()``` will return the parent of a given node element. If multiple elements are selected, parents of all elements will be returned. 
#### find
```find()``` will query the DOM, searching for selector passed in as argument. 

### Event listeners
#### on
```on()``` takes an event type (ex: ```'click'```) as well as a callback to be invoked on event firing.  
#### off
```off()``` takes two optional arguments (eventType and callback), to remove callback associated with that eventType. If no argument is supplied, all events will be toggled off for given node.
### $domesticate.ajax
```$domesticate.ajax()``` takes an options object as argument, and will merge that with the pre-set defaults. This includes the request type "GET".
