/** @module transition */

var transitionImage;
var keyZ;
var keyX;

/**
 * @var transitionState {State} - Transition state (between levels) of the game (inherited from Phaser's State class).
 * @property {object} transitionImage - Level transition screen displayed in the GUI.
 * @property {object} keyZ - Input key to change to weapon 2.
 * @property {object} keyX - Input key to change to weapon 3.
 */
var transitionState = {

    /**
     * @method create
     * @description Adds transition screen to GUI, defines keyZ and keyX events.
     */
    create: function() {

        transitionImage = game.add.tileSprite(0,0,640,480,'transitionScreen');

        keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);

        keyZ.onDown.addOnce(this.start, this);
        keyX.onDown.addOnce(this.start, this);

    },

    /**
     * @method start
     * @description Changes from transition state to main state.
     */
    start: function() {
        if (keyZ.isDown) {
            playerWeapon = 2;
        }

        if (keyX.isDown) {
            playerWeapon = 3;
        }
        game.state.start('main');
    }
}