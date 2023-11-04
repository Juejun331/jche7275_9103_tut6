//number of particles for each types
let  num = 3000;
// three types of particles a, b and c
var particles_a = [];
var particles_b = [];
var particles_c = [];
var particles_d = [];
var particles_e = [];
var particles_f = [];
var fade = 100; // the length of the particle tail
var radius = 3; // radius of the particles

//scale of curviness of the noise 
let noiseScale = 300;

//how often the direction of the noise change
let noiseStrength = 1.2;


function setup() {
  createCanvas(810, 1024);
  fill(140,140,180); 
  noStroke();
  rect(0, 0, width, height);
  noStroke();
  for (let i=0; i<num; i++) {
    let loc_a = createVector(random(width*1.2), random(height), 2);
    let angle_a = random(TWO_PI);
    let dir_a = createVector(cos(angle_a), sin(angle_a));
		let loc_b = createVector(random(width*1.2), random(height), 2);
    let angle_b = random(TWO_PI);
    let dir_b = createVector(cos(angle_b), sin(angle_b));
		let loc_c = createVector(random(width*1.2), random(height), 2);
    let angle_c = random(TWO_PI);
    let dir_c = createVector(cos(angle_c), sin(angle_c));

    let loc_d = createVector(random(width*1.2), random(height), 2);
    let angle_d = random(TWO_PI);
    let dir_d = createVector(cos(angle_d), sin(angle_d));

    let loc_e = createVector(random(width*1.2), random(height), 2);
    let angle_e = random(TWO_PI);
    let dir_e = createVector(cos(angle_e), sin(angle_e));

    let loc_f = createVector(random(width*1.2), random(height), 2);
    let angle_f = random(TWO_PI);
    let dir_f = createVector(cos(angle_e), sin(angle_e));
    //particles[i]= new Particle(loc, dir, speed); slower particles will looks shorter 
		particles_a[i] = new Particle(loc_a, dir_a, 2);
		particles_b[i] = new Particle(loc_b, dir_b, 2);
		particles_c[i] = new Particle(loc_c, dir_c, 2);
    particles_d[i] = new Particle(loc_d, dir_d, 2);
    particles_e[i] = new Particle(loc_e, dir_e, 2);
		particles_f[i] = new Particle(loc_f, dir_f, 3);
  }
}

function draw() {
	
	//smooth();
  //background(0); // comment the background to see the particle tails uncomment to hide the tails
			
  fill(140,140,180, 5); // put a blue for hiding the tails 
  noStroke();
  rect(0, 0, width, height);
    
  for (let i=0; i<num; i++) {
		
		fill(40,50,180, fade); //blue
		particles_a[i].move();
		particles_a[i].update(radius);
		particles_a[i].checkEdges();

		fill(90,150,110, fade); //green
		particles_b[i].move();
		particles_b[i].update(radius);
		particles_b[i].checkEdges();

    fill(40,50,180, fade); //blue
    particles_c[i].move();
    particles_c[i].update(radius);
    particles_c[i].checkEdges();

    
		particles_d[i].move();
		particles_d[i].update(radius);
		particles_d[i].checkEdges();

    fill(0, fade); //black
		particles_e[i].move();
		particles_e[i].update(radius);
		particles_e[i].checkEdges();

    //fill(height, mouseY , mouseX , fade); // colorchange
    let mR=mouseY;
    let mG=mouseX;
    while(mR>205,mG>205){
      mR--;
      mG--;
    }
    fill(mR, mG , 255 , fade); // colorchange
		particles_f[i].move();
		particles_f[i].update(radius);
		particles_f[i].checkEdges();


		
  }
}

let Particle = function(loc_, dir_, speed_) {
  this.loc = loc_;
	this.dir = dir_;
	this.speed = speed_;
	this.d = 1;
};

Particle.prototype.run = function() {
	  this.move();
    this.checkEdges();
    this.update();
};

// Method to move position
Particle.prototype.move = function(){
	  this.angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(this.angle)+sin(this.angle)-sin(this.angle);
    this.dir.y = sin(this.angle)-cos(this.angle)*sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed*this.d);
    this.loc.add(this.vel);
};

// Method to chech edges 
Particle.prototype.checkEdges = function(){
  if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
    while ((this.loc.y<298&&this.loc.x<399)||this.loc.y < 269) {
      this.loc.x = random(width*1.2);    
      this.loc.y = random(height);
    }
    
};

// Method to chech green part edges 
Particle.prototype.checkEdgesGreen = function(){
  if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
    while ((this.loc.y<298&&this.loc.x<399)||this.loc.y < 269) {
      this.loc.x = random(width*1.2);    
      this.loc.y = random(height);
    }
    
};


// Method to update position
Particle.prototype.update = function(r){
    ellipse(this.loc.x, this.loc.y, r);
};
