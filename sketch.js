let cars = [];
let frogPos ;
let state = 0 ;
let timer = 0 ;
let img1, img2, menu, gs, win, l ;
let song, song1, song2 ; 

function preload() {
  
  song = loadSound("Yoshi.mp3") ;
  song1 = loadSound("yay.mp3") ;
  song2 = loadSound("boom.mp3") ;
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  img1 = loadImage("assets/belugaSprite.jpg") ; 
  img2 = loadImage("assets/diablo.jpg") ; 
  menu = loadImage("assets/menu.jpg") ;
  l = loadImage("assets/noSaucce.jpg") ;
  win = loadImage("assets/goated.jpg") ;
  
  
  

  for (let i = 0; i < 10; i++) {
    cars.push(new Car());
  }
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  
  frogPos = createVector(width/2, height-80) ;
}

function draw() {
  //game() ;
  switch(state ) {
    case 0: //menu
      background ("orange") ;
      image(menu, windowWidth/2, windowHeight/2) ;
      //text ("welcome", 100 ,100) ;
      break ;
      
      case 1: //game
      game() ;
      if (timer ==0) {
        song.play() ;
      }
      timer++ ;
      if (timer > 34*60){
        state = 3;
      }
      endTimer = timer ;
      break ;
      
      case 2: //win
      background ("purple") ;
      song.stop() ; 
      if (timer ==endTimer) {
        song1.play() ;
      }
      timer++ ;
      image(win, width/2, height/2) ;
      fill("purple") ;
      //text ("win", 100 ,100) ;
      break;
      
    case 3: //lose
      background ("black") ;
      song.stop() ;
      if (timer ==endTimer) {
        song2.play() ;
      }
      timer++ ;
      image(l, width/2, height/2) ;
      fill("black") ;
      //text ("lose", 100 ,100) ;
      break;
  }
  
  
}

function resetTheGame() {
  cars = [] ;
   for (let i = 0; i < 10; i++) {
    cars.push(new Car());
  }
  timer = 0;
  
}

function mouseReleased() {
  switch(state) {
    case 0:
      state = 1 ;
      break ;
      
    case 2:
      state = 0;
      resetTheGame() ;
      break;
      
      case 3:
      state = 0;
      resetTheGame() ;
      break ;
      
  }
}

function game(){
  background("pink");
  
  for (let i=0 ; i<cars.length ; i++) {
    cars[i].display() ;
    cars[i].move() ;
    
    if (cars[i].pos.dist(frogPos) < 50) {
  	cars.splice(i, 1);
	}

  }
  
  if(cars.length ==0) {
    state = 2 ;
  }
  
  //ellipse(frogPos.x, frogPos.y, 50, 50) ;
  image(img1, frogPos.x, frogPos.y, 50, 50);
  checkForKeys() ;
}

function checkForKeys() {
  if (keyIsDown(LEFT_ARROW)) frogPos.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) frogPos.x += 5;
  if (keyIsDown(UP_ARROW)) frogPos.y -= 5;
  if (keyIsDown(DOWN_ARROW)) frogPos.y += 5;
}

//class has constructors attributes and methods
class Car {
  // The class's constructor and attributes
  constructor() {
    this.pos = createVector(random(width),random(height)) ;
    this.vel = createVector(random(-10,10),random(-10,10));
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.o = random(255);
  }

  // methods - these get called with a dot after the variable

  display() {
    //fill(this.r, this.g, this.b, this.o);
    //rect(this.pos.x, this.pos.y, 50, 25);
    image(img2, this.pos.x, this.pos.y, 25, 50);
  }

  move() {
    this.pos.add(this.vel) ;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    
  }
}
