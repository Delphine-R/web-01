// TODO #import-html: use ES default imports to import game.html as template
import { Component } from "./component";
import template from "../views/score.html";
// TODO #export-functions: remove the IIFE

// TODO #export-functions: export function ScoreComponent
// TODO #class: use the ES6 class keyword
/* class ScoreComponent constructor */
import { parseUrl } from "./utils";

export class ScoreComponent extends Component {
  constructor(){
    super(template)
    // TODO #extends: call super(template)
    var params = parseUrl();
    // TODO #import-html: assign template to this.template
    this.template = template;
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }
  init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  }

}

// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.


// TODO #class: turn function into a method of ScoreComponent
/* method ScoreComponent.init */


