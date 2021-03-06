// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {}, speed = 5, heightClimbed=0, text, map, layer;

demo.state0 = function(){};

demo.state0.prototype = {

    preload: function(){
        

        // Images, Sprites, and Sounds to be used in this scene. 
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        //game.load.image('mountain', 'assets/');
        // game.load.image('sky', 'assets/sky.png');
        // game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('star', 'assets/star.png');
        game.load.audio('music', 'assets/sounds/speck_-_Drum_n_Bird_03_(The_Crowening).mp3');
        game.load.audio('soundeffect', 'assets/sounds/mixkit-meadow-wind-light-1166.wav');
        game.load.image('water','assets/Bottle.png');
        // game.load.image('mountain', 'assets/mountain.png', 800, 400);
        game.load.image('bird', 'assets/Blackbird.gif');
        game.load.tilemap('base', 'assets/tiles/base.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('rockTile1', 'assets/tiles/rockTile1.png')



    },


    create: function(){
        map = game.add.tilemap('base')
        map.addTilesetImage('rockTile1', 'rockTile1');
        layer = map.createLayer('Scene1');





        
        game.physics.startSystem(Phaser.Physics.ARCADE)

        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.add.sprite(0, 0, 'sky');
        // game.add.sprite(200, 300, 'mountain');
        // game.add.sprite(200, 0, 'mountain');
        game.add.sprite(300, 200, 'water');
        

        // Added star image in the game for animated aspect. 
        star = game.add.image(550, game.world.height - 300, 'star')
        bird = game.add.image(550, game.world.height - 300, 'bird')

        
        player = game.add.sprite(300, game.world.height - 150, 'baddie')
     
        game.physics.enable(player)
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true;  

        backgroundMusic = game.add.audio('music');

        soundEffect = game.add.audio('soundeffect');

        backgroundMusic.onDecoded.add(start, this);


        // backgroundMusic.play();
        // soundEffect.play();


        
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
        moveStar(bird, 1);

        
        text.destroy();
      
        text = game.add.text(0,0, "Distance Climbed: "+ heightClimbed.toString());
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            player.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.x -= speed;
            
        }
        else{
            player.frame = 0;
        
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= speed;
            heightClimbed += speed;    
            if (heightClimbed > game.world.height){
                heightClimbed = game.world.height;
            }
        }

        
        else if  (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += speed;
            heightClimbed -= speed;
            if (heightClimbed < 0){
                heightClimbed = 0;
            }
                


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


function moveStar(star, speed) {
    star.x += speed;
    if (star.x > game.world.width) {
        resetStarPos(star);
    }
    }

function resetStarPos(star) {
    star.x = 0;
    var randomY = Math.random() * game.world.height;
    star.y = randomY
    }

function start() {
    backgroundMusic.fadeIn(4000);
}




