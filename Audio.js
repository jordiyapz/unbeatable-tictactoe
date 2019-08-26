function Audio(src, x, y) {
	this.tag = document.createElement("AUDIO");
	this.tag.src = src;
	this.cb = {
		val : true,
		disp : false,
		pos : {x, y},
		w : 16
	};
	if(x != undefined) {
		this.cb.pos.x = x;
		this.cb.pos.y = y;
	}
	this.val = 1;
}

Audio.prototype.isClicked = function() {
	if(
		mouseX >= this.cb.pos.x &&
		mouseX < this.cb.pos.x + this.cb.w &&
		mouseY >= this.cb.pos.y &&
		mouseY < this.cb.pos.y + this.cb.w
	) return true;
	return false;
}

Audio.prototype.disp = function() {
	this.cb.disp = true;
	img.checkBox(this.cb.pos.x, this.cb.pos.y, this.cb.val);
}

Audio.prototype.update = function() {
	if(this.cb.val || this.tag.ended) this.tag.play();
	else this.tag.pause();
}

Audio.prototype.play = function(forc) {
	if(forc == undefined) forc = false;
	if(forc | this.cb.val) this.tag.play();
}