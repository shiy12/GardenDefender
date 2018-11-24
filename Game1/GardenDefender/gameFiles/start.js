/** @module start */

var startImage;
var spbar;

/**
 * @var startState {State} - Start state of the game (inherited from Phaser's State class).
 * @property {object} startImage - Start screen image displayed in the GUI.
 * @property {object} spbar - Input key used to transition to the main state. 
 */
var startState = {

	/**
	 * @method create
	 * @description Adds start screen to GUI, defines spbar event.
	 */
	create: function() {

		startImage = game.add.tileSprite(0,0,640,480,'startScreen');

		spbar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spbar.onDown.addOnce(this.start, this);
	},

	/**
	 * @method start
	 * @description Initializes a new game, changes from start state to main state.
	 */
	start: function() {
		gameLevel = 1;
		gameTime = 30;
		time = 0;
		playerWeapon = 1;
		game.state.start('main');
	}
}