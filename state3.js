demo.state3 = function() {};

demo.state3.prototype = {
    preload: function() {
        game.load.spritesheet('menu', "assets/menu_end.png", 112, 112);
        game.load.spritesheet('playAgain', "assets/play_again.png", 112, 112);
        game.load.spritesheet('rock2', "assets/new_rock.png", 60, 60);
        game.stage.backgroundColor = '#FFF';
        game.load.image('block', 'assets/block.png', 450, 350);

        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        var grd=myBitmap.context.createLinearGradient(0,0,0,500);
        grd.addColorStop(0,"#000");
        grd.addColorStop(1,"#1b2366");
        myBitmap.context.fillStyle=grd;
        myBitmap.context.fillRect(0,0,this.game.width, this.game.height);
        var lol = this.game.add.sprite(0,0, myBitmap);
        lol.alpha = 0;
        this.game.add.tween(lol).to({ alpha: 1 }, 2000).start();


        for (i=0; i<10; i++ ){
            rocklists[i] = game.add.sprite(Math.random() * (game.world.width), Math.random()*.4*game.world.height , 'rock2');
            sizes = Math.max(Math.random()*2, .4);
            rocklists[i].scale.setTo(sizes);
            sizelists[i] = sizes;
            game.physics.arcade.enable(rocklists[i]);
            rocklists[i].animations.add('all', [0, 1, 2, 3], 4, true);

        }
        var rectangle = game.add.image(180, 80, 'block')
        endStyle = {font: 'bold 25px Arial', align: 'center'}
        game.add.text(260, 220, 'Height Reached: ' + heightClimbed, endStyle)
        var button2 = game.add.button(300, 400, 'menu', goToMain, this, 0, 1);
        var button3 = game.add.button(420,400, 'playAgain', startGame, this, 0, 1);
        

    },

    update: function() {

       
        for (i =0; i<10; i++){
            rocklists[i].animations.play('all');
            
        }

        for (i = 0; i < 10; i++){
            moverock(rocklists[i], 1);
        }
    }
}

function goToMain() {
    heightClimbed = 0;
    isAlive = true;
    HP = 1000;
    localheight = 0;
    speed = 5;
    levelcount = 1;
    gameSound.pause();
    game.state.start('state1');
}

function startGame() {
    heightClimbed = 0;
    isAlive = true;
    HP = 1000;
    localheight = 0;
    speed = 5;
    levelcount = 1;
    this.game.state.start('state0', true, false);
}

function moverock(rocks, speed) {
    rocks.y += speed + rocks.y/30;
    if (rocks.y > game.world.height) {
        resetrockPos(rocks);
    }
    }

function resetrockPos(rocks) {
        rocks.y = 0;
        rocks.x = Math.random() * (game.world.width);
    }