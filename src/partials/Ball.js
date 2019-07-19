import { SVG_NS } from "../settings";

export default class Ball {
    constructor(radius, boardWidth, boardHeight, colour = 'white') {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;
      this.colour = colour;

      this.reset();
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.ax = 0.3;

        this.vy = 0;
        while(this.vy === 0){
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        // console.log("vy", this.vy);
        this.vx = this.direction * (6 - Math.abs(this.vy));
        // console.log("vx", this.vx);
    }

    wallCollision(){
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if(hitLeft || hitRight){
            // this.vx = -this.vx;
            this.vx *= -1;
        } else if(hitTop || hitBottom){
            this.vy *= -1;
        }
    }

    paddleCollision(player1, player2) {
        // moving right

        // console.log("player1", player1);
        // console.log("player2", player2);

        if (this.vx > 0) {
          // collision detection for right paddle
          if(this.x + this.radius >= player2.x && // right edge of the ball is >= left edge of the paddle
            this.x + this.radius <= player2.x + player2.width && // right edge of the ball is <= right edge of the paddle
            (this.y >= player2.y && this.y <= player2.y + player2.height) // ball Y is >= paddle top Y and <= paddle bottom Y
            ){
              // if true then there's a collision  
              this.vx *= -1;

              player2.height -= 5;

            let playerColour = player2.colour;
            player2.colour = 'red';
            //   change the color
              setTimeout(function(){
                // reset the color
                player2.colour = playerColour;
              }, 200);

          }
        } else {
            // moving left
          if(this.x - this.radius <= player1.x + player1.width &&
             this.x - this.radius >= player1.x &&
             (this.y >= player1.y && this.y <= player1.y + player1.height)
            ){
            this.vx *= -1;
            let playerColour = player1.colour;
            player1.colour = 'red';
            //   change the color
              setTimeout(function(){
                // reset the color
                player1.colour = playerColour;
              }, 200);

          }
        }
      }

      goal(player){
        player.score++;
        this.reset();
        console.log(player);
      }

    render(svg, player1, player2){
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2);

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'fill', this.colour);
        svg.appendChild(circle);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;

        if(rightGoal){
            this.goal(player1);
            this.direction = 1;
        } else if(leftGoal){
            this.goal(player2);
            this.direction = -1;
        }

    }
  }