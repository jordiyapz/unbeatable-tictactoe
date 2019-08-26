function Grid(val, x, y) {
	this.val = val;
	this.x = x;
	this.y = y;
	this.s;
}
Grid.prototype.isClicked = function() {
	if(mouseX - b.x >= this.x && mouseX - b.x < this.x + this.s)
		if(mouseY - b.y >= this.y && mouseY - b.y < this.y + this.s) return true;
	else return false;
}
function Board(x, y, s) {
	this.x = x; 
	this.y = y; 
	if(s == undefined) this.s = 230;
	else this.s = s;
	this.mark = [];
	this.init();
}
Board.prototype.init = function() {
	for (var i = 0; i < 3; i++) {
		this.mark[i] = [];
		for (var j = 0; j < 3; j++) {
			this.mark[i][j] = new Grid(0, i*75 + 5, j*75 + 5);
			this.mark[i][j].s = 70;
			this.mark[i][j].x = i*75+5;
			this.mark[i][j].y = j*75+5;
		}
	}

}
Board.prototype.render = function() {
	img.board(this.x, this.y);
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			let x = this.x + i*75 + 15;
			let y = this.y + j*75 + 15;
			switch(this.mark[i][j].val) {
				case 1 : img.markx(x, y); break;
				case 2 : img.marko(x, y); break;
			}
		}
	}
}
Board.prototype.set = function(m, i, j) {
	constrain(m, 0, 2);
	if(j == undefined)
		this.mark[i][j].val = m;
	else this.mark[i][j].val = m;
}
Board.prototype.getBoard = function() {
	let arr = [];
	for (let i = 0; i < this.mark.length; i++) {
		arr[i] = [];
		for (let j = 0; j < this.mark[i].length; j++) {
			arr[i][j] = this.mark[i][j].val;
		}
	}
	return arr;
}