/** @module lose */

var loseImage;
var spbar; 

/**
 * @var loseState {State} - Lose state of the game (inherited from Phaser's State class).
 * @property {object} loseImage - Lose screen image displayed in the GUI.
 * @property {object} spbar - Input key used to transition to the start state.
 */
var loseState = {

	/**
	 * @method create
	 * @description Adds lose screen to the GUI, defines spbar event.
	 */
	create: function() {

        loseImage = game.add.tileSprite(0,0,640,480,'loseScreen');

		spbar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spbar.onDown.addOnce(this.start, this);

	},

	/**
	 * @method start
	 * @description Changes from lose state to start state.
	 */
	start: function() {
		game.state.start('start');
	}
}