// Add start and finish

//SETTINGS
var numberOfRows = 10;
var numberOfCols = 10;

var squareSize = 50;

var w = numberOfCols * squareSize;
var h = numberOfRows * squareSize;

//DATA
var board = [];
var currentSquare;
var stack = [];

function checkDone(){
	return board.every((x)=>x.visited);
}

function findSquare(row,col){
	//returns the Square on the board with the given row and col
	return board.find((x)=>x.row==row&&x.col==col);
}

function breakWall(square1, square2){
	//assuming square 1 is last square and square 2 is new square, walls are torn down between the two.
	var yDiff = square2.row - square1.row;
	var xDiff = square2.col - square1.col;

	// console.log(xDiff)	
	// console.log(yDiff)

	if(xDiff<0){
		square2.walls.right = false;
		square1.walls.left = false;
	}else if(xDiff>0){
		square1.walls.right = false;
		square2.walls.left = false;
	}else if(yDiff<0){
		square2.walls.bottom = false;
		square1.walls.above = false;
	}else if(yDiff>0){
		square1.walls.bottom = false;
		square2.walls.above = false;
	}
}

function checkAround(){
	//returns true if there are any valid unvisited neighbors around currentSquare
	var left = !!findSquare(currentSquare.row, currentSquare.col-1) ? !findSquare(currentSquare.row, currentSquare.col-1).visited : false;
	var right = !!findSquare(currentSquare.row, currentSquare.col+1)? !findSquare(currentSquare.row, currentSquare.col+1).visited : false;
	var above = !!findSquare(currentSquare.row-1, currentSquare.col)? !findSquare(currentSquare.row-1, currentSquare.col).visited : false;
	var bottom = !!findSquare(currentSquare.row+1, currentSquare.col)? !findSquare(currentSquare.row+1, currentSquare.col).visited : false;

	return left||right||above||bottom;
}

function validAround(){
	//returns array of valid unvisited neighbors around currentSquare
	var outcome = [];
	var left = !!findSquare(currentSquare.row, currentSquare.col-1) ? !findSquare(currentSquare.row, currentSquare.col-1).visited : false;
	var right = !!findSquare(currentSquare.row, currentSquare.col+1)? !findSquare(currentSquare.row, currentSquare.col+1).visited : false;
	var above = !!findSquare(currentSquare.row-1, currentSquare.col)? !findSquare(currentSquare.row-1, currentSquare.col).visited : false;
	var bottom = !!findSquare(currentSquare.row+1, currentSquare.col)? !findSquare(currentSquare.row+1, currentSquare.col).visited : false;
	if(left){
		outcome.push(findSquare(currentSquare.row, currentSquare.col-1));
	}
	if(right){
		outcome.push(findSquare(currentSquare.row, currentSquare.col+1));
	}
	if(above){
		outcome.push(findSquare(currentSquare.row-1, currentSquare.col));
	}
	if(bottom){
		outcome.push(findSquare(currentSquare.row+1, currentSquare.col));
	}
	return outcome;
}

function moveOn(){
	//moves currentSquare to a neighbor Square obj. around currentSquare or steps back in stack
	if (checkAround()){
		// add currentSquare to stack before moving
		var tempSquare = currentSquare;
		currentSquare = random(validAround());
		breakWall(tempSquare,currentSquare);
		if(!currentSquare){
			console.log("Problem 1");
		}
		stack.push(currentSquare);
		currentSquare.visited = true;
	}else{
		//move backwards in stack
		currentSquare = stack.pop();
	}	
}

function preload(){

}

function setup(){
	createCanvas(w, h);
	for (var i = 0; i < numberOfRows; i ++){
		for (var j = 0; j < numberOfCols; j ++){
			board.push(new Square(i, j, squareSize));
		}
	}
	frameRate(30);
	currentSquare = board[0];
	currentSquare.start = true;
	board[board.length-1].end = true;
	// board = [board[25]]
}

function draw(){
	//PREDRAW
	background(55);
	currentSquare.visited = true;

	if(!checkDone()){
		moveOn();
	}else{
		noLoop();
		currentSquare=null;
	}
	for (var i in board){
		board[i].show(currentSquare);
	}
}