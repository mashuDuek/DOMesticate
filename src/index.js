// const DomNodeHandles = require('./dom_node_handles.js')
const docReadyCallbacks = [];
let docReady = false;

window.$domesticate = function(arg) {
  switch (typeof arg) {
    case "function":
      return registerCallback(arg);
    case "string":
      return nodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomNodeHandles([arg]);
      }
  }
};

$domesticate.extend = function(base, ...otherObjs) {
  otherObjs.forEach(function(obj) {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$domesticate.ajax = function(options) {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: function() {},
    error: function() {},
    data: {},
  };

  options = $domesticate.extend(defaults, options);
  options.method = options.method.toUpperCase();
  
  if (options.method === "GET") {
    options.url += `?${stringToQuery(options.data)}`;
  }
  
  request.open(options.method, options.url, true);
  request.onload = function() {
    // Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

// helper
function stringToQuery (obj) {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
}

// helper
function registerCallback (func) {
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    func();
  }
}

// helper
function nodesFromDom (selector) {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeHandles(nodesArray);
}

// setup listeners/callbacks once doc is ready
document.addEventListener('DOMContentLoaded', function() {
  docReady = true;
  docReadyCallbacks.forEach(func => func());
});
