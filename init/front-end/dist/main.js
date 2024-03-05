/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/app/scripts/router.js
// TODO #export-router: remove this IIFE

/**
 * Append an html template to the document, at the given outlet.
 * @param HTMLElement outlet the location on the document to add the template
 * @param HTMLElement template the template to append
 */
function renderTemplate(outlet, template) {
  // TODO #spa: use the DOM API to remove all childNodes of the outlet element
  // TODO #spa: use the DOM API to append the 'template' element as a child of the 'outlet' element
    while (outlet.lastChild) {
      outlet.removeChild(outlet.lastChild);
  }
  outlet.appendChild(template);
}

/**
 * Create a new router. This router will load components into the given outlet.
 * @param {HTMLElement} outlet The element to put components into.
 */
// TODO #export-router: export this function

function Router(outlet) {
  this._components = {};
  this._templates = {};
  this._outlet = outlet;

  window.addEventListener("beforeunload", (event) =>
    this._onLocationChanged()
  );
  window.addEventListener("hashchange", (event) =>
    this._onLocationChanged(event.newURL)
  );
}
// TODO #export-router: remove this assignation


/**
 * Bind a component ot be displayed when the registered URL is reached.
 * @param hash
 * @param componentEntry
 * @returns {Router}
 */
Router.prototype.register = function (hash, componentEntry) {
  var path = `#${hash}`;
  if (!componentEntry) {
    throw new TypeError(
      `provided arg should be a Component. Got: ${componentEntry}`
    );
  }

  if (typeof hash !== "string") {
    throw new TypeError(
      `provided route url should be a string. Got: ${hash}`
    );
  } else {
    this._components[path] = componentEntry;
  }

  if (componentEntry.templateUrl) {
    if (!this._templates[componentEntry.templateUrl]) {
      this._templates[componentEntry.templateUrl] = true;
      var _this = this;
      _fetchTemplate(componentEntry.templateUrl, function (template) {
        componentEntry.template = template;
        if (_getRouteHash(window.location.href) === path) {
          _this._renderComponent(_this._components[path]);
        }
      });
    } else if (_getRouteHash(window.location.href) === path) {
      _this._renderComponent(_this._components[path]);
    }
  } else {
    if (_getRouteHash(window.location.href) === path) {
      this._renderComponent(this._components[path]);
    }
  }

  return this;
};

Router.prototype._renderComponent = function (componentEntry) {
  var component = new componentEntry.component();

  var outlet = this._outlet;

  var element = document.createElement("template");
  element.innerHTML =
    componentEntry.template ||
    component.template ||
    (component.getTemplate && component.getTemplate());

  renderTemplate(outlet, element.content.cloneNode(true));
  if (typeof component.init === "function") {
    component.init();
  }
};

Router.prototype._onLocationChanged = function (loc) {
  if (!loc) {
    return;
  }

  var path = _getRouteHash(loc);
  var componentEntry = this._components[path];

  if (componentEntry) {
    this._renderComponent(componentEntry);
  } else if (loc.startsWith(window.location.origin)) {
    console.warn(
      `navigated to "${loc}, but no component was registered at this address"`
    );
  }
};

function _getRouteHash(url) {
  return new URL(url).hash.split("?")[0] || "#";
}

function _fetchTemplate(templateUrl, cb) {
  var xhr =
    typeof XMLHttpRequest != "undefined"
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");

  xhr.open("get", templateUrl, true);

  xhr.onreadystatechange = function () {
    var status;
    var data;
    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
    if (xhr.readyState == 4) {
      // `DONE`
      status = xhr.status;
      if (status == 200) {
        data = xhr.responseText;
        cb(data);
      } else {
        throw new Error(status);
      }
    }
  };
  xhr.send();
}

;// CONCATENATED MODULE: ./src/app/scripts/welcome.js
// TODO #import-html: use ES default imports to import welcome.html as template
// TODO #export-functions: remove the IIFE

// TODO #export-functions: export function WelcomeComponent
// TODO #class: use the ES6 class keyword
/* class WelcomeComponent constructor  */
function WelcomeComponent() {
  // TODO #extends: call super(template)
  // TODO #import-html: assign template to this.template
}

// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.

// TODO #class: turn function into a method of WelcomeComponent
/* method WelcomeComponent.init */
WelcomeComponent.prototype.init = function init() {
  var form = document.querySelector("form.form-signin");

  form.addEventListener(
    "submit",
    // TODO #arrow-function: use arrow function instead.
    function (event) {
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        var name = event.srcElement.querySelector("#nickname").value;
        var size = parseInt(event.srcElement.querySelector("#size").value);

        _startGame(name, size);
      }
    }.bind(this),
    false
  );

  return this;
};

// TODO #class: turn function into a method of WelcomeComponent
function _startGame(name, size) {
  // TODO #spa: replace with './#game'
  var gamePage = "./#game";
  // TODO #template-literals:  use template literals (backquotes)
  window.location = gamePage + "?name=" + name + "&size=" + size;
}


;// CONCATENATED MODULE: ./src/app/scripts/utils.js
// TODO #export-functions: export function parseUrl
function parseUrl(url = window.location.href) {
  var query = url.split("?")[1] || "";
  var result = {};

  var parts = query.split("&");
  // TODO #functional-programming: Use Array.map() & Array.reduce()
  for (var i in parts) {
    var item = parts[i];
    var kv = item.split("=");
    result[kv[0]] = kv[1];
  }

  return result;
}

;// CONCATENATED MODULE: ./src/app/scripts/score.js
// TODO #import-html: use ES default imports to import game.html as template
// TODO #export-functions: remove the IIFE

// TODO #export-functions: export function ScoreComponent
// TODO #class: use the ES6 class keyword
/* class ScoreComponent constructor */


function ScoreComponent() {
  // TODO #extends: call super(template)
  var params = parseUrl();
  // TODO #import-html: assign template to this.template
  this.name = params.name;
  this.size = parseInt(params.size);
  this.time = parseInt(params.time);
}

// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.

// TODO #class: turn function into a method of ScoreComponent
/* method ScoreComponent.init */
ScoreComponent.prototype.init = function init() {
  document.getElementById("name").innerText = this.name;
  document.getElementById("size").innerText = this.size;
  document.getElementById("time").innerText = this.time;
};


;// CONCATENATED MODULE: ./src/main.js
// TODO #import-router: use ES named imports to import the router


// TODO #import-components: use ES named imports to import WelcomeComponent, GameComponent a ScoreComponent




// TODO #import-css: use ES side-effect imports to import styles/style.css


const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);
router
  .register("", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/welcome.html",
  })
  .register("welcome", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/welcome.html",
  })
  .register("game", {
    component: GameComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/game.html",
  })
  .register("score", {
    component: ScoreComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/score.html",
  });

/******/ })()
;