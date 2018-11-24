/** @module pause */

var pauseImage;
var unPause;
var newGame;

/**
 * @var pauseState {State} - Pause state of the game (inherited from Phaser's State class).
 * @property {object} pauseImage - Pause screen image displayed in the GUI.
 * @property {object} unPause - Input key used to resume the game.
 * @property {object} newGame - Input key used to start a new game.
 */
var pauseState = {
	
	/**
	 * @method create
	 * @description Adds pause screen to the GUI, defines unPause and newGame events.
	 */
	create: function() {

		pauseImage = game.add.tileSprite(0,0,640,480,'pauseScreen');

		// Unpause the game, return to main state. 
		unPause = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		unPause.onDown.addOnce(this.start, this);

		// Restart the game. 
		newGame = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		newGame.onDown.addOnce(this.restart, this);
	}, 

	/**
	 * @method start
	 * @description Changes from pause state back to main state.
	 */
	start: function() { 

		game.state.start('main');

	}, 

	/**
	 * @method restart
	 * @description Transitions from pause state to start state.
	 */
	restart: function() {

		game.state.start('start');

	}
}