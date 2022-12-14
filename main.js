var b;
var game;
var img;
var sound = {bgm : 0, sfx : []};
function setup() {
	createCanvas(600,400);
	cursor(HAND);
	b = new Board(width/2-115, height/2-115);
	img = new Image();
	game = new Game();
	sound.bgm = new Audio("./assets/bgm/Autumn-day-easy-listening-music.mp3", 480, 10);
	sound.sfx[0] = new Audio("./assets/sfx/Bleep-sound.mp3", 480, 35);
	sound.sfx[1] = new Audio("./assets/sfx/Ding-dong-chime.mp3");
	sound.sfx[2] = new Audio("./assets/sfx/Hello.mp3");
	sound.sfx[3] = new Audio("./assets/sfx/Robot-laughing.mp3");
	sound.sfx[4] = new Audio("./assets/sfx/Failure-sound-effect.mp3");
	sound.sfx[5] = new Audio("./assets/sfx/Error-sound.mp3");
	sound.sfx.push(new Audio("./assets/sfx/Ta-da-orchestra-fanfare.mp3"));
}
function draw() {
	sound.bgm.update();
	background(100,185,255);
	game.update();
	game.render();
}