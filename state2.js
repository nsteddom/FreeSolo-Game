

demo.state2 = function() {};

demo.state2.prototype = {
    preload: function() {
        game.load.image('menu', "assets/menu.png", 112,112);
        game.load.image('sky', "assets/sky.png");
        game.load.image('climbing', "assets/goodmountain.jpg", 112, 112);
        game.load.image('avoid', "assets/avoidRock.png", 112, 112)
        game.load.image('awsd', "assets/IMG_0601.png");
        game.load.image('keys', "assets/IMG_0600.png");
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#fff';
        game.add.sprite(0,0, 'sky');
        var keysPng = game.add.image(400, -40, 'keys');
        //var awsdPng = game.add.image(500, -40, 'awsd');
        keysPng.scale.setTo(.6, .6)
        //awsdPng.scale.setTo(.6,.6)
        var avoid = game.add.image(130, 50, 'avoid')
        avoid.scale.setTo(.4, .4)
        var example = game.add.image(490, 340, 'climbing')
        example.scale.setTo(.35, .45)
      
        var button = game.add.button(0, -8, 'menu', actionOnClick, this);
        var style = {font: 'bolder 20px Arial', align: 'center', wordWrap: 'true', wordWrapWidth: '400'}
        var newStyle = {font: 'bolder 18px Arial', align: 'center', wordWrap: 'true', wordWrapWidth: '420'}
        var circle = {font: '70px Arial', fill: '#FF0000'}
        game.add.text(180, 120, 'O', circle);
        game.add.text(555, 410, 'O', circle)
        game.add.text(400, 150, 'Use the arrow keys to move around the mountain.', style)
        game.add.text(400, 240, 'Avoid falling rocks, and make your way to the top!', style);
        game.add.text(50, 350, 'Make sure to watch your hp! As you go up the mountain your hp will decrease.', newStyle)
        game.add.text(50, 420, 'As your HP nears 0 your speed will lower significantly and you will be close to death.', newStyle)
        game.add.text(50, 490, 'Retrieve the waters and bananas on mountains to raise your HP and continue towards the top!', newStyle)

        
    },


}

function actionOnClick() {
    game.state.start('state' + 1);
}
