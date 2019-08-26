function Game() {
	this.turns = 0;
	this.scores = [0,0];
	this.round = 1;
	this.pm = Math.round(random(1,2));
	this.qm = (this.pm == 2)? 1:2;
	this.marking = Math.round(random(1,2));
	this.achievement = {
		posx : width,
		posy : 75, 
		value : false,
		conCt : 0 //consecutive counter;
	};
	this.triggered = false;
	this.difficulty = 6;
}
Game.prototype.getScore = function(brd, m) {
	let board;
	if(brd[0] != undefined) board = copyArr(brd);
	else board = brd.getBoard();

	let scores = 0;
	for (var i = 0; i < board.length; i++) { // vertical
		let l = [];
		for (var j = 0; j < board[i].length; j++) {
			l[j] = board[i][j];
		}
		if (lines(l) != null){
			if (lines(l) == m) scores = 1;
			else if(scores == 0) scores = -1;
		}
	}
	for (var i = 0; i < board.length; i++) {
		let l = [];
		for (var j = 0; j < board[i].length; j++) {
			l[j] = board[j][i];
		}
		if (lines(l) != null){
			if (lines(l) == m) scores = 1;
			else if(scores == 0) scores = -1;
		}
	}
	let dia = [[board[0][0], board[1][1], board[2][2]], [board[2][0], board[1][1], board[0][2]]];
	for (var i = 0; i < dia.length; i++) {
		let l = dia[i];
		if (lines(l) != null){
			if (lines(l) == m) scores = 1;
			else if(scores == 0) scores = -1;
		}
	}
	return scores;
}
Game.prototype.update = function() {
	switch(this.getScore(b,this.pm)) {
		case 1: this.scores[0]++; break;
		case -1: this.scores[1]++; break;
	}
	if(this.turns >= 9 || this.getScore(b, this.pm) != 0) {
		if(this.getScore(b, this.pm) >= 0) this.achievement.conCt++;
		else this.achievement.conCt = 0;

		if(this.getScore(b, this.pm) != -1) sound.sfx[1].play();
		else {
			if (this.scores[1] <= 5 && random(10) >= 7) sound.sfx[2].play();
			else if (random(20) >= 15) sound.sfx[3].play();
			else if (random(2) >= 1) sound.sfx[5].play();
			else sound.sfx[4].play();
		}
		b = new Board(width/2-115, height/2-115);

		this.turns = 0;
		this.round++;
		this.marking = Math.round(random(1,2));
	} else if(this.marking == this.qm) {
		this.AI();
		sound.sfx[0].play();
		this.turns++;
		this.marking = this.pm;
	}
	
	if(this.achievement.conCt > 0 && this.achievement.conCt % 5 == 0) {
		if(!this.triggered) {
			this.triggered = true;
			sound.sfx[6].play();
		}
		this.achievement.value = true;
		if(this.achievement.posx > -700) 
			this.achievement.posx -= 2;
		else this.achievement.posx = width;
	} else {
		this.triggered = false;
		this.achievement.value = false;
	}
}
Game.prototype.render = function() {
	b.render();

	for (var i = 0; i < b.mark.length; i++) {
		for (var j = 0; j < b.mark[i].length; j++) {
			if(b.mark[i][j].isClicked() && b.mark[i][j].val == 0) { // ishovered
				let pos = {
					x : b.x + 10 + b.mark[i][j].x,
					y : b.y + 10 + b.mark[i][j].y
				}
				let alpha = 60;
				switch(this.pm) {
					case 1: img.markx(pos.x, pos.y, 1, alpha); break;
					case 2: img.marko(pos.x, pos.y, 1, alpha); break;
				}
			}
		}
	}

	textAlign(LEFT);
	fill(0);
	textSize(20);
	text("Bgm", 510, 25);
	sound.bgm.disp();
	text("Sfx", 510, 50);
	sound.sfx[0].disp();

	textSize(40);
	fill(0);
	textAlign(CENTER);
	{
		let str = "Round " + this.round;
		text(str, width/2, 50);
	}

	textSize(30);
	textAlign(LEFT);
	switch(this.marking) {
		case 1: img.markx(460,220,.7); break;
		case 2: img.marko(460,220,.7); break;
	}
	fill(255);
	text("'s turn", 500, 250);
	text("Player", 20, 370);
	switch(this.pm) {
		case 1: img.markx(120,340,.6); break;
		case 2: img.marko(120,340,.6); break;
	}
	text(": ", 160, 370);

	text("Computer/A.I.", 285, 370);
	switch(this.qm) {
		case 1: img.markx(480,340,.6); break;
		case 2: img.marko(480,340,.6); break;
	}
	text(": ", 520, 370);
	textAlign(RIGHT);
	textSize(40);
	fill(51);
	text(this.scores[0], 230, 370);
	text(this.scores[1], 590, 370);
	if(this.achievement.value) {
		textSize(20);
		textAlign(LEFT);
		stroke(100,255,100);
		fill(50,255,50);
		let str = "Congratulation! You managed to survive " + this.achievement.conCt + " consecutive rounds without losing!";
		text(str, this.achievement.posx, this.achievement.posy);
		noStroke();
	}
}
Game.prototype.AI = function() {
	var brd = b.getBoard();
	var d = 0;
	var target = [];
	if(this.turns > 0) target = minimax(brd, 0, this.qm);
	else {
		target[0] = Math.floor(Math.random() * 3);
		target[1] = Math.floor(Math.random() * 3);
	}

	b.set(this.qm, target[0], target[1]);
}
function minimax(brd, depth, com) { // 0 = max
	var maxDepth = game.difficulty;
	if(depth <= maxDepth) {
		let board = copyArr(brd);
		let newDepth = depth+1;
		let scoreNow = game.getScore(board, com);

		if(scoreNow != 0) return scoreNow; else 
		{
			let empGrid = [];
			for (var i = 0; i < board.length; i++){
				for (var j = 0; j < board[i].length; j++)
					if(board[i][j] == 0) empGrid.push([i, j, 0]);
			}

			if(empGrid.length == 0) return 0;
			else empGrid = shuffleA(empGrid);
		
			let newBoard = [[0,0,0],[0,0,0],[0,0,0]];
			for (let i = 0; i < empGrid.length; i++) {

				for(j in newBoard) for(k in newBoard[j]) newBoard[j][k] = board[j][k];

				newBoard[empGrid[i][0]][empGrid[i][1]] = (depth%2 == 0)? com:( (com != 1)? 1:2 );

				let score;
				if(depth != maxDepth) score = minimax(newBoard, newDepth, com);
				else score = game.getScore(newBoard, com);
				
				empGrid[i][2] = score;
				// console.log("depth = "+ depth + "  New Board = "+newBoard);
				if(depth == maxDepth) break;				
			}
			if(empGrid.length > 0) {

				if(depth % 2 == 0) {
					let max = empGrid[0];
					for (var i = 1; i < empGrid.length; i++) {
						if(max[2] < empGrid[i][2]) {
							max = empGrid[i];
						}
					}
					if(depth == 0) return max;
					else return max[2];
	
				} else {
					let min = empGrid[0];
					for (var i = 1; i < empGrid.length; i++) {
						if(min[2] > empGrid[i][2]) {
							min = empGrid[i];
						}
					}
					return min[2];
				}
			} else return 0;
		}
	}
	return 0;
}

function shuffleA(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]; //swap
    }
    return a;
}

function copyArr(a) {
	let out = [];
	for (var i = 0; i < a.length; i++) {
		out[i] = a[i];
	}
	return out;
}

function lines(arr) {
	if(arr[0] != 0 && arr[0] == arr[1] && arr[1] == arr[2]) return arr[0];
	else return null;
}
function mouseReleased() {
	if(game.marking == game.pm) {
		for (var i = 0; i < b.mark.length; i++) {
			for (var j = 0; j < b.mark[i].length; j++) {
				if(b.mark[i][j].isClicked() && b.mark[i][j].val == 0) {
					b.set(game.marking,i,j);
					sound.sfx[0].play();
					// b.set(game.pm,i,j);
					game.turns++;
					game.marking = (game.marking == 2)? 1:2;
				}
			}
		}
	}
	if(sound.bgm.isClicked()) sound.bgm.cb.val = !sound.bgm.cb.val;
	if(sound.sfx[0].isClicked()) {
		for(i in sound.sfx) sound.sfx[i].cb.val = !sound.sfx[i].cb.val;
	}
	return 0;
}