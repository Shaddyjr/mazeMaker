function Square(row, col, squareSize){
	this.row = row;
	this.col = col;
	this.visited = false;
	this.walls = {
		"left": true,
		"right": true,
		"above": true,
		"bottom": true
	}
	this.start;
	this.end;
}

Square.prototype.show = function(currentSquare){
	if(this.start){
		fill(0,0,225);
	}else if(this.end){
		fill(225,0,0);
	}else if(this==currentSquare){
		fill(21,45,100);
	}else if(this.visited){		
		fill(60);
	}else{
		fill(12,89,14);
	}

	var y = this.row*squareSize;
	var x = this.col*squareSize;
	
	//square
	noStroke()
	rect(x,y , squareSize, squareSize);

	//Walls
	stroke(220,50,11);
	strokeWeight(3);
	if(this.walls.left){
		line(x, y, x, y+squareSize);
	}
	if(this.walls.right){
		line(x+squareSize, y, x+squareSize, y+squareSize);
	}
	if(this.walls.above){
		line(x, y, x+squareSize, y);
	}
	if(this.walls.bottom){
		line(x, y+squareSize, x+squareSize, y+squareSize);
	}


}
