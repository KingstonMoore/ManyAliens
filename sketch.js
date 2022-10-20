var gamestate,playercount,game,player, form, p1, p2
var p1,p2,p,players, ufo, ufoImg,bullet1,bullet2
var ufog, bg1,bg2
function preload(){
  alienImg = loadImage("alien.png")
  ufoImg = loadImage("ufo.png")
}
function setup() {
  createCanvas(800,600);
  db = firebase.database()
  game = new Game()
  game.getState()
  game.start()
}

function draw() {
  background("black");  
  if (playercount === 2){
    game.updateState(1)
  }
  if (gamestate===1){
    game.play()
  }
  if (gamestate===2){
    game.end()
  }
}
