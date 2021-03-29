demo.state1 = function(){

};

demo.state1.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);


    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#800080';
        game.add.sprite(0, 0, 'sky');
        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');
        bird.scale.setTo(0.6,0.6);
        bird.animations.add('all', [0, 1], 4, true);
        



        game.add.text(0,0,"Welcome to FreeSolo!");
        game.add.text(0,50, "Climb an unforgiving mountain using the arrow keys to move.");
        game.add.text(0,100, "Be careful with your HP and make sure it doesn't drop to zero!");
        game.add.text(0,150, "Press 1 to start!");




        addChangeStateEventListeners();

        game.add.text()

    },

    update: function(){
        moveBird(bird, 3);
        bird.animations.play('all');

    }
}

function changeState(i, stateNum){
    game.state.start('state' + 0);
  }
  
  function addKeyCallback(key, fn, args){
    
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
  }
  
  function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
  }
  
  function moveBird(bird, speed) {
    bird.x -= speed;
    if (bird.x < 0) {
        resetBirdPos(bird);
    }
    }
function resetBirdPos(bird) {
    bird.x = game.world.width;
    // var randomY = Math.between(0, game.world.height);
    bird.y = Math.random() * game.world.height
    }