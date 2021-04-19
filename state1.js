
demo.state1 = function() {};



demo.state1.prototype = {
    preload: function(){
        game.load.image('background', 'assets/back3.png');
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.audio('mountain', 'assets/sounds/mountain_top.wav');
        game.load.image('htp', "assets/how_to_play.png", 112, 112)
        var logo = game.load.image('logo', 'assets/b4.svg', 800, 500)
        
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
        var button1 = game.add.button(0, -8, 'htp', actionOnClick1, this);
        
        

        addChangeStateEventListeners();
        
    
    },

    update: function(){
        moveBird(bird, 3);
        bird.animations.play('all');

        

    }
}

function actionOnClick1() {
    game.state.start('state2');
    
}


  
function addKeyCallback(key, fn, args){
    
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}
  
function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
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
