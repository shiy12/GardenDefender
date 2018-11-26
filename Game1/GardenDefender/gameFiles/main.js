/** @module main */

var upKey;
var downKey;
var leftKey;
var rightKey;
var pausebtn;
;

/**
 * @var mainState {State} - Main state of the game (inherited from Phaser's State class).
 * @property {object} upKey - Input key used to move player up.
 * @property {object} downKey - Input key used to move player down.
 * @property {object} leftKey - Input key used to move player left.
 * @property {object} rightKey - Input key used to move player right.
 * @property {object} pausebtn - Input key used to pause the game.
 */
var mainState = {

    /**
     * @method create
     * @description Starts the game.
     */
    create: function () {

        // Add background to game.
        grassField = game.add.tileSprite(0, 0, 640, 480, 'grassField');

        // Add health bar (red) to game. 
        healthR = game.add.sprite(game.world.left + 10, game.world.top + 10, 'healthR');
        game.physics.enable(healthR, Phaser.Physics.ARCADE);

        // Add health bar (green) to game.
        healthG = game.add.tileSprite(12, 13, healthvalue, 14, 'healthG');
        game.physics.enable(healthG, Phaser.Physics.ARCADE);

        // Add garden to the game and spaces them equally to fit within the game frame. 
        garden = game.add.group();
        garden.enableBody = true;
        garden.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 4; i++) {
            garden.create(game.world.left, game.world.top + 35 + i * 105, 'gardenBed')
        }

        // Add player to game, enable physics, prevent player from exceeding game bounds.
        player = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'player');
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        // Set WASD keys for controlling player movement in place of arrow keys. 
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Add the bullets (projectiles) to the game and determine how they are displayed
        // and how they move.
        bullets = game.add.weapon(30, 'bullet')
        bullets.bulletAngleOffset = 0;
        bullets.bulletSpeed = 700;
        bullets.bulletAngleVariance = 0;
        bullets.trackSprite(player);
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets2 = game.add.weapon(30, 'bullet')
        bullets2.bulletAngleOffset = 0;
        bullets2.bulletSpeed = 700;
        bullets2.bulletAngleVariance = 0;
        bullets2.trackSprite(player);
        bullets2.enableBody = true;
        bullets2.physicsBodyType = Phaser.Physics.ARCADE;

        bullets3 = game.add.weapon(30, 'bullet')
        bullets3.bulletAngleOffset = 0;
        bullets3.bulletSpeed = 700;
        bullets3.bulletAngleVariance = 0;
        bullets3.trackSprite(player);
        bullets3.enableBody = true;
        bullets3.physicsBodyType = Phaser.Physics.ARCADE;

        bullets4 = game.add.weapon(30, 'bullet4')
        bullets4.bulletAngleOffset = 0;
        bullets4.bulletSpeed = 1000;
        bullets4.fireRate = 30;
        bullets4.bulletAngleVariance = 0;
        bullets4.trackSprite(player);
        bullets4.enableBody = true;
        bullets4.physicsBodyType = Phaser.Physics.ARCADE;


        // Add the enemies to the game.
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;

        // Create a finite # of enemies.
        for (var i = 0; i < numEnemies * gameLevel; i++) {
            enemy = enemies.create(640, game.rnd.integerInRange(50, 450), 'enemy')
            enemy.checkWorldBounds = true
            enemy.outOfBoundsKill = true
            enemy.events.onKilled.add(this.enemyOut, this)
            enemy.body.velocity.x = game.rnd.integerInRange(-150, -50)
            enemy.body.velocity.y = game.rnd.integerInRange(-20, 20)
            enemy.hitCount = 0;
        }


        if (gameLevel >= 2) {
            enemies2 = game.add.group();
            enemies2.enableBody = true;
            enemies2.physicsBodyType = Phaser.Physics.ARCADE;
            for (var i = 0; i < 1; i++) {
                enemy2 = enemies.create(680, game.rnd.integerInRange(50, 450), 'enemy2')
                enemy2.checkWorldBounds = true
                enemy2.outOfBoundsKill = true
                enemy2.events.onKilled.add(this.enemy2Out, this)
                enemy2.body.velocity.x = game.rnd.integerInRange(-500, -450)
                enemy2.body.velocity.y = game.rnd.integerInRange(-200, 200)
            }

        }

        if (gameLevel >= 3) {
            enemies3 = game.add.group();
            enemies3.enableBody = true;
            enemies3.physicsBodyType = Phaser.Physics.ARCADE;
            for (var i = 0; i < 2; i++) {
                enemy3 = enemies.create(game.rnd.integerInRange(-50, 550), -200, 'enemy3')
                enemy3.checkWorldBounds = true
                enemy3.outOfBoundsKill = true
                enemy3.events.onKilled.add(this.enemy3Out, this)
                enemy3.body.velocity.x = game.rnd.integerInRange(-20, 20)
                enemy3.body.velocity.y = game.rnd.integerInRange(200, 300)
            }

        }


        // Add the timer to the game (counts down).
        timeText = game.add.text(400, 10, 'Time：60', {
            fontSize: '20px',
            fontWeight: 'bold',
            fill: '#000'
        });

        this.pausebtn = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.pausebtn.onDown.addOnce(this.pauseGame, this);

    },

    /**
     * @method update
     * @description Updates variables and changes the state of the game based on different inputs and events.
     */
    update: function () {

        // Following code handles player movement.
        //player rotation
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;


        // Move character based on player input. 
        if (this.leftKey.isDown) {
            player.body.velocity.x = -700;
        }

        if (this.rightKey.isDown) {
            player.body.velocity.x = 700;
        }

        if (this.upKey.isDown) {
            player.body.velocity.y = -700;
        }

        if (this.downKey.isDown) {
            player.body.velocity.y = 700;
        }

        // Following code handles projectiles. 

        //set bullets rotation
        player.rotation = game.physics.arcade.angleToPointer(player);
        bullets.fireAngle = player.angle;
        bullets2.fireAngle = player.angle+15;
        bullets3.fireAngle = player.angle-15;
        bullets4.fireAngle = player.angle;

        // Fire bullets.
        if (game.input.activePointer.isDown) {
            if(playerWeapon == 1){
                bullets.fire();
            }else if(playerWeapon == 2){
                bullets.fire();
                bullets2.fire();
                bullets3.fire();
            }else if(playerWeapon == 3){
                bullets4.fire();
            }else{
                bullets.fire();
            }

        }


        // Describe behavior when bullets hit an enemy, when an enemy hits a castle, 
        // and when the player hits a castle. 
        game.physics.arcade.collide(bullets.bullets, enemies, this.bulletsEnemiesCollision, null, this);
        game.physics.arcade.collide(bullets2.bullets, enemies, this.bulletsEnemiesCollision, null, this);
        game.physics.arcade.collide(bullets3.bullets, enemies, this.bulletsEnemiesCollision, null, this);
        game.physics.arcade.collide(bullets4.bullets, enemies, this.waterEnemiesCollision, null, this);
        game.physics.arcade.overlap(garden, enemies, this.enemiesgardenCollision, null, this);
        game.physics.arcade.overlap(garden, player, this.playergardenCollision, null, this);
        game.physics.arcade.overlap(healthR, player, this.playerHealthRCollision, null, this);
        game.physics.arcade.overlap(healthG, player, this.playerHealthGCollision, null, this);


        // Construct the timer.
        gameTime = 60 - parseInt(time / 60);
        time++;
        timeText.text = 'Time：' + gameTime;

        //Change level and difficulty based on remaining time
        if (gameTime == 40) {
            gameLevel = 2;
            if (allowTransition2) {
                allowTransition2 = false;
                game.state.start('transition');
            }
        }
        if (gameTime == 20) {
            gameLevel = 3;
            if (allowTransition3) {
                allowTransition3 = false;
                game.state.start('transition');
            }
        }


        // Set conditions for win or lose.
        if (healthvalue < 0 && gameEnd == false) {
            healthvalue = 196;
            game.state.start('lose');
        } else if (gameTime < 0 && gameEnd == false) {
            game.state.start('win');
            healthvalue = 196;

        }
    },

    /**
     * @method pauseGame
     * @description Change from main state to pause state.
     */
    // Pauses the game and brings up the tutorial.
    pauseGame: function () {
        game.state.start('pause');
    },

    /**
     * @method enemyOut
     * @param {sprite} enemy - enemy sprite of type "enemy"
     * @description Respawns an enemy when killed.
     */
    // Respawn enemy when destroyed, until game is over.
    enemyOut: function (enemy) {
        if (gameEnd == false) {
            enemy.reset(640, game.rnd.integerInRange(50, 450))
            enemy.body.velocity.x = game.rnd.integerInRange(-200, -100)
            enemy.body.velocity.y = game.rnd.integerInRange(-20, 20)
        }
        ;

    },

    /**
     * @method enemy2Out
     * @param {sprite} enemy - enemy sprite of type "enemy2"
     * @description Respawns an enemy when killed.
     */
    enemy2Out: function (enemy) {
        if (gameEnd == false) {
            enemy.reset(640, game.rnd.integerInRange(50, 450))
            enemy.body.velocity.x = game.rnd.integerInRange(-500, -450)
            enemy.body.velocity.y = game.rnd.integerInRange(-200, 200)
        }
        ;

    },

    /**
     * @method enemy3Out
     * @param {sprite} enemy - enemy sprite of type "enemy3"
     * @description Respawns an enemy when killed.
     */
    enemy3Out: function (enemy) {
        if (gameEnd == false) {
            enemy.reset(game.rnd.integerInRange(50, 550), 10)
            enemy.body.velocity.x = game.rnd.integerInRange(-20, 20)
            enemy.body.velocity.y = game.rnd.integerInRange(200, 300)
        }
        ;

    },

    /**
     * @method bulletsEnemiesCollision
     * @param {weapon} bullet - bullet object
     * @param {sprite} enemy - enemy sprite
     * @description Kills enemy and bullet when they collide.
     */
    // Destroy enemy and bullet when they collide. 
    bulletsEnemiesCollision: function (bullet, enemy) {
        bullet.kill();
        enemy.kill();
    },


    /**
     * @method waterEnemiesCollision
     * @param {weapon} bullet - bullet object of type "bullet4"
     * @param {sprite} enemy - enemy sprite
     * @description Kills enemy and bullet when they collide.
     */
    // Destroy enemy and bullet when they collide.
    waterEnemiesCollision: function (bullet, enemy) {
        bullet.kill();
    },

    /**
     * @method enemiesgardenCollision
     * @param {group} garden - group of garden beds
     * @param {sprite} enemy - enemy sprite
     * @description Kills enemy and reduces health when enemy collides with garden.
     */
    // Destroy enemy and reduce health when enemy collides with garden. 
    enemiesgardenCollision: function (garden, enemy) {
        enemy.kill();
        healthvalue -= 20;
        healthG.kill();
        healthG = game.add.tileSprite(12, 13, healthvalue, 14, 'healthG');
        if (gameEnd == false) {
            game.camera.shake(0.003);
        }
    },

    /**
     * @method playergardenCollision
     * @description Prevents player from walking over/past the garden
     */
    // Prevent player from walking over garden.
    playergardenCollision: function () {
        player.x = 120;
    },

    /**
     * @method playerHealthRCollision
     * @description Prevents player from walking through healthbar (red portion in specific).
     */
    // Prevent player from walking through healthbar. 
    playerHealthRCollision: function () {
        player.y = 60;
    },

    /**
     * @method playerHealthGCollision
     * @description Prevents player from walking through the healthbar (green portion in specific).
     */
    // Prevent player from walking through healthbar. 
    playerHealthGCollision: function () {
        player.y = 60;
    },
}
