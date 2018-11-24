/** @module win */

var winImage;
var spbar; 

/**
 * @var winState {State} - Win state of the game (inherited from Phaser's State class).
 * @property {object} winImage - Win screen image displayed in the GUI.
 * @property {object} spbar - Input key used to transition to the start state.
 */
var winState = {

	/**
	 * @method create
	 * @description Adds win screen to the GUI, defines spbar event.
	 */
	create: function() {

        winImage = game.add.tileSprite(0,0,640,480,'winScreen');

		spbar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spbar.onDown.addOnce(this.start, this);

	},

	/**
	 * @method start
	 * @description Changes from win state to start state.
	 */
	start: function() {
		game.state.start('start');
	}
}