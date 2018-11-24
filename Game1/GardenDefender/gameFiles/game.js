/** @module game */

/**
 * @var game {object} - Phaser game object.
 * @property {State} load - Load state of the game.
 * @property {State} start - Start state of the game.
 * @property {State} main - Main state of the game.
 * @property {State} pause - Pause state of the game.
 * @property {State} win - Win state of the game.
 * @property {State} lose - Lose state of the game.
 * @property {State} transition - Transition state (between levels) of the game.
 */
var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'gameDiv');

// Add states to game
game.state.add('load', loadState);
game.state.add('start', startState);
game.state.add('main', mainState);
game.state.add('pause', pauseState);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('transition',transitionState);

// Global variables
/**
 * @global
 * @var grassField {object} - Background image of the game.
 */
var grassField;

/**
 * @global
 * @var player {object} - Player sprite.
 */
var player;

/**
 * @global 
 * @var bullets {object} - Bullets (of type 1) for player to fire.
 */
var bullets;

/**
 * @global 
 * @var bullets2 {object} - Bullets (of type 2) for player to fire.
 */
var bullets2;

/**
 * @global 
 * @var bullets3 {object} - Bullets (of type 3) for player to fire.
 */
var bullets3;

/**
 * @global 
 * @var bullets4 {object} - Bullets (of type 4) for player to fire.
 */
var bullets4;

/**
 * @global
 * @var enemy {object} - Enemy sprite (of type 1).
 */
var enemy;

/**
 * @global 
 * @var enemy2 {object} - Enemy sprite (of type 2).
 */
var enemy2;

/**
 * @global 
 * @var enemy3 {object} - Enemy sprite (of type 3).
 */
var enemy3;

/**
 * @global
 * @var enemies {object} - Group of enemies (of type 1).
 */
var enemies;

/**
 * @global
 * @var enemies2 {object} - Group of enemies (of type 2).
 */
var enemies2;

/**
 * @global
 * @var enemies3 {object} - Group of enemies (of type 3).
 */
var enemies3;

/**
 * @global
 * @var gardenBed {object} - Object at defensive line.
 */
var gardenBed;

/**
 * @global
 * @var garden {object} - Group of objects at defensive line.
 */

/**
 * @global
 * @var healthG {object} - Green portion of health bar.
 */
var healthG;

/**
 * @global
 * @var healthR {object} - Red portion of health bar.
 */
var healthR;

/**
 * @global
 * @var healthvalue {int} - Player's current health value.
 */
var healthvalue = 196;

/**
 * @global
 * @var numEnemies {int} - Number of enemies in the game.
 */
var numEnemies = 3;

/**
 * @global
 * @var gameLevel {int} - Current level of the game.
 */
var gameLevel=1;

/**
 * @global
 * @var gameEnd {boolean} - Determines if the game has ended.
 */
var gameEnd = false;

/**
 * @global
 * @var playerWeapon {int} - Value associated with the player's current weapon.
 */
var playerWeapon = 1;

/**
 * @global
 * @var timeText {str} - Time text displayed in the GUI.
 */
var timeText;

/**
 * @global
 * @var gameTime {float} - Time left in the game. 
 */
var gameTime;

/**
 * @global
 * @var time {float} - Total elapsed time since the start of the game.
 */
var time = 0;

/**
 * @global
 * @var allowTransition2 {boolean} - Determines if player can proceed to level 2.
 */
var allowTransition2 = true;

/**
 * @global
 * @var allowTransition3 {boolean} - Determines if player can proceed to level 3.
 */
var allowTransition3 = true;

game.state.start('load');