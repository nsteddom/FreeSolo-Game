// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {},  speed = 5, heightClimbed=0, heightClimbedText, HP =1000, HPtext, isAlive = true, layer = null, rocklist=[], levelcount = 1, localheight = 0 ;

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
        game.load.audio('backgroundMusic', 'assets/sounds/speck_-_Drum_n_Bird_03_(The_Crowening).mp3');
        game.load.audio('soundeffect', 'assets/sounds/mixkit-meadow-wind-light-1166.wav');
        game.load.audio('deathSound', 'assets/sounds/deathSound.mp3');
        game.load.image('water','assets/Bottle.png');
        game.load.image('mountain', 'assets/mountain.png', 800, 400);
        game.load.spritesheet('climber', 'assets/climber.png', 60, 60);
        game.load.spritesheet('rock', 'assets/rock.png', 60, 65);


        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.tilemap('base', 'assets/tiles/try.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('banana', 'assets/banana.png');
        game.load.image('person', 'assets/person.png');
        // // game.load.image('rock1', 'assets/tiles/rock1.png')
        // // game.load.image('rock2', 'assets/tiles/rock2.png')
        // // game.load.image('rockObstacle', 'assets/tiles/rockObstacle.png')
        game.load.image('sky', 'assets/tiles/sky.png')
        game.load.image('rockTile1', 'assets/tiles/rockTile1.png')
        game.load.image('obstacle', 'assets/tiles/obstacle.png')
        
        




    },


    create: function(){


        var base = game.add.tilemap('base');


        base.addTilesetImage('sky');
        base.addTilesetImage('obstacle');
        base.addTilesetImage('rockTile1');
        
        var base = base.createLayer('Tile Layer 1')
        

        // // var rock1 = base.createLayer('rock1');
        // // var rock2 = base.createLayer('rock2');
        // // var rockObstacle = base.createLayer('rockObstacle');
        // var sky = base.createLayer('sky');



        addChangeStateEventListeners();



        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#800080';

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.add.sprite(0, 0, 'sky');
        // game.add.sprite(120, 300, 'mountain');
        // game.add.sprite(120, 0, 'mountain');
       
        

        waters = game.add.group();
        waters.enableBody = true;
       
        var i = 0;
        while (i < 2) {
            var water = waters.create(250 + (i * 200) + ((Math.random() * 130)), (50 + (i * 150) + (Math.random() * (game.world.height - 200))), 'water');
            i++
            
        }

        bananas = game.add.group();
        bananas.scale.setTo(.8, .8);
        bananas.enableBody = true;

        var n = 0;
        while (n < 1) {
            var banana = bananas.create(250 + (n * 100) + ((Math.random() * 200)), (70 + (Math.random() * (game.world.height - 200))), 'banana');
            console.log('banana')
            n++;
        }


        player = game.add.sprite(300, game.world.height, 'climber')

        for (i=0; i<levelcount; i++ ){
            rocklist[i] = game.add.sprite(Math.random() * (game.world.width- 280) + 120,0, 'rock');
        }
        
        // rock1 = game.add.sprite(Math.random() * (game.world.width- 280) + 120,0, 'rock');
        // rock2 = game.add.sprite(Math.random() * (game.world.width- 280) + 120,0, 'rock');

        // rock1.scale.setTo(2,2);
        // rock2.scale.setTo(2,2);

        for (i =0; i<levelcount; i++){
            rocklist[i].scale.setTo(2,2);
        }

        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');
        bird.scale.setTo(0.6,0.6);


        // Added star image in the game for animated aspect. 
        //star = game.add.image(550, game.world.height - 300, 'star')

        
        
        game.physics.arcade.enable(player)


        // game.physics.arcade.enable(rock1)
        // game.physics.arcade.enable(rock2)

        
        for (i =0; i<levelcount; i++){
            game.physics.arcade.enable(rocklist[i]);
        }

        
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true;  
     
        

        backgroundMusic = game.add.audio('backgroundMusic');

        soundEffect = game.add.audio('soundeffect');
        deathSound = game.add.audio('deathSound');

        backgroundMusic.play();
        soundEffect.play();

        
        for (i =0; i<levelcount; i++){
            rocklist[i].animations.add('all', [0, 1, 2], 3, true);

        }

        // rock1.animations.add('all', [0, 1, 2], 3, true);
        // rock2.animations.add('all', [0, 1, 2], 3, true);

        bird.animations.add('all', [0, 1], 4, true);
        player.animations.add('all', [0, 1, 2, 3, 4], 15, true);
      
       


        heightClimbedText = game.add.text(0,0, "Height Climbed");
        HPtext = game.add.text(625,0, "HPtext");
        leveltext = game.add.text(625,125, "Level: " + levelcount);

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

        heightClimbed = Math.max(0, heightClimbed);
        heightClimbed = Math.round(heightClimbed);


        
        // game.physics.arcade.collide(player, ground)

        // Makes star go in a circle
        // star.angle +=3;

        
        for (i =0; i<levelcount; i++){
            if (Math.abs(player.x-rocklist[i].x) < 27 && Math.abs(player.y-rocklist[i].y) < 50){
                rockCollision();
    
            }
        }

        // if (Math.abs(player.x-rock1.x) < 27 && Math.abs(player.y-rock1.y) < 50){
        //     rockCollision();


        game.physics.arcade.overlap(player, waters, drinkWater, null, this);
        game.physics.arcade.overlap(player, bananas, eatBanana, null, this);
        bird.animations.play('all');

        // }

        // if (Math.abs(player.x-rock2.x) < 27 && Math.abs(player.y-rock2.y) < 50){
        //     rockCollision();

        // }

        


        moveBird(bird, 3);

        for (i =0; i<levelcount; i++){
            moverock(rocklist[i], 1);
        }

        // moverock(rock1, 1);
        // moverock(rock2, 1)

        game.physics.arcade.overlap(player, waters, drinkWater, null, this);

        // rock1.animations.play('all');
        // rock2.animations.play('all');

        for (i =0; i<levelcount; i++){
            rocklist[i].animations.play('all');
        }


        bird.animations.play('all');

        


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

            if (player.x < game.world.width-160){
                player.x += HP*speed/1000;
                player.animations.play('all');
                HP -=1
    
            }

            
            
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

            if (player.x > 120 ){
                player.x -= HP*speed/1000;    
                HP -= 1
                player.animations.play('all');

            }

         
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += HP*speed/1000;
            player.animations.play('all');
           
            if (localheight < 0){
                heightClimbed = heightClimbed;
            }

            else{
                heightClimbed -= HP*speed/1000;
                localheight -= HP*speed/1000;
                HP -= 1

            }
               
        }   


        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= HP*speed/1000;
            player.animations.play('all');

            heightClimbed += HP*speed/1000; 
            localheight += HP*speed/1000;   
  
            
            if (localheight > game.world.height){
                changeState();


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


function moverock(rock, speed) {
    rock.y += speed + rock.y/30;
    if (rock.y > game.world.height) {
        resetrockPos(rock);
    }
    }


    
function resetrockPos(rock) {
    rock.y = 0;
    // var randomY = Math.between(0, game.world.height);
    rock.x = Math.random() * (game.world.width- 280) + 120;
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

function rockCollision(){
    HP -= 300
}



function drinkWater(player, water) {
    water.destroy();
    HP += 250

}

function eatBanana(player, banana) {
    banana.destroy();
    HP += 50;
}




