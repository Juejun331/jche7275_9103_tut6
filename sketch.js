let img;
let canvasSize=1;
let attForce = 0.01;
let repForce = 0.01;

let particles = [];
let personParticles=[];
let numParticle = 20000;
let numSegments=120;
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

function preload() {
	img = loadImage('Images/Scream.jpeg');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(width, height);
  console.log(width);
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
  boatX=random(width);
  boatY=random(0.5*height);
  boatDir=0;
  //make sure the position of boat is in the lake
  if((boatX*40/81+25/71*width)<boatY){
    boatY=boatX*40/81+25/71*width;
  }
  else if(boatY<21/71*width){
    boatY=21/71*width;
}
}
function setup() {
	canvasSize = min(windowWidth, windowHeight);
	createCanvas(canvasSize, canvasSize);
	img.resize(width, height);
  console.log(width);
  console.log(height);

	strokeWeight(4/500*width);//the size of ever particle
	background(0);//black background

  push();
  fill(233,197,111);
  rect(0,0,img.width,sky_height);
  pop();

  sky_height=img.height*0.35;
  skySetup();

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
      personParticles.push(new PersonParticle(pX,pY));
    }
  }
  //raddom create a new boat
  boatX=random(img.width);
  boatY=random(0.5*img.height);
  boatDir=0;
  //make sure the position of boat is in the lake
  if((boatX*40/81+30/81*img.height)<boatY){
    boatY=boatX*40/81+30/81*img.height;
  }
  else if(boatY<28/81*img.height){
    boatY=28/81*img.height;
  }

//bridge&2 small people
  slope = (600 - 380) / (100 - 0);
  intercept = 380/1024*img.height;
  personCount=0;
  legStatus=0;
}


