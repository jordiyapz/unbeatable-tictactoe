function Image() {
	this.checkBox = function(x, y, val, scl) {
		if(scl == undefined) scl = 1;
		if(val == undefined) val = 0;
		push();
			translate(x, y);
			noFill();
			stroke(0);
			strokeWeight(3*scl);
			rect(0,0,16*scl,16*scl);
			if(val) {
				translate(1,1);
				strokeWeight(3*scl);
				stroke(255,0,0);
				line(0,6*scl*.8,6*scl*.8,13*scl*.8);
				line(6*scl*.8,13*scl*.8,20*scl*.8,0);
			}
		pop();	
	}
	this.board = function(x, y) {
		if(y == undefined) y = 0;
		if(x == undefined) x = 0;
		push();
			translate(x, y);
			fill(0);
			rect(0,0,230,230);
			fill(240, 255, 180);
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					let x = 5 + i*75;
					let y = 5 + j*75;
					rect(x, y, 70, 70);
				}
			}
		pop();
	}
	this.markx = function(x, y, scl, alp) {
		if(scl == undefined) scl = 1;
		if(alp == undefined) alp = 255;
		push();
			translate(x, y);
			strokeWeight(7*scl);
			stroke(0, alp);
			line(0,0,50*scl,50*scl);
			line(50*scl,0,0,50*scl);
		pop();
	}
	this.marko = function(x, y, scl, alp) {
		if(scl == undefined) scl = 1;
		if(alp == undefined) alp = 255;
		push();
			translate(x, y);
			noFill();
			strokeWeight(7*scl);
			stroke(255,0,0, alp);
			ellipse(25*scl,25*scl,50*scl,50*scl);
		pop();
	}
}


