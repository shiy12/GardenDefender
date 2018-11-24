//hiya globe

var grassField;
var player;
var bullet;
var enemy;
var castle;
var health;
var healthbar;
var healthvalue = 196;

var playState = {

	create: function() {

        grassField = game.add.tileSprite(0,0,640,480,'grassField');

        healthbar = game.add.sprite(game.world.left + 10, game.world.top + 10, 'healthbar');

        health = game.add.tileSprite(12,13,healthvalue,14,'health')

        player = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true

	}, 
/*
	update: function() {

	}, 

	playerWins: function() {

	}, 

	playerLoses: function() {

	} */
}