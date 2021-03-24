// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {},  speed = 5, heightClimbed=0, heightClimbedText, HP =1000, HPtext, isAlive = true ;

demo.state0 = function(){};


demo.state0.prototype = {

    preload: function(){
        

        // Images, Sprites, and Sounds to be used in this scene. 
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('mountain', 'assets/');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('star', 'assets/star.png');
        game.load.audio('music', 'assets/sounds/speck_-_Drum_n_Bird_03_(The_Crowening).mp3');
        game.load.audio('soundeffect', 'assets/sounds/mixkit-meadow-wind-light-1166.wav');
        game.load.audio('deathSound', 'assets/sounds/deathSound.mp3');
        game.load.image('water','assets/Bottle.png');
        game.load.image('mountain', 'assets/mountain.png', 800, 400);
        game.load.spritesheet('climber', 'assets/climber.png', 60, 60);
        game.load.spritesheet('rock1', 'assets/rock.png', 60, 65);
        game.load.spritesheet('rock2', 'assets/rock.png', 60,65);
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.tilemap('base', 'assets/tiles/try.json', null, Phaser.Tilemap.TILED_JSON);
        // // game.load.image('rock1', 'assets/tiles/rock1.png')
        // // game.load.image('rock2', 'assets/tiles/rock2.png')
        // // game.load.image('rockObstacle', 'assets/tiles/rockObstacle.png')
        game.load.image('sky', 'assets/tiles/sky.png')
        
        




    },


    create: function(){

        var base = game.add.tilemap('base');
        var layer = base.createLayer('Tile Layer 1')
        // // base.addTilesetImage('rock1');
        // // base.addTilesetImage('rock2');
        // // base.addTilesetImage('rockObstacle');
        base.addTilesetImage('sky', 'sky', 32, 32, 0, 0);
        

        // // var rock1 = base.createLayer('rock1');
        // // var rock2 = base.createLayer('rock2');
        // // var rockObstacle = base.createLayer('rockObstacle');
        // var sky = base.createLayer('sky');






        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#800080';

        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.add.sprite(0, 0, 'sky');
        // game.add.sprite(120, 300, 'mountain');
        // game.add.sprite(120, 0, 'mountain');
       
        

        waters = game.add.group();
        waters.enableBody = true;
       

        for (i = 0; i < 6; i++) {
            var water = waters.create(250 + i * 50, 50 + 80 * i, 'water');
            
        }

        player = game.add.sprite(300, game.world.height - 150, 'climber')
        rock1 = game.add.sprite(350, 0, 'rock1');
        rock2 = game.add.sprite(350,0, 'rock2');
        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');
        bird.scale.setTo(0.6,0.6);


        // Added star image in the game for animated aspect. 
        //star = game.add.image(550, game.world.height - 300, 'star')

        
        
        game.physics.arcade.enable(player)
        game.physics.arcade.enable(rock1)
        game.physics.arcade.enable(rock2)

        
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true;  
     
        

        backgroundMusic = game.add.audio('music');

        soundEffect = game.add.audio('soundeffect');
        deathSound = game.add.audio('deathSound');

        deathSound = game.add.audio('deathSound');

        backgroundMusic.play();
        soundEffect.play();

        rock1.animations.add('all', [0, 1, 2], 3, true);
        rock2.animations.add('all', [0, 1, 2], 3, true);

        bird.animations.add('all', [0, 1], 4, true);
        player.animations.add('all', [0, 1, 2, 3, 4], 15, true);
      
       


        heightClimbedText = game.add.text(0,0, "Height Climbed")
        HPtext = game.add.text(625,0, "HPtext")

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
        moverock1(rock1, 1);
        moverock2(rock2, 1)

        game.physics.arcade.overlap(player, waters, drinkWater, null, this);
        rock1.animations.play('all');
        rock2.animations.play('all')
        bird.animations.play('all');
        

        if (Math.abs(player.x-rock1.x) < 25 && Math.abs(player.y-rock1.y) < 25){
            rock1Collision();

        }

        if (Math.abs(player.x-rock2.x) < 25 && Math.abs(player.y-rock2.y) < 25){
            rock2Collision();

        }

        if (HP >= 0){
            HPtext.destroy();
            heightClimbedText.destroy();

            HPtext = game.add.text(600,0, "HP: " + HP.toString());
            heightClimbedText = game.add.text(0,0, "Distance Climbed: "+ heightClimbed.toString());
        }
        else{
            if (isAlive){
                deathSound.play();
                isAlive = false;
                backgroundMusic.pause();
                soundEffect.pause();
            }
            HPtext.destroy();
            player.destroy();

            HPtext = game.add.text(600,0, "You are dead");
            
        }

        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            player.x += speed;
            player.animations.play('all');
            HP -=1

            
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.x -= speed;    
            HP -= 1
            
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += speed;
            player.animations.play('all');
            heightClimbed -= speed;
           
            if (heightClimbed < 0){
                heightClimbed = 0;
            }

            else{
                HP-=1
            }
               
        }   


        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= speed;
            player.animations.play('all');
            heightClimbed += speed;    
  
            
            if (heightClimbed > game.world.height){
                heightClimbed = game.world.height;


            }
            else{
                HP-=1
            }           
        }

        


        if (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !game.input.keyboard.isDown(Phaser.Keyboard.UP)
        && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.frame = 0

        }
        
        
  }
    

    }


function moverock1(rock1, speed) {
    rock1.y += speed + rock1.y/30;
    if (rock1.y > game.world.height) {
        resetrock1Pos(rock1);
    }
    }

function moverock2(rock1, speed) {
    rock1.y += speed + rock1.y/30;
    if (rock1.y > game.world.height) {
        resetrock2Pos(rock1);
    }
    }
    
function resetrock1Pos(rock1) {
    rock1.y = 0;
    // var randomY = Math.between(0, game.world.height);
    rock1.x = Math.random() * game.world.width
    }

function resetrock2Pos(rock1) {
    rock1.y = 0;
    // var randomY = Math.between(0, game.world.height);
    rock1.x = Math.random() * game.world.width
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

function rock1Collision(){
    HP -= 175
}

function rock2Collision(){
    HP -= 175
}

function rock1Kills(player, rock1s) {
    player.destroy();
    moverock1(rock1s, speed);
    
}

function drinkWater(player, water) {
    water.destroy();
    HP += 250

}




