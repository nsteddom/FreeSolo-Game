demo.state1 = function(){

};

demo.state1.prototype = {
    preload: function(){
        game.load.image('background', 'assets/back3.png');
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.audio('mountain', 'assets/sounds/mountain_top.wav');
        var logo = game.load.image('logo', 'assets/b4.svg', 800, 500)


    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#800080';
        theMusic = game.add.audio('mountain', .2, true)
        theMusic.play();
        game.add.sprite(0, 0, 'background');
        game.add.image(470, 60, 'logo');
        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');
        bird.scale.setTo(0.6,0.6);
        bird.animations.add('all', [0, 1], 4, true);
        

        var style = {font: "bold 20px Arial", align: "right"}
        var style2 = {font: "bold 20px Arial", fill: "#fff", align: "right"}
        


        game.add.text(400,230, "Climb an unforgiving mountain using\nthe arrow keys to move.", style);
        game.add.text(620,320, "Try not to die.", style);
        game.add.text(580,575, "Press 1 to commence", style2);
   
        

        
        


        addChangeStateEventListeners();

    
    },

    update: function(){
        moveBird(bird, 3);
        bird.animations.play('all');

    }
}

function changeState(i, stateNum){
    game.state.start('state' + 0);
    localheight = 0;
    theMusic.pause();
    
    console.log(isAlive);
    if (isAlive){
        levelcount +=1;
    }   
    else{
        levelcount = 1;
        isAlive = true;
    }

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
    bird.y = Math.random() * (game.world.height - 200)
    }
