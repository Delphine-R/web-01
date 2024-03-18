// TODO #import-html: use ES default imports to import game.html as template
import template from "../views/game.html";

import { parseUrl } from "./utils";
import { Component } from "./component";

const CARD_TEMPLATE = ""
  .concat('<main class="card-cmp">')
  .concat('  <div class="card-wrapper">')
  .concat('    <img class="card front-face" alt="card" />')
  .concat('    <img class="card back-face" alt="card" />')
  .concat("  </div>")
  .concat("</main>");

// TODO #export-functions: remove the IIFE

const environment = {
  api: {
    host: "http://localhost:8081",
  },
};

// TODO #export-functions: export function GameComponent
// TODO #class: use the ES6 class keyword
// TODO #extends: extend Component
/* class GameComponent constructor */
export class GameComponent extends Component{
  constructor() {
    // TODO #extends: call super(template)
    super(template)
    // gather parameters from URL
    let params = parseUrl();

    // TODO #import-html: assign template to this.template
    this.template = template;
    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  init(){
    // fetch the cards configuration from the server
    this.fetchConfig(
      // TODO #arrow-function: use arrow function instead.
      function (config) {
        this._config = config;
        this._boardElement = document.querySelector(".cards");

      // create cards out of the config
      this._cards = [];
      // TODO #functional-programming: use Array.map() instead.
      for (let i in this._config.ids) {
        this._cards[i] = new CardComponent(this._config.ids[i]);
      }

      // TODO #functional-programming: use Array.forEach() instead.
      // TODO #let-const: replace var with let.
      for (let i in this._cards) {
        let card = this._cards[i];

        // TODO #let-const: extract function _appendCard (ie: copy its body here and remove the function)
        this._boardElement.appendChild(card.getElement());
          card.getElement().addEventListener(
            "click",
            function () {
              card.getElement().addEventListener(
                "click",
                function () {
                  this._flipCard(card);
                }.bind(this)
              );
              this._flipCard(card);
            }.bind(this)
          );
      }

        this.start();
      }.bind(this)
    );
    }

  start() {
    this._startTime = Date.now();
    let seconds = 0;
    // TODO #template-literals:  use template literals (backquotes)
    document.querySelector("nav .navbar-title").textContent =
      "Player: " + this._name + ". Elapsed time: " + seconds++;
  
    this._timer = setInterval(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #template-literals:  use template literals (backquotes)
        document.querySelector("nav .navbar-title").textContent =
          "Player: " + this._name + ". Elapsed time: " + seconds++;
      }.bind(this),
      1000
    );
  }

  _flipCard(card) {
    if (this._busy) {
      return;
    }
  
    if (card.flipped) {
      return;
    }
  
    // flip the card
    card.flip();
  
    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...
  
      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;
  
        // reset flipped card for the next turn.
        this._flippedCard = null;
  
        if (this._matchedPairs === this._size) {
          this.goToScore();
        }
      } else {
        this._busy = true;
  
        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          // TODO #arrow-function: use arrow function instead.
          function () {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;
  
            // reset flipped card for the next turn.
            this._flippedCard = null;
          }.bind(this),
          500
        );
      }
    }
  }
  
  fetchConfig(cb) {
    let xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
  
    // TODO #template-literals:  use template literals (backquotes)
    xhr.open("get", environment.api.host + "/board?size=" + this._size, true);
  
    // TODO #arrow-function: use arrow function instead.
    xhr.onreadystatechange = function () {
      let status;
      let data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) {
        // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          cb(data);
        } else {
          throw new Error(status);
        }
      }
    };
    xhr.send();
  }
  
  goToScore() {
    let timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);
  
    setTimeout(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #spa: replace with './#score'
        let scorePage = "./#score";
        // TODO #template-literals:  use template literals (backquotes)
        window.location =
          scorePage +
          "?name=" +
          this._name +
          "&size=" +
          this._size +
          "&time=" +
          timeElapsedInSeconds;
      }.bind(this),
      750
    );
  }
}


// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.

// TODO #class: turn function into a method of GameComponent
/* method GameComponent.init */

// TODO #class: turn function into a method of GameComponent

/* method GameComponent._appendCard */


// TODO #class: turn function into a method of GameComponent
/* method GameComponent.start */


// TODO #class: turn function into a method of GameComponent
/* method GameComponent.fetchConfig */


// TODO #class: turn function into a method of GameComponent
/* method GameComponent.goToScore */ 

// TODO #class: turn function into a method of GameComponent
/* method GameComponent._flipCard */


// TODO #card-component: Change images location to /app/components/game/card/assets/***.png
// TODO #import-assets: use ES default import to import images.
import back from "/src/assets/cards/back.png";
import card0 from "/src/assets/cards/card-0.png";
import card1 from "/src/assets/cards/card-1.png";
import card2 from "/src/assets/cards/card-2.png";
import card3 from "/src/assets/cards/card-3.png";
import card4 from "/src/assets/cards/card-4.png";
import card5 from "/src/assets/cards/card-5.png";
import card6 from "/src/assets/cards/card-6.png";
import card7 from "/src/assets/cards/card-7.png";
import card8 from "/src/assets/cards/card-8.png";
import card9 from "/src/assets/cards/card-9.png";

const CARDS_IMAGE = [
  back,
  card0,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
];

// TODO #class: use the ES6 class keyword
// TODO #extends: extends Component
/* class CardComponent constructor */
class CardComponent extends Component{
  constructor(id){

    super(CARD_TEMPLATE)

    this._flipped = false;
    this.template = CARD_TEMPLATE;

  
    // has the matching card has been discovered already?
    this.matched = false;

  this._elt = document.createElement("div");
  this._elt.innerHTML = this.template;
  this._elt = this._elt.firstElementChild;
  this._id = id;

  this._imageElt = this.getElement().querySelector(".card-wrapper");
  this._imageElt.querySelector("img.front-face").src =
    CARDS_IMAGE[this._id + 1];
  this._imageElt.querySelector("img.back-face").src = CARDS_IMAGE[0];
}

  get flipped() {
    return this._flipped;
  }

  set flipped(value) {
    this._flipped = value;
  }

  getElement() {
    return this._elt;
  }

  flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  }

  equals(card) {
    return card._id === this._id;
  }
  // TODO #extends: call super(CARD_TEMPLATE)
  // is this card flipped?
}

/* method CardComponent.getElement */


// TODO #class: turn function into a method of CardComponent
/* method CardComponent.flip */


// TODO #class: turn function into a method of CardComponent
/* method CardComponent.equals */


// TODO #class: turn function into a method of CardComponent
/* CardComponent.get flipped() */



  


