// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {},  speed = 5, heightClimbed=0, text;

demo.state0 = function(){};


demo.state0.prototype = {

    preload: function(){
        

        // Images, Sprites, and Sounds to be used in this scene. 
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        //game.load.image('mountain', 'assets/');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('star', 'assets/star.png');
        game.load.audio('music', 'assets/speck_-_Drum_n_Bird_03_(The_Crowening).mp3');
        game.load.audio('soundeffect', 'assets/mixkit-meadow-wind-light-1166.wav')
        game.load.image('water','assets/Bottle.png');
        game.load.image('mountain', 'assets/mountain.png', 800, 400);
        game.load.spritesheet('climber', 'assets/climber.png', 60, 60);
        game.load.spritesheet('rock', 'assets/rock.png', 60, 65);
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);




    },


    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE)

        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(120, 300, 'mountain');
        game.add.sprite(120, 0, 'mountain');
       
        

        waters = game.add.group();
        waters.enableBody = true;
       

        for (i = 0; i < 6; i++) {
            var water = waters.create(250 + i * 50, 50 + 80 * i, 'water');
            
        }

        player = game.add.sprite(300, game.world.height - 150, 'climber')
        rock = game.add.sprite(350, 0, 'rock');
        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');

        // Added star image in the game for animated aspect. 
        //star = game.add.image(550, game.world.height - 300, 'star')

        
        
        game.physics.arcade.enable(player)
        game.physics.arcade.enable(rock)
        
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true;  
     
        

        backgroundMusic = game.add.audio('music');

        soundEffect = game.add.audio('soundeffect');

        backgroundMusic.play();
        soundEffect.play();

        rock.animations.add('all', [0, 1, 2], 3, true);
        bird.animations.add('all', [0, 1], 4, true);
        player.animations.add('all', [0, 1, 2, 3, 4], 15, true);
      
       


        text = game.add.text(0,0, "Height Climbed")
        

        // platforms = game.add.group()
        // platforms.enableBody = true

        // var ground = platforms.create(0, game.world.height - 64, 'ground')
        // ground.scale.setTo(2, 2)
        // ground.body.immovable = true

        // ground = game.add.sprite(0, game.world.height - 64, 'ground')
        // game.physics.enableBody = true
        // ground.scale.setTo(2, 2)
        // ground.body.immovable = true

    },



    update: function(){
        
        // game.physics.arcade.collide(player, ground)

        // Makes star go in a circle
        // star.angle +=3;
        moveBird(bird, 3);
        moveRock(rock, 1);

        
        text.destroy();
      
        text = game.add.text(0,0, "Distance Climbed: "+ heightClimbed.toString());
        game.physics.arcade.overlap(player, waters, drinkWater, null, this);
        rock.animations.play('all');
        bird.animations.play('all');
        

        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            player.x += speed;
            player.animations.play('all');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.x -= speed;
            player.animations.play('all');
            
        }
        

        else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= speed;
            player.animations.play('all');
            heightClimbed += speed;    
            
            if (heightClimbed > game.world.height){
                heightClimbed = game.world.height;
            }
            
        }

        
        else if  (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += speed;
            player.animations.play('all');
            heightClimbed -= speed;
           
            if (heightClimbed < 0){
                heightClimbed = 0;
            }
            
            

        }
        else{
            player.frame = 0;
        }
        
        
  }
    

    }
function changeState(i, stateNum){
    console.log('state' + stateNum);
    game.state.start('state' + stateNum);
    }


function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
    }
    

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    
    }


function moveRock(rock, speed) {
    rock.y += speed + rock.y/42;
    if (rock.y > game.world.height) {
        resetRockPos(rock);
    }
    }
    
function resetRockPos(rock) {
    rock.y = 0;
    // var randomY = Math.between(0, game.world.height);
    rock.x = Math.random() * game.world.width
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

function rockKills(player, rocks) {
    player.destroy();
    moveRock(rocks, speed);
    
}

function drinkWater(player, water) {
    water.destroy();
}




