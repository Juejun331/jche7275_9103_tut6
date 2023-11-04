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
let lakeMidRedVel;
let lakeMidRedAcc;
let lakeMidGreenVel;
let lakeMidGreenAcc;

let imageWidth;
let imageHeight;

function preload() {
	img = loadImage('Images/Scream.jpeg');
}
function windowResized() {
  if((windowWidth/windowHeight)>(810/1024)){
    resizeCanvas(windowHeight/1024*810, windowHeight);
    img.resize(windowHeight/1024*810, windowHeight);
    imageWidth=height/1024*810;
    imageHeight=height;
  }else{
    resizeCanvas(windowWidth, windowWidth/810*1024);
    img.resize(windowWidth, windowWidth/810*1024);
    imageWidth=width;
    imageHeight=width/810*1024;
  }
  //img.resize(width, height);
  //console.log(width);
  //clear the canvas
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //this loops over width
      //This will create a segment for each x and y position
      particles.pop();
    }
  }
//redraw the particle
segmentWidth = img.width / numSegments;
segmentHeight = img.height / numSegments;
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
  //raddom create a new boat
  boatX=random(img.width);
  boatY=random(0.5*img.height);
  boatDir=0;
  //make sure the position of boat is in the lake
  if((boatX*40/81+25/81*img.height)<boatY){
    boatY=boatX*40/81+25/81*img.height;
  }
  else if(boatY<25/81*img.height){
    boatY=25/71*img.height;
}
}
function setup() {
	//canvasSize = min(windowWidth, windowHeight);
	
	//img.resize(width, height);
  if((windowWidth/windowHeight)>(810/1024)){
    createCanvas(windowHeight/1024*810, windowHeight);
    img.resize(windowHeight/1024*810, windowHeight);
    imageWidth=height/1024*810;
    imageHeight=height;
  }else{
    createCanvas(windowWidth, windowWidth/810*1024);
    img.resize(windowWidth, windowWidth/810*1024);
    imageWidth=width;
    imageHeight=width/810*1024;
  }

	strokeWeight(4/500*img.width);//the size of ever particle
	background(0);//black background

	boatVel = createVector(0, 0);
  boatAcc = createVector(0, 0);

  bridgeVel=createVector(79/81, 1);
  bridgeAcc=createVector(0, 0);

  lakeMidRedVel=1;
  lakeMidRedAcc=0;
  lakeMidGreenVel=1;
  lakeMidGreenAcc=0;

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
//use for loop to get every segment color of img and use particles array to store them, reference:https://canvas.sydney.edu.au/courses/53019/pages/week-7-tutorial?module_item_id=2098597
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
  //raddom create a new boat
  boatX=random(img.width);
  boatY=random(0.5*img.height);
  boatDir=0;
  //make sure the position of boat is in the lake
  if((boatX*40/81+25/81*img.height)<boatY){
    boatY=boatX*40/81+25/81*img.height;
  }
  else if(boatY<25/81*img.height){
    boatY=25/81*img.height;
}
}
function draw() {
//Draw a black rectangle with an opacity of 20 to create the trail effect on each frame
	fill(0, 20);
	noStroke();
	rect(0, 0, img.width, img.height);
	//update the position of each particle each frame
	for (let p of particles) {
		p.move();
		p.display();
	}
//draw boat
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
		this.color = img.get(x, y);  //get the color of this particle from image
	}
	
	move() {
    //use color to divide the area of picture
    let blueValue=blue(this.color);
    let redValue=red(this.color);
    let greenValue=green(this.color);
    //usr if to get the area of blue lake
    if((this.pos.x*40/81+40/81*img.height)>this.pos.y&&(redValue<100||blueValue>150)&&this.pos.y>img.height*0.19){
      let attraction = p5.Vector.sub(this.target, this.pos);
      attraction.mult(attForce);
      //let tmpForce = p5.Vector.sub(createVector(mouseX, mouseY), this.pos).limit(10);
      //make lake particle leave away from the boat to imitate that the boat whipped up waves
      //the reference of the use of tmpForce & attraction from https://openprocessing.org/sketch/1084140
      let tmpForce = p5.Vector.sub(createVector(boatX, boatY), this.pos).limit(5/700*img.height);
      let repulsion = tmpForce.copy().normalize().mult(-10/700*img.height).sub(tmpForce);
      repulsion.mult(repForce);
      this.acc = p5.Vector.add(attraction, repulsion);
      this.vel.mult(0.97);
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      //make sure the lake particle not too far from the lake
      if(this.pos.y<=img.height*0.19){
        this.pos.y=img.height*0.19+1;
      }
    }else if(this.pos.y<img.height*0.44&&redValue>180&&greenValue>120&&this.pos.y>img.height*0.32){
    //add random gradient of color to the stationary particles in the middle of the lake
      lakeMidRedAcc=random(-0.5,0.5);
      lakeMidRedAcc=random(-0.5,0.5);
    //make the change of color not too fast,add ease effect
      if(lakeMidRedAcc>=2){
        lakeMidRedAcc=2;
      }else if(lakeMidRedAcc<=-2){
        lakeMidRedAcc=-2;
      }
      if(lakeMidGreenAcc>=2){
        lakeMidGreenAcc=2;
      }else if(lakeMidGreenAcc<=-2){
        lakeMidGreenAcc=-2;
      }
      lakeMidRedVel=lakeMidRedVel+lakeMidRedAcc;
      lakeMidGreenVel=lakeMidGreenVel+lakeMidGreenAcc;
      if(lakeMidRedVel>=10){
        lakeMidRedVel=10;
      }else if(lakeMidRedVel<=-10){
        lakeMidRedVel=-10;
      }
      if(lakeMidGreenVel>=10){
        lakeMidGreenVel=10;
      }else if(lakeMidGreenVel<=-10){
        lakeMidGreenVel=-10;
      }
      //color[0] is red value of the pixel of the image, color[1] is green value of the pixel of the image, reference:https://p5js.org/reference/#/p5.Image/pixels
      this.color[0]+=lakeMidRedVel;
      this.color[1]+=lakeMidGreenVel;
      //set the margin of the color change, improve the fault tolerance rate
      if(this.color[0]>=255){
        this.color[0]=255;
        lakeMidRedVel=-5;
      }else if(this.color[0]<=180){
        this.color[0]=180;
        lakeMidRedVel=5;
      }
      if(this.color[1]>=255){
        this.color[1]=255;
        lakeMidGreenVel=-5;
      }else if(this.color[1]<=120){
        this.color[1]=120;
        lakeMidGreenVel=5;
      }
    }else if((this.pos.x*93/81+img.height*0.4)<this.pos.y){
      //draw the bridge, make the bridge particles flow toward the corner 
      if(this.pos.y>=img.height){
        //if a particle come the margin of the image, move this partivle to the starting point
        this.pos.y=this.pos.y-this.pos.x*93/81;
        this.pos.x=0;
      }
      else{
        //make the particle move follow the direction of the bridge
        if(img.width>(500/700*img.height)){
          this.pos.add(5*1,5*93/81);
        }else if(img.width>(200/700*img.height)){
          this.pos.add(2*1,2*93/81);
        }else{
          this.pos.add(0.5*1,0.5*93/81);
        }
      }

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
  //use semicircle, rectangle, line to form a boat
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
  //make sure boat move in the blue lake
  if((boatX*40/81+25/81*img.height)<boatY){
    boatAcc.y=-0.2;
    boatY--;
  }
  else if(boatY<25/81*img.height){
    boatY++;
    boatAcc.y=0.2;
  }else if(boatDir==1){
    boatX--;
    boatY--;
    /*if(boatX<=0){
      boatVel.mult(-1);
      boatX=boatX+boatVel.x;
    }*/
  }else{
    // make boat move randomly, and add ease effect
    boatAcc.add(random(-0.1,0.1),random(-0.1,0.1));
    boatAcc.limit(0.5);
    boatVel.add(boatAcc);
    boatVel.limit(2);//make sure the speed of the boat not too fast
    boatX=boatX+boatVel.x;
    boatY=boatY+boatVel.y;
  if(boatX>=img.width){
    boatDir=1;
  }else if(boatX<=0){
    boatX++;
    boatVel.add(2,0);
    boatDir=0;
  }}
}