import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

import Score from './Score';

import PowerUp from './PowerUp';
import { SVG_NS, KEYS, PaddleOptions } from "../settings";

export default class Game {

  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.megaPongArray = [];

    this.ball = new Ball(8, this.width, this.height, 'magenta');
    this.powerUp = new PowerUp(6, this.width, this.height, 'orange');


    this.player1 = new Paddle(
      this.height, // board height
      PaddleOptions.paddleWidth, 
      PaddleOptions.paddleHeight,
      PaddleOptions.boardGap,
      ((this.height - PaddleOptions.paddleHeight) / 2),
      'skyblue',
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(
      this.height, // board height
      PaddleOptions.paddleWidth, 
      PaddleOptions.paddleHeight,
      this.width - (PaddleOptions.boardGap + PaddleOptions.paddleWidth), 
      ((this.height - PaddleOptions.paddleHeight) / 2),
      'coral',
      KEYS.up,
      KEYS.down
    );

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener('keydown', event => {
      switch(event.key){
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });

  }// end of constructor

  megaPong(){
    // spawn tons of pong balls
  }

  render() {

    if(this.pause){
      return;
    }

    this.gameElement.innerHTML = ''; // clear the html before appending to fix a render bug 🐞
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    
    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg, this.player1, this.player2);
    // could use an array of new Ball objects
    // use array.forEach() to render each ball

    this.powerUp.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

  }
}
