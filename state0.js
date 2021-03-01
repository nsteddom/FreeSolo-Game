// Level One
// climbs on wall, height bar, sound, music (track sources), one piece of animated art

var demo = {}, speed = 5, heightClimbed=0, text;

demo.state0 = function(){};

demo.state0.prototype = {

    preload: function(){
        
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        //game.load.image('mountain', 'assets/');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)


    },


    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE)

        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'sky');

        
        player = game.add.sprite(32, game.world.height - 150, 'baddie')
        game.physics.enable(player)
        // player.body.gravity.y = 500
        player.body.collideWorldBounds = true   


        
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