function windowResized() {
  if((windowWidth/windowHeight)>(810/1024)){
    resizeCanvas(windowHeight/1024*810, windowHeight);
    img.resize(windowHeight/1024*810, windowHeight);
    pic.resize(windowHeight/1024*810, windowHeight);
    imageWidth=height/1024*810;
    imageHeight=height;
  }else{
    resizeCanvas(windowWidth, windowWidth/810*1024);
    img.resize(windowWidth, windowWidth/810*1024);
    pic.resize(windowWidth, windowWidth/810*1024);
    imageWidth=width;
    imageHeight=width/810*1024;
  }
  sky_height=img.height*0.35;
  skyReSetup();
  //clear the canvas
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //this loops over width
      //This will create a segment for each x and y position
      particles.pop();
      personParticles.pop();
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
      personParticles.push(new PersonParticle(pX,pY));
    }
  }
  //raddom create a new boat
  boatX=random(img.width);
  boatY=random(0.5*img.height);
  boatDir=0;
  //make sure the position of boat is in the lake
  if((boatX*40/81+25/71*width)<boatY){
    boatY=boatX*40/81+25/71*width;
  }
  else if(boatY<21/71*width){
    boatY=21/71*width;
}
}
function draw() {
//Draw a black rectangle with an opacity of 20 to create the trail effect on each frame
	fill(0, 20);
	noStroke();
	rect(0, 0, width, height);
	//update the position of each particle each frame
	for (let p of particles) {
		p.move();
		p.display();
	}

//draw boat
  boat(boatX,boatY);

//bridge&2 people
  originX = 0;
  originY = 380/1024*img.height;
  line1EndX = img.width;
  line1EndY = 870/1024*img.height;
  line2EndX = 0;
  line2EndY = img.height;
  angle1 = atan2(line1EndY - originY, line1EndX - originX);
  angle2 = atan2(line2EndY - originY, line2EndX - originX);
  
  lineWidth = 8/810*img.width;  // Set the line width for the random lines
  numLines = 600;  // Set the number of random lines to draw
  push();
  strokeWeight(lineWidth); 
  drawRandomLines(originX, originY, angle1, angle2, numLines); 

  // Calculate the x based on frameCount and the corresponding y
  //let x = (frameCount % 100);
  let personX = (personCount % 100);
  let personY = slope * personX + intercept;
  
  // Draw the people, positions change over time with the frameCount
  drawPeople(personX, personY);
  pop();
// front person
  for (let p of personParticles) {
    p.move();
  }
  // draw the eyes and mouth area
  drawEyesMouth();
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
    if((this.pos.x*40/81+25/71*height)>this.pos.y&&(redValue<100||blueValue>150)&&this.pos.y>height*0.19){
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
    }else if(this.pos.y<height*0.44&&redValue>180&&greenValue>120&&this.pos.y>height*0.32){
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
    }else if((this.pos.x*79/81+height*0.4)<this.pos.y){
      //draw the bridge, make the bridge particles flow toward the corner 
      if(this.pos.y>=height){
        //if a particle come the margin of the image, move this partivle to the starting point
        this.pos.y=this.pos.y-this.pos.x*79/81;
        this.pos.x=0;
      }
      else{
        //make the particle move follow the direction of the bridge
        if(width>(500/700*height)){
          this.pos.add(5*1,5*79/81);
        }else if(width>(200/700*height)){
          this.pos.add(2*1,2*79/81);
        }else{
          this.pos.add(0.5*1,0.5*79/81);
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
  if((boatX*40/81+25/71*width)<boatY){
    boatAcc.y=-0.2;
    boatY--;
  }
  else if(boatY<21/71*width){
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
    boatX=boatX+10;
    boatVel.add(2,0);
    boatDir=0;
    boatAcc.add(random(-0.1,0.1),random(-0.1,0.1));
    boatAcc.limit(0.5);
    boatVel.add(boatAcc);
    boatVel.limit(2);//make sure the speed of the boat not too fast
  }}
}

//sky
function skySetup() {
  img.loadPixels();

  for (let x = 0; x < img.width; x += sky_space) {
    // Traverse the canvas width and step based on the spacing between sky particles
    for (let y = 0; y < sky_height; y += sky_space) {
      // Traverse the height of the sky particles and step based on the spacing between the sky particles
      const i = 4 * (y * img.width + x); // Calculate the index value of the current pixel
      // Get the color value of a pixel
      const c = [
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
      ];

      // Create a sky particle object
      let particle = new SkyParticle(x, y, c);
      // Add the sky particle object to the array
      sky_particles.push(particle);
    }
  }
}
function skyReSetup() {
  img.loadPixels();
//clear the primary sky particle
  for (let x = 0; x < img.width; x += sky_space) {
    for (let y = 0; y < sky_height; y += sky_space) {
      sky_particles.pop();
    }
  }
  img.loadPixels();
//redraw the particle
  for (let x = 0; x < img.width; x += sky_space) {
    // Traverse the canvas width and step based on the spacing between sky particles
    for (let y = 0; y < sky_height; y += sky_space) {
      // Traverse the height of the sky particles and step based on the spacing between the sky particles
      const i = 4 * (y * img.width + x); // Calculate the index value of the current pixel
      // Get the color value of a pixel
      const c = [
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
      ];

      // Create a sky particle object
      let particle = new SkyParticle(x, y, c);
      // Add the sky particle object to the array
      sky_particles.push(particle);
    }
  }
}
function skyDraw() {
  for (let p of sky_particles) {
    // Traverse sky particle array
    p.update();
    p.draw();
  }
}

class SkyParticle {
  constructor(x, y, c) {
    this.x = x; // The abscissa of the particle
    this.y = y; // The vertical coordinate of the particle
    // color of particles
    this.c = color(c[0], c[1], c[2]);
    this.first = true; // Is it the first particle
    this.initX = x; // initial abscissa
    this.initY = y; // Initial vertical coordinate
    this.frame = 0; // Current frame number
    if (sky_mode == 1) {
      // Choose the maximum number of frames according to the mode
      this.maxFrame = 400;
    } else {
      this.maxFrame = int(random(100, 500));
    }
  }

  draw() {
    noStroke();
    fill(this.c); // Set the fill color of particles
    if (this.first) {
      // If it is the first particle, draw a rectangular fixed background
      rect(this.x, this.y, sky_space, sky_space);
      this.first = false;
    } else {
      // Otherwise draw elliptical particles
      ellipse(this.x, this.y, sky_space, sky_space);
    }
  }

  update() {
    if (frameCount % 2 == 0) {
      // Update position every 2 frames
      let x = this.x * sky_noiseScale; // Calculate the noise value in the x direction
      let y = this.y * sky_noiseScale; // Calculate the noise value in the y direction
      // Set the noise value for the z-axis
      let z = 10000;
      this.x += noise(x, y, z) - 0.5; // Update x coordinate based on noise value
      z = 1;
      this.y += (noise(x, y, z) - 0.5) * 0.5; // Update y coordinate based on noise value
    }

    // Increased frame rate
    this.frame++;

    if (this.frame >= this.maxFrame) {
      // When the number of frames reaches the maximum number of frames, reset the particle position
      this.frame = 0; // Reset frame number to 0
      this.x = this.initX; // Reset x coordinate to initial value
      this.y = this.initY; // Reset x coordinate to initial value
    }
  }
}

function drawRandomLines(originX, originY, angle1, angle2, numLines) {

  for (let i = 0; i < numLines; i++) {  // Loop through the specified number of lines
    let angle = random(angle1, angle2); 
    let length = random(20/1024*img.height, 1500/1024*img.height); 

    // Calculate the end point of the line using trigonometry
    let endX = originX + length * cos(angle);
    let endY = originY + length * sin(angle);
    
    lineSegment(originX, originY, endX, endY);  // Draw the line segment
  }
}

function lineSegment(x1, y1, x2, y2) {

  let d = dist(x1, y1, x2, y2); // Calculate the distance between the start and end points of the line

  let start = 0; 

  // Continue drawing line segments until the full line is drawn
  while (start < d) { 

    let segLength = random(10/1024*img.height, 20/1024*img.height); 
    
    // Calculate the interpolation ratios for segment start and end points
    let a = start / d;
    let b = (start + segLength) / d;
    
    // Interpolate to find the start and end points of the segment
    let startX = lerp(x1, x2, a);
    let startY = lerp(y1, y2, a);
    let endX = lerp(x1, x2, b);
    let endY = lerp(y1, y2, b);

    // Calculate the midpoint X,Y coordinate for color sampling
    let midX = (startX + endX) / 2; 
    let midY = (startY + endY) / 2; 
    // Sample the color from the background image at the midpoint and set opacity
    let col = img.get(midX, midY);
    col[3] = 150; 
    stroke(col); 
    line(startX, startY, endX, endY);
    // Increment the start position for the next segment
    start += segLength; 
  }
}

function drawPeople(x, y) {
  // Scale between 0.8 and 2 as y goes from 380 to 600
  let scaleFactor = map(y, 300/1024*img.height, 1800/1024*img.height, 1/810*img.height, 20/810*img.height); 
  push();
  translate(x, y);  // Translate to the position where the people will be drawn
  scale(scaleFactor);  // Apply the scaling
  noStroke();
  // Set fill color and draw ellipses for the first person
  fill(108, 92, 59);
  ellipse(0, -30/1024*img.height, 10/810*img.width, 12/1024*img.height);
  ellipse(0, -5/1024*img.height, 20/810*img.width, 45/1024*img.height);
  //leg
  stroke(108, 92, 59);
  strokeWeight(2);
  if(legStatus==0){
    line(-2/810*img.width,17/1024*img.height,-2/810*img.width,35/1024*img.height);
    line(2/810*img.width,17/1024*img.height,2/810*img.width,39/1024*img.height);
    stroke(48, 58, 68);
    line(8/810*img.width,33/1024*img.height,8/810*img.width,50/1024*img.height);
    line(12/810*img.width,33/1024*img.height,12/810*img.width,54/1024*img.height);
    legStatus++;
  }else{
    line(-2/810*img.width,17/1024*img.height,-5/810*img.width,35/1024*img.height);
    line(2/810*img.width,17/1024*img.height,5/810*img.width,39/1024*img.height);
    stroke(48, 58, 68);
    line(8/810*img.width,33/1024*img.height,5/810*img.width,50/1024*img.height);
    line(12/810*img.width,33/1024*img.height,15/810*img.width,54/1024*img.height);
    legStatus=0;
  }
  noStroke();
  // Set a different fill color and draw ellipses for the second person
  fill(48, 58, 68);
  ellipse(10/810*img.width, -10/1024*img.height, 10/810*img.width, 12/1024*img.height);
  ellipse(10/810*img.width, 15/1024*img.height, 20/810*img.width, 45/1024*img.height);
  pop();
  personCount++;
  if(personCount>400){
    personCount=0;
  }
}


class PersonParticle {
 
  constructor(pX, pY) {
    this.pos = createVector(pX, pY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.color =pic.get(pX, pY);
    this.initialX = pX; // Store the initial horizontal position
    this.initialY = pY; // Store the initial vertical position
  }
  
  move() {
    angleMode(DEGREES);
    let redValue = red(this.color);
    let blueValue = blue(this.color);
    let greenValue = green(this.color);

    if(blueValue <80 && redValue <100 && greenValue < 100){  
      this.vel.mult(0.97/810*img.width);
      this.vel.limit(3/810*img.width);
      this.vel.add(random(-0.01,0.01),0.3);
      let amplitude = width/30/810*img.width;  
      let frequency = 0.6/810*img.width;
      // to draw the body strok in a sin curve 
      this.pos.x = this.initialX + amplitude * sin(frequency * this.pos.y)-width/30/810*img.width;
      this.pos.add(this.vel);  
      //draw the body line
        push();
        fill( this.color); // Circle color
        noStroke();
        if(this.pos.y>0.65*img.height){
          ellipse(this.pos.x+40/810*img.width, this.pos.y-10/1024*img.height, 6/810*img.width, random(15,35)/1024*img.height); // Draw a circle based on particle's position
        }
        pop();
       
      //if the stroke goes beyond the convas, reset to the orginal position 
        if (this.pos.y>=img.height*0.9){
          this.pos.y = this.initialY; 
        }
      } 

      else 
      { // define the face area 
        this.pos.add(0,random(-1,1)/1024*img.height); 
        push();
        fill( this.color); // Circle color
        rotate(PI/4.0);
        noStroke();
        let translateX = 0;
        let translateY = sin(frameCount) * 10/1024*img.height;
        translate(translateX, translateY);
        ellipse(this.pos.x, this.pos.y, random(15,25)/810*img.width, 5/1024*img.height); // Draw a circle based on particle's position
        pop();
      } 
      angleMode(RADIANS);
  } 
}
//draw the changed eyes & mouth of the front person 
function drawEyesMouth(){
  push(); 
  fill(117,100,73);
  stroke(51);
  strokeWeight(2/810*img.width);
  let eyeheight=random(0,40)/1024*img.height;
  ellipse (img.width*355/810,img.height* 550/1024,30/810*img.width,eyeheight);
  ellipse (img.width*410/810,img.height* 550/1024,30/810*img.width,eyeheight);
  ellipse (img.width*380/810,img.height* 620/1024,20/810*img.width,eyeheight);
  pop();
}
