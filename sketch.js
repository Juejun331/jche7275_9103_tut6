let img;
let canvasSize=1;
let attForce = 0.01;
let repForce = 0.01;

let particles = [];
let numParticle = 20000;
let numSegments=150;
let particlesPrimary=[];
let m=[];
let boatX;
let boatY;
let boatDir;
let boatVel;
let boatAcc;
let bridgeVel;
let bridgeAcc;

function preload() {
	img = loadImage('Images/Scream.jpeg');
}

function setup() {
	canvasSize = min(windowWidth, windowHeight);
	createCanvas(canvasSize, canvasSize);
	img.resize(width, height);
  console.log(width);
  console.log(height);
	strokeWeight(5);
	background(0);

	boatVel = createVector(0, 0);
  boatAcc = createVector(0, 0);

  bridgeVel=createVector(79/81, 1);
  bridgeAcc=createVector(0, 0);

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  /*
  Divide the original image into segments, we are going to use nested loops
  lets have a look at how nested loops work
  first we use a loop to move down the image, 
  we will use the height of the image as the limit of the loop
  then we use a loop to move across the image, 
  we will use the width of the image as the limit of the loop
  Lets look carefully at what happens, the outer loop runs once, so we start at the top of the image
  Then the inner loop runs to completetion, moving from left to right across the image
  Then the outer loop runs again, moving down 1 row image, and the inner loop runs again,
  moving all the way from left to right
  */

  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //this loops over width
      //This will create a segment for each x and y position
      let pX=segXPos;
      let pY=segYPos;
      particles.push(new Particle(pX,pY));
    }
  }
  boatX=random(width);
  boatY=random(0.5*height);
  boatDir=0;
  if((boatX*40/81+250)<boatY){
    boatY=boatX*40/81+250;
  }
  else if(boatY<210){
    boatY=210;
  //boat(bX,bY)
}
}
function draw() {

	fill(0, 20);
	noStroke();
	rect(0, 0, width, height);
	
	for (let p of particles) {
		p.move();
		p.display();
	}

  boat(boatX,boatY);
}

class Particle {
	constructor(x, y) {
    this.x = x;
    this.y = y;
		this.pos = createVector(x, y);
		this.target = this.pos.copy();
		this.vel = createVector(0,0);
		this.acc = createVector(0, 0);
		this.color = img.get(x, y);
	}
	
	move() {
    let blueValue=blue(this.color);
    let redValue=red(this.color);
    let greenValue=green(this.color);
    if((this.pos.x*40/81+250)>this.pos.y&&(redValue<100||blueValue>150)&&this.pos.y>height*0.18){
      let attraction = p5.Vector.sub(this.target, this.pos);
      attraction.mult(attForce);
      //let tmpForce = p5.Vector.sub(createVector(mouseX, mouseY), this.pos).limit(10);
      let tmpForce = p5.Vector.sub(createVector(boatX, boatY), this.pos).limit(10);
      let repulsion = tmpForce.copy().normalize().mult(-30).sub(tmpForce);
      repulsion.mult(repForce);
      this.acc = p5.Vector.add(attraction, repulsion);
      this.vel.mult(0.97);
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
    }else if((this.pos.x*79/81+width*0.4)<this.pos.y){
      if(this.pos.y>=height){
        this.pos.x=this.pos.x-((this.pos.y-width*0.3)*81/79);
        this.pos.y=this.pos.y-this.pos.x*79/81-width*0.7;
        this.pos.x=0;
        //this.vel.add(-79/81,-1);
      }
      else{
        this.vel.add(0.1*90/81,0.1);
        this.pos.add(this.vel);
      }
      //this.pos.add(this.vel);
    }
	}
	display() {
		stroke(this.color);
		point(this.pos.x, this.pos.y);
	}
	
}


function boat(x,y){
  //let bX=mouseX;
  //let bY=mouseY;
  let bX=x;
  let bY=y;
  push();
  fill(255);
  stroke(255);
  strokeWeight(1);
  arc(bX,bY,20,8,0*PI,1*PI,OPEN);
  line(bX,bY,bX,bY-7);
  noStroke();
  fill(255,255,255);
  rect(bX,bY-7,5,2);
  pop();
  if((boatX*40/81+250)<boatY){
    boatAcc.y=-0.5;
    boatY--;
  }
  else if(boatY<210){
    boatY++;
    boatAcc.y=0.5;
  }else if(boatDir==1){
    boatX--;
    boatY--;
    if(boatX<=0){
      boatVel.mult(-1);
      boatX=boatX+boatVel.x;
    }
  }else{
    boatAcc.add(random(-0.1,0.1),random(-0.1,0.1));
    boatAcc.limit(0.5);
    boatVel.add(boatAcc);
    boatVel.limit(2);
    boatX=boatX+boatVel.x;
    boatY=boatY+boatVel.y;
  if(boatX>=width){
    boatDir=1;
  }else if(boatX<=0){
    boatX++;
  }}
}