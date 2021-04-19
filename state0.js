// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {},  speed = 5, heightClimbed=0, heightClimbedText, HP =1000, HPtext, isAlive = true, layer = null, rocklist=[], levelcount = 1, localheight = 0, layer1, layer2, layer3, sizelist = [], rocklists = [], sizelists = [];

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
        game.load.spritesheet('rock', 'assets/new_rock.png', 60, 60);
        game.load.audio('hitRock', 'assets/sounds/hit_rock_sound_mixdown.mp3');
        game.load.audio('powerUp', 'assets/sounds/464902__plasterbrain__yume-nikki-effect-equip.mp3')
        game.load.audio('death', 'assets/sounds/538151__fupicat__8bit-fall.wav')
        game.load.audio('gameMusic', 'assets/sounds/game_sound.mp3')
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.spritesheet('hpBoost', 'assets/plus_hp.png', 60, 60)
        game.load.spritesheet('bird', 'assets/bird.png', 70, 70);
        game.load.tilemap('base', 'assets/tiles/last.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('banana', 'assets/banana.png', 10, 10);
        game.load.image('person', 'assets/person.png');
        // // game.load.image('rock1', 'assets/tiles/rock1.png')
        // // game.load.image('rock2', 'assets/tiles/rock2.png')
        // // game.load.image('rockObstacle', 'assets/tiles/rockObstacle.png')
        // game.load.image('sky', 'assets/tiles/sky.png')
        // game.load.image('rockTile1', 'assets/tiles/rockTile1.png')
        // game.load.image('rockobstacle', 'assets/tiles/rockobstacle.png')
        // game.load.image('black', 'assets/tiles/black.png')
        game.load.image('cloud', 'assets/tiles/cloud.png')
        game.load.image('sun', 'assets/tiles/sun.png')
        game.load.image('sky1', 'assets/tiles/sky1.png')
        // game.load.image('crack1', 'assets/tiles/crack1.png')
        game.load.image('crack3', 'assets/tiles/crack3.png')
        // game.load.image('circles', 'assets/tiles/circles.png')
        game.load.image('sky', 'assets/tiles/sky.tsx')
        game.load.image('menu', 'assets/menu.png')
        
        




    },


    create: function(){


        var base = game.add.tilemap('base');


        base.addTilesetImage('sky');
        base.addTilesetImage('sky1');
        
        // base.addTilesetImage('rockTile1');
        // base.addTilesetImage('black');
        base.addTilesetImage('cloud');
        base.addTilesetImage('sun');
        // base.addTilesetImage('crack1');
        base.addTilesetImage('crack3');
        // base.addTilesetImage('circles');
        // base.addTilesetImage('rockobstacle');
        
        
        layer1 = base.createLayer('Tile Layer 1');
        layer2 = base.createLayer('Tile Layer 2');
        layer3 = base.createLayer('Tile Layer 3');
        
        
        // base.setCollisionBetween(26, 61, true, 'Tile Layer 2');
        

        // // var rock1 = base.createLayer('rock1');
        // // var rock2 = base.createLayer('rock2');
        // // var rockObstacle = base.createLayer('rockObstacle');
        // var sky = base.createLayer('sky');



        



       
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.add.sprite(0, 0, 'sky');
        // game.add.sprite(120, 300, 'mountain');
        // game.add.sprite(120, 0, 'mountain');
       
        

        waters = game.add.group();
        waters.enableBody = true;
       
        var i = 0;
        while (i < 4) {
            var water = waters.create(Math.random() * (game.world.width- 280) + 120, Math.random()*game.world.height, 'water');
            i++
            
        }

        bananas = game.add.group();
        bananas.scale.setTo(.8, .8);
        bananas.enableBody = true;

        var n = 0;
        while (n < 3) {
            var banana = bananas.create(Math.random() * (game.world.width- 280) + 120, Math.random()*game.world.height, 'banana');
            n++;
        }


        player = game.add.sprite(300, game.world.height, 'climber')

        for (i=0; i<levelcount; i++ ){
            rocklist[i] = game.add.sprite(Math.random() * (game.world.width- 280) + 120, Math.random()*.4*game.world.height , 'rock');
            size = Math.max(Math.random()*2, .4);
            rocklist[i].scale.setTo(size);
            sizelist[i] = size;
        }
        
        // rock1 = game.add.sprite(Math.random() * (game.world.width- 280) + 120,0, 'rock');
        // rock2 = game.add.sprite(Math.random() * (game.world.width- 280) + 120,0, 'rock');

        // rock1.scale.setTo(2,2);
        // rock2.scale.setTo(2,2);

        // for (i =0; i<levelcount; i++){
        //     rocklist[i].scale.setTo(2,2);
        // }

        bird = game.add.sprite(game.world.width, game.world.height - 300, 'bird');
        bird.scale.setTo(0.6,0.6);


        // Added star image in the game for animated aspect. 
        //star = game.add.image(550, game.world.height - 300, 'star')

        
        
        game.physics.enable(player)


        // game.physics.arcade.enable(rock1)
        // game.physics.arcade.enable(rock2)

        
        for (i =0; i<levelcount; i++){
            game.physics.arcade.enable(rocklist[i]);
        }

        
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true;  
     
        

        gameSound = game.add.audio('gameMusic', .4)

        soundEffect = game.add.audio('soundeffect', .3);
        death = game.add.audio('death', .7);
        powerUpSound = game.add.audio('powerUp', .1);
        getHit = game.add.audio('hitRock', .2);

        gameSound.play();
        soundEffect.play();

        
        for (i =0; i<levelcount; i++){
            rocklist[i].animations.add('all', [0, 1, 2], 3, true);

        }

        // rock1.animations.add('all', [0, 1, 2], 3, true);
        // rock2.animations.add('all', [0, 1, 2], 3, true);

        bird.animations.add('all', [0, 1], 4, true);
        player.animations.add('all', [0, 1, 2, 3, 4], 15, true);
      
       

        var style4 = {font: "bold 22px Arial", fill: "#fff"}
        heightClimbedText = game.add.text(0,0, "Height Climbed", style4);
        HPtext = game.add.text(625,0, "HPtext");
        var style3 = {font: "bold 22px Arial"}
        leveltext = game.add.text(710,40, "Level: " + (levelcount-1), style3);
        var button4 = game.add.button(0, 500, 'menu', mainScreen, this);
        
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
        game.physics.arcade.collide(player, layer2, function(){ console.log('SHIT!!!')});
        heightClimbed = Math.max(0, heightClimbed);
        heightClimbed = Math.round(heightClimbed);


        
        // game.physics.arcade.collide(player, ground)

        // Makes star go in a circle
        // star.angle +=3;

        
        for (i =0; i<levelcount; i++){
            rockCenterX = rocklist[i].x+sizelist[i]*65/2 ;
            rockCenterY = rocklist[i].y+sizelist[i]*65/2;
            playerCenterX = player.x + 60/2;
            playerCenterY = player.y + 60/2;

            if (Math.abs(rockCenterX-playerCenterX) < 30 && Math.abs(playerCenterY-rockCenterY) < 30){
                getHit.play();
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
            var style2 = {fill: "#fff", font: "bold 22px Arial"}
            HPtext = game.add.text(700,0, "HP: " + HP.toString(), style2);
            var style = {fill: "#fff", font: "bold 22px Arial"}
            heightClimbedText = game.add.text(0,0, "Distance Climbed: "+ heightClimbed.toString(), style);
        }
        else{
            if (isAlive){
                death.play();
                isAlive = false;
                
                
                
                game.state.restart();
                game.state.start('state3', true, false);

            }
            HPtext.destroy();
            player.destroy();
            var style2 = {fill: "red", font: "bold 22px Arial"};
            HPtext = game.add.text(660,0, "You are dead", style2);

            
        }

        
        if (game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

            if (player.x < game.world.width-160){
                player.x += moveSpeed(speed, HP);
                player.animations.play('all');
                HP -= 0.5
    
            }

            
            
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

            if (player.x > 120 ){
                player.x -= moveSpeed(speed, HP);    
                HP -= 0.5
                player.animations.play('all');

            }

         
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.S) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += moveSpeed(speed, HP);
            player.animations.play('all');
           
            if (localheight < 0){
                heightClimbed = heightClimbed;
            }

            else{
                heightClimbed -= moveSpeed(speed, HP);
                localheight -= moveSpeed(speed, HP);
                HP -= 0.5

            }
               
        }   


        if(game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= moveSpeed(speed, HP);
            player.animations.play('all');

            heightClimbed += moveSpeed(speed, HP); 
            localheight += moveSpeed(speed, HP);   
  
            
            if (localheight > game.world.height-10){
                changeState();


            }
            else{
                HP-=1
            }           
        }

        


        if (!game.input.keyboard.isDown(Phaser.Keyboard.S) && !game.input.keyboard.isDown(Phaser.Keyboard.W)
        && !game.input.keyboard.isDown(Phaser.Keyboard.D) && !game.input.keyboard.isDown(Phaser.Keyboard.A) && !game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !game.input.keyboard.isDown(Phaser.Keyboard.UP)
        && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.frame = 0
            
        }
        
        addChangeStateEventListeners();
  }
    

    }

