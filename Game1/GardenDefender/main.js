
/*
Problems:
1. Figure out a better way to create enemies(the enemies are actually finite and moving back and forth lol)
2. clearly something went wrong with accuracy（line 169, acc[0] should be number of bullets shot, seems like now it is number of bullets created）
3. add audio

*/



var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'gameDiv');
var grassField;
var castles;
var health;
var healthvalue=194;
var player;
var upKey;
var downKey;
var leftKey;
var rightKey;
var bullets;
var bullet;
var enemies;
var numEnemies = 7;
var acc = new Array(0,0);
var accuracy =0;
var accText;
var gameOverImage;
var youWinImage;
var timeText;
var gameTime = 30;
var time =0;
var gameEnd = false;



var mainState = {

    // Load all game assets. 
    preload: function () {
        game.load.image('grassField','images/grass.png');
        game.load.image('player','images/dude.png');
        game.load.image('bullet','images/bullet.png');
        game.load.image('enemy','images/badguy.png');
        game.load.image('castle','images/castle.png');
        game.load.image('healthbar','images/healthbar.png');
        game.load.image('health','images/health.png');
        game.load.image('gameover','images/gameover.png');
        game.load.image('youwin','images/youwin.png');

    /* Need these assets next: 
        1. Start Screen => Start Game & Tutorial 
        2. Pause Screen => Quit/Restart Game & Tutorial
    */

    },
    
    create: function () {

        /* Need to add the Start Screen and Pause Screen (and components) to game. 
            Need an onclick event for Start Game, Restart Game, and Tutorial. 
            Need to hide Start Screen after game starts, Pause Screen starts hidden, toggled with esc key. 
            Tutorial toggled from within start/pause screen. 
            Pause Screen needs to pause game state (update function). 
         */

        // Add the background to the game. 
        grassField = game.add.tileSprite(0,0,640,480,'grassField');

        // Add health bar to the game. 
        game.add.sprite(game.world.left + 10, game.world.top + 10,'healthbar');

        health = game.add.tileSprite(12,13,healthvalue,14,'health')

        // Add the player character to the game and ensure it doesn't leave the game's
        // boundaries. 
        player = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true

        // Register WASD keys for controlling player movement in place of arrow keys
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D)

        // Add the bullets (projectiles) to the game and determine how they are displayed
        // and how they move. 
        bullets = game.add.weapon(30,'bullet')
        bullets.bulletAngleOffset = 0;
        bullets.bulletSpeed = 700;
        bullets.bulletAngleVariance = 0;
        bullets.trackSprite(player);
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;


        // Add the enemies to the game. 
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;

        // Create a finite # of enemies.
    	for(var i = 0; i < numEnemies; i++){
	        var enemy = enemies.create(640, game.rnd.integerInRange(50,450), 'enemy')
	        enemy.checkWorldBounds = true
	        enemy.events.onKilled.add(enemyOut,this)
	        enemy.body.velocity.x = game.rnd.integerInRange(-150, -50)
    	}

        // Add castles to the game and spaces them equally to fit within the game frame. 
        castles = game.add.group();
        castles.enableBody = true;
        castles.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i = 0; i < 4; i++){
            castles.create(game.world.left,game.world.top + 35 + i * 105,'castle')
        }

        // Add the timer to the game (counts down). 
        timeText = game.add.text(400,10,'Time：60',{
            fontSize:'20px',
            fontWeight:'bold',
            fill:'#000'
        });

        // Add the Game Over screen to the game. 
        gameOverImage = game.add.tileSprite(0,0,640,480,'gameover');
        gameOverImage.visible = false;

        // Add the You Win screen to the game. 
        youWinImage = game.add.tileSprite(0,0,640,480,'youwin');
        youWinImage.visible = false;
    },
    
    update:function () {

        //set bullets rotation
        player.rotation = game.physics.arcade.angleToPointer(player);
        bullets.fireAngle = player.angle;

        // Describe behavior when bullets hit an enemy, when an enemy hits a castle, 
        // and when the player hits a castle. 
        game.physics.arcade.collide(bullets.bullets,enemies,bulletsEnemiesCollision);
        game.physics.arcade.overlap(castles,enemies,enemiesCastlesCollision,null,this);
        game.physics.arcade.overlap(castles,player,playerCastlesCollision,null,this);

        //player rotation
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;


        // Move character based on player input. 
        if(this.leftKey.isDown){
                player.body.velocity.x = -700;
        }

        if(this.rightKey.isDown){
                player.body.velocity.x = 700;
        }

        if(this.upKey.isDown){
                player.body.velocity.y = -700;
        }

        if(this.downKey.isDown){
                player.body.velocity.y = 700;
        }

        // Fire a bullet when the player presses the mouse. 
        game.input.onDown.add(function(){
                bullets.fire();
                acc[0] += 1;
        })

        // Construct the timer. 
        gameTime = 30 - parseInt(time / 60);
        time++;
        timeText.text = 'Time：' + gameTime;

        // Calculate accuracy of player's attacks. 
        if (acc[0] == 0) {
            accuracy = "0.00";
        }else {
            accuracy = ((acc[1] / acc[0]) * 100).toFixed(2);
            console.log(accuracy);
            //error in the accuracty calculation - somehow the number of killed enemies increases continually. 

        }

        // Check if player wins (timer < zero) or loses (health < 0), display win or lose message
        if(healthvalue < 0 && gameEnd == false){
            accText = game.add.text(game.world.centerX,game.world.centerY,'Accuracy:' + accuracy + "%",{font: '32px Arial', fill : '#fff'});
            gameOverImage.visible = true;
            timeText.visible = false;
            gameEnd = true;
            enemies.forEach(function (e) { e.kill(); });
            game.input.enabled = false;
        }else if(gameTime < 0 && gameEnd == false){
            accText = game.add.text(game.world.centerX,game.world.centerY,'Accuracy:' + accuracy + "%",{font: '32px Arial', fill : '#fff'});
            youWinImage.visible = true;
            timeText.visible = false;
            gameEnd = true;
            enemies.forEach(function (e) { e.kill(); });
            game.input.enabled = false;
        }
    }
}

// Resets enemy when killed, until end of game.
function enemyOut(enemy){
    if(gameEnd == false){
        enemy.reset(640, game.rnd.integerInRange(50,450))
        enemy.body.velocity.x = game.rnd.integerInRange(-150, -50)
    }
}

// Remove enemy from screen when bullet hits enemy.
function bulletsEnemiesCollision(bullet,enemy){
    bullet.kill();
    enemy.kill();
    acc[1] += 1;
}

// Remove enemy from screen when enemy hits castle, reduce health bar. 
function enemiesCastlesCollision(castles,enemy){
    enemy.kill();
    healthvalue -= 20;
    health.kill();
    health = game.add.tileSprite(12,13,healthvalue,14,'health');
    if(gameEnd == false){
    	game.camera.shake(0.003);
    }
}

// Prevent player from moving past castle
function playerCastlesCollision(castles,enemy){
	player.x = 100
}

// Add the mainstate to the game. 
game.state.add('mainState',mainState);

// Start the game. 
game.state.start('mainState');

//Random function adapted from https://www.cnblogs.com/a2b1/p/7492346.html
//bullets rotation function adapted from https://github.com/channingbreeze/games/tree/master/shoot