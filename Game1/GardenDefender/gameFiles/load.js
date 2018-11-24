/** @module load */

/**
 * @var loadState {State} - Load state of the game (inherited from Phaser's State class).
 */
var loadState = {
        
        /**
         * @method preload
         * @description Preloads all assets.
         * @property {image} grassField - Grass background image.
         * @property {image} player - Rabbit sprite image.
         * @property {image} bullet - Bullet image.
         * @property {image} bullet4 - Alternative bullet image.
         * @property {image} gardenBed - Garden bed image.
         * @property {image} enemy - Enemy of type 1 (mole) image.
         * @property {image} enemy2 - Enemy of type 2 image.
         * @property {image} enemy3 - Enemy of type 3 image.
         * @property {image} healthR - Red portion of the healthbar.
         * @property {image} healthG - Green portion of the healthbar.
         * @property {image} winScreen - Win screen image.
         * @property {image} loseScreen - Lose screen image.
         * @property {image} startScreen - Start screen image.
         * @property {image} pauseScreen - Pause screen image.
         * @property {image} transitionScreen - Transition screen image.
         */
	preload: function() {

        game.load.image('grassField','images2/grass.png');
        game.load.image('player','images2/bunny.png');
        game.load.image('bullet','images2/rock.png');
        game.load.image('enemy','images2/mole.png');
        game.load.image('gardenBed','images2/garden.png');
        game.load.image('healthR','images/healthbar.png');
        game.load.image('healthG','images/health.png');
        game.load.image('winScreen', 'images2/youWin.png');
        game.load.image('loseScreen', 'images2/gameOver.png');
        game.load.image('startScreen', 'images2/start.png');
        game.load.image('pauseScreen', 'images2/pause.png');
        game.load.image('enemy2','images2/snake.png');
        game.load.image('enemy3','images2/bomb.png');
        game.load.image('transitionScreen','images2/transition2.png');
        game.load.image('bullet4','images2/bullet4alt.png');

	},

	/**
         * @method create
         * @description Changes from load state to start state.
         */
	create: function() {
		game.state.start('start');
	}

}