function changeState(i, stateNum){
        game.state.start('state' + 0, true, false);
        localheight = 0;
        gameSound.pause();
        
        
        console.log(isAlive);
        if (isAlive){
            levelcount +=1;
        }   
        else{
            levelcount = 1;
            isAlive = true;
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
    HP -= 175
}



function drinkWater(player, water) {
    powerUpSound.play()
    water.destroy();
    boost = game.add.sprite(water.x, water.y, 'hpBoost');
    boost.animations.add('all', [0,3,6,1,4,2,5, 7], 7, true);
    boost.play('all')
    HP += 75;
    setTimeout(function(){boost.animations.destroy(); boost.destroy();}, 200);
    
    

}

function eatBanana(player, banana) {

    powerUpSound.play();
    banana.destroy();
    boostB = game.add.sprite(banana.x, banana.y, 'hpBoost');
    boostB.animations.add('all', [0,3,6,1,4,2,5, 7], 7, true);
    boostB.play('all');
    HP += 75;
    setTimeout(function(){boostB.animations.destroy(); boostB.destroy();} , 200);
   
}

function moveSpeed(speed, HP){
    return Math.max(speed*(HP/1000)**2, 0.5*speed);
}



function mainScreen() {
    heightClimbed = 0;
    isAlive = true;
    HP = 1000;
    localheight = 0;
    speed = 5;
    levelcount = 1;
    game.state.start('state1', true, false);
}

