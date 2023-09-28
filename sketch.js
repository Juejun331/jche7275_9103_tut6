let Imagebg;
let waveSeg;
let xScale, yScale, centerX, centerY;
function setup() {

  createCanvas(810, 1024);
  Imagebg = loadImage("Images/background.jpg");
  waveSeg=1;
}

function draw() {
  background(220);
  image(Imagebg,0,0);
  //blue lake
  blueLake();
  //white lake

  //yellow
  fill('#d5b984');
  noStroke();
  //ellipse(220,400,350,100);
  //boat
  rect(0,360,500,20);
  ellipse(500,370,40,20);
  ellipse(200,430,500,130);
  rect(0,370,50,20);
}
function blueLake(){
  noFill();
  stroke(63,60,51);
  strokeWeight(5);
  //blue lake
  arc(178, 542, 617, 500, 1.2*PI, 1.7*PI, OPEN);
  arc(380, 80, 617, 500, 0.3*PI, 0.55*PI, OPEN);
  arc(692, 512, 617, 500, 1.31*PI, 1.7*PI, OPEN);
  stroke(40,50,90);
  waveSeg=10;
  for(i=0;i<6;i++){
    for(j=0;j<waveSeg;j++){
      
    }
    arc(178, 542, 617, 480-20*i, 1.2*PI, (1.705+0.005*i)*PI, OPEN);
    arc(380, 80, 617, 515+15*i, 0.3*PI, 0.55*PI, OPEN);
    arc(690, 512, 617, 485-15*i, 1.31*PI, 1.7*PI, OPEN);
  }
  arc(380, 80, 617, 515+15*5, 0.3*PI, 0.55*PI, OPEN);
  //blue
  stroke(50,80,180);
  for(i=0;i<6;i++){
    arc(340-i*10, 370, 800-i*25, 130-20*i, (1.937+i*0.009)*PI, (2.1-i*0.015)*PI, OPEN);
  }
  //grey blue
  stroke(40,60,120);
  for(i=0;i<15;i++){
    arc(350+i*10, 370, 800, 150+15*i, (1.934+i*0.003)*PI, 2.1*PI, OPEN);
  }
  //green
  stroke(34,80,60);
  for(i=0;i<23;i++){
    arc(830+i*10, 610, 610, 340-15*i, (0.88-0.06*i)*PI, (1.24+0.01*i)*PI, OPEN);
  }
  //green
  stroke(100,130,120);
  for(i=0;i<23;i++){
    arc(730+i*10, 875, 610, 340-15*i, (0.88-0.06*i)*PI, (1.24+0.01*i)*PI, OPEN);
  }
  //brown
  stroke(120,54,35);
  for(i=0;i<3;i++){
    arc(820-i*10, 610, 610, 355+15*i, (0.86+0.006*i)*PI, (1.23-0.005*i)*PI, OPEN);
  }
  //black
  stroke(0);
  for(i=0;i<5;i++){
    arc(790-i*10, 610, 610, 400+15*i, (0.86-0.005*i)*PI, (1.215-0.001*i)*PI, OPEN);
  }
  //blue
  stroke(50,80,180);
  for(i=0;i<10;i++){
    arc(740-i*10, 610, 610, 475+15*i, (0.83-0.007*i)*PI, (1.210+0.006*i)*PI, OPEN);
  }
  for(i=0;i<25;i++){
    arc(640-i*10, 610, 610, 625+15*i, (0.75+0.01*i)*PI, (1.210-0.002*i)*PI, OPEN);
  }
  //     x1, y1,           midx,midy,x2,   y2
  //bezier(0, 355, 150, 250, 233, 304, 313, 320); 
  
}