import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("floor.png");


class playerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.width = 48;
        this.height = 48;
        this.setImage("marcusSheet.png");
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.speedWhenWalking = 100;
    }

    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }

    handleRightArrowKey() {
        this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 360;
    }

    handleLeftArrowKey() {
        this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }

    handleGameLoop() { // Keep Marcus in the display area
        this.y = Math.max(5, this.y); //Keeps the y above 0 
        this.y = Math.min(game.displayHeight - this.height, this.y); //Keeps the y below 552
        this.x = Math.max(0, this.x);
        this.x = Math.min(game.displayWidth - this.width, this.x);
        this.speed = 0;
    }

    handleSpacebar() {
        let spell = new Spell();
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.x = this.x + this.width;
        spell.y = this.y;
        spell.angle = 0;
        this.playAnimation("right");

    }

}

let marcus = new playerWizard();
marcus.name = "Marcus the Wizard";
marcus.width = 48;
marcus.height = 48;
marcus.setImage("marcusSheet.png");


class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.width = 48;
        this.height = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);

    }

    handleBoundaryContact() {
        // Delete spell when it leaves display area
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
       // Compare images so Stranger's spells don't destroy each other.
        if (this.getImage() !== otherSprite.getImage()) {
      // Adjust mostly blank spell image to vertical center.
             let verticalOffset = Math.abs(this.y - otherSprite.y);
        if (verticalOffset < this.height / 2) {
             game.removeSprite(this);
            new Fireball(otherSprite);
            }
        }
        return false;
    }

}
class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("down", 6, 8);
        this.playAnimation("down", true);
    }

    handleGameLoop() {
        if (this.y <= 0) {
            // Upward motion has reached top, so turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down", true);
        }
        if (this.y >= game.displayHeight - this.height) {
            // Downward motion has reached bottom, so turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up", true);
        }
    }

    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }


}

let stranger = new NonPlayerWizard();

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "A ball of fire";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");

    }
}
