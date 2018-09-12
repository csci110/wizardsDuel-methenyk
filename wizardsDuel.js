import {game, Sprite} from "./sgc/sgc.js";

game.setBackground("floor.png");


class playerWizard extends Sprite{
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.width = 48;
        this.height = 48;
        this.setImage ("marcusSheet.png");
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up",0 ,2);
        this.defineAnimation ("right", 3, 5);
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
    
    handleRightArrowKey(){
        this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 360;
    }
    
    handleLeftArrowKey(){
        this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }
    
    handleGameLoop(){ // Keep Marcus in the display area
        this.y = Math.max(5, this.y); //Keeps the y above 0 
        this.y = Math.min(game.displayHeight - this.height, this.y); //Keeps the y below 552
        this.x = Math.max(0, this.x);
        this.x = Math.min(game.displayWidth - this.width, this.x);
        this.speed = 0;
    }
    
    handleSpacebar(){
        let spell = new Spell();
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.x = this.x;
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
    constructor(){
        super();
        this.speed = 200;
        this.width = 48;
        this.height = 48;
        this.defineAnimation = ("magic", 0, 7);
        this.playAnimation = ("magic", true);
        
    }
    
    handleBoundaryContact() {
    // Delete spell when it leaves display area
    game.removeSprite(this);
}

}
class NonPlayerWizard extends Sprite {
    constructor(){
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation = ("left", 9, 11);
        this.defineAnimation = ("up", 0, 2);
        this.defineAnimation = ("down", 6, 8);
    }
    
}

let stranger = new NonPlayerWizard;
stranger.name = "The mysterious stranger";
stranger.width = 48;
stranger.height = 48;
stranger.setImage("strangerSheet.png");
