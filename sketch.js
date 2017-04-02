
//SETTINGS
var numberOfRows = 10;
var numberOfCols = 10;

var squareSize = 50;

var w = numberOfCols * squareSize;
var h = numberOfRows * squareSize;

//DATA
var board = [];

function preload(){

}

function setup(){
	createCanvas(w, h);
	background(55);
	for (var i = 0; i < numberOfRows; i ++){
		for (var j = 0; j < numberOfCols; j ++){
			board.push(new Square(i, j));
		}
	}
}

function draw(){
	for (var i in board){
		board[i].show();
	}
}