const PI =  3.14159265358979323846;
var mode = 0;

/*---------------------------------------------------------*/
//AYNA IŞIN
var r,centerX,centerY,xall,w,h;
var n = 6;
var offset = 15;
var lineCord = [];
var refCords = [];
const renderA = PI/2.8;
var angle = 0;
var logo ;

var buttonStr = ["Merkez Işını", "Odak Işını", "Paralel Işın", "3F Işını", "KIRILMA","BOY ORANI"];
var buttonStrMirH = ["Merkez Cismi", "Odak Cismi", "Sonsuz Cismi", "3F Cismi", "TÜMSEK AYNA","KIRILMA"];
/*---------------------------------------------------------*/
//AYNA GÖRÜNTÜ
var r1,f1,vecMirH,centerXMirH,centerYMirH;
/*---------------------------------------------------------*/

/*---------------------------------------------------------*/

/*---------------------------------------------------------*/
const openingTime = 10000;
const animationTime = 2500;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 alert("Bu program telefon veya tablet desteklememektedir.Kullanıma devam ederseniz büyük dengesizlikler ile karşılaşabilirsiniz.");
}

function preload() {
  logo = loadImage('static/images/iconGray.png');
  vecMirH = createVector(0,0);
}

function setup() {
  createCanvas(window.screen.availWidth,window.screen.availHeight-78);
  /*---------------------------------------------------------*/
  r = height/3;
  centerY = height/2;
  centerX = r;

  xall = width*(0.82);
  w = width*(0.14);
  h = (height*(0.71)-offset*(n-1))/n;

  /*---------------------------------------------------------*/
  r1 = height/3
  f1 = r1/2;
  centerYMirH = height/2;
  centerXMirH = width*(0.4)

  /*---------------------------------------------------------*/
  translate(0, height/2);
  //Başlangıç Doğrusu////////////////////////////////
  for (var i = 0; i<lineCord.length; i++) {
    lineCord[i] = ((i+1)%2)*(200+200*i)+(-1*(i%2)*100);
  }

  background(31);
  push();
  translate(centerX, centerY);
  noFill();
  //ellipse(0, 0, r*2, r*2);
  fill(31);
  stroke(31);
  rect(0, -r, r, 2*r);
  pop();
}

var menuMouse = function(){
  return (mouseX > width*(0.8))& (mouseY > height*(0.03) & (mouseX < width*(0.98))& (mouseY < height*(0.97)));
}

var buttonMouse = function(xa,wa,ya,ha,press) {
  return ((mouseX >xa && mouseX<xa+wa)&&(mouseY>ya && mouseY<ya+ha)&&(mousePressed||!press));
}

var sgn = function(f) {
  if(f>0) return 1;
  if(f<0) return -1;
  return 0;
}

var interC = function(ax,ay,bx,by) {
  var res = [];
  ay = - ay;
  by = -by;
  fill(0, 200, 0);
  textSize(20);

  var m = (ay-by)/(ax-bx);
  if (ay-by == 0) {
    var x = -sqrt(pow(r, 2)-pow(ay, 2));
    var mP = -ay/(x+r/2);
    var nP = ay;

    res[0] = x;
    res[1] = -ay;
    res[2] = width;
    res[3] = mP*(width)+nP;
    res[4] = -PI;
    res[5] = 1.0;

    return res;
  }
  var n = ay-m*ax;
  var dx = ax-bx;
  var dy = ay-by;
  var dr = dist(ax, ay, bx, by);


  var detD = ax*by-bx*ay;
  var delta = pow(r*dr, 2)-pow(detD, 2);
  var x = -((detD*dy) + sgn(m)*sgn(dy)*dx*sqrt(delta)) / pow(dr, 2);
  var y = (-(detD*dx)+ sgn(m)*abs(dy)*sqrt(delta))/(pow(dr, 2));

  //println(x, y);

  var interA = -n/m+r;
  var interB = 1/(2/r - 1/interA) - centerX;

  var mP = y/(x-interB);
  var nP = y-mP*x;

  res[0] = x;
  res[1] = y;
  res[2] = width;
  res[3] = mP*(width)+nP;
  res[4] = interA/(r/2);
  res[5] = interB/(r/2)+2;


  return res;
}
var refCal = function(x,y){
  var c = [];
  c[0] = (x*f1)/(x-f1);
  c[1] = -c[0]*y/x;

  return c;
}

function animation(){
  if(millis() < openingTime){
    textAlign(CENTER,CENTER);
    noStroke();
    fill(31,map(-millis()+openingTime-animationTime,0,animationTime,0,255));
    rect(-50,-50,width+100,height+100);
    fill(200,map(-millis()+openingTime-animationTime,0,animationTime,0,255));
    textSize(50);
    noStroke();
    text("OPTİK SİMULASYONU",width/2,height*(0.4));
    textSize(20);
    text("Prof. Dr. Fuat Sezgin Fen Lisesi öğrencileri için özel olarak yapılmıştır.",width/2,height*(0.5));
    textSize(10);
    text("Cafer SELLİ",width-50,height-20);
    noFill();
    strokeWeight(5);

    /*stroke(200,map(-millis()+openingTime-animationTime,0,animationTime,0,20));
    arc(width/2,height*(0.8),80,80,0,TWO_PI);*/

    tint(255,map(-millis()+openingTime-animationTime,0,animationTime,0,255));
    imageMode(CENTER,CENTER);
    image(logo,width/2,height*(0.8),80*cos(angle),80);

    /*stroke(200,map(-millis()+openingTime-animationTime,0,animationTime,0,255));
    arc(width/2,height*(0.8),80,80,-PI/6-angle,PI/6-angle);*/
    angle+=0.1;
  }
}
function mirrorRay() {
  background(31);

  //AYNA VE IŞIN///////////////////////////////////

  push();
  strokeWeight(5);
  stroke('#3163C4');
  translate(centerX, centerY);
  noFill();
  arc(0, 0, r*2, r*2, PI-renderA, PI+renderA);
  //ellipse(0, 0, r*2, r*2);
  //fill(31);
  //stroke(31);
  //rect(0, r, r, -2*r);
  stroke(200);
  line(lineCord[0], lineCord[1], lineCord[2], lineCord[3]);
  var c = interC(lineCord[0], lineCord[1], lineCord[2], lineCord[3]);
  line(lineCord[2], lineCord[3], c[0], c[1]);
  stroke(0, 0, 200);
  line(c[0], c[1], c[2], c[3]);
  stroke(200, 0, 0);
  point(c[0], c[1]);
  pop();

  //ASAL EKSEN/////////////////////////////////////

  stroke(0, 200, 0);
  strokeWeight(2);
  line(0, height/2, width, height/2);
  strokeWeight(5);
  stroke(200, 0, 0);
  fill(200, 0, 0);

  //MENU RENDER////////////////////////////////////


  point(centerX, centerY);
  noStroke();
  text("M 'Merkez'", centerX-10, centerY -10);

  stroke(200, 0, 0);
  point(centerX/2, centerY);
  noStroke();
  text("F 'Odak' ", centerX/2-10, centerY -10);

  fill('#3163C4');
  text("Çukur Ayna", centerX - r+50, centerY - r+10);

  textSize(16);

  stroke(50);
  fill(200);
  rect(width*(0.8), height*(0.03), width*(0.18), height*(0.94), 10);

  fill(0);
  var tempC4 = (c[4] == -PI)?"Paralel":str(round(c[4]*100)/100)+" F";
  var tempC5 = (c[5] > 500000000)?"Paralel":str(round(c[5]*100)/100);
  noStroke();
  textAlign(LEFT);
  text("Gelen ışın: "+tempC4, width*(0.82), height*(0.09));
  text("Giden ışın: "+tempC5+" F", width*(0.82), height*(0.15));

  //BUTTON RENDER/////////////////////////////////
  //rect(width*(0.82), height*(0.20),width*(0.14),height*(0.71));

  for (var i = 0; i<n; i++) {
    var y1 = height*(0.20) +i*(offset + h);
    tempC = (i <= 3)?color(150):color('#3B71A3')
    fill(tempC);
    if (buttonMouse(xall, w, y1, h, true)) {
      (i <=3)?fill(175):fill(84,138,188);
    }
    stroke(50);
    strokeWeight(2);
    rect(xall, y1, w, h, 10);
    textAlign(CENTER,CENTER);
    textSize(20);
    fill(0);
    noStroke();
    text(buttonStr[i], xall+w/2, y1+h/2);
  }
  textAlign(TOP);
}
function mirrorHeight(){
  //vecMirH.x = mouseX - centerXMirH;
  //vecMirH.y = mouseY - centerYMirH;
  push();
  textAlign(CENTER,CENTER);
  colorMode(RGB);
  background(31);
  textSize(20);
  translate(centerXMirH,centerYMirH);
  stroke(0,255,0);
  strokeWeight(2);
  line(-width,0,width,0);
  strokeWeight(20);
  //colorMode(HSB);
  stroke(200);
  var ref = refCal(vecMirH.x,vecMirH.y);
  strokeWeight(2);
  point(ref[0],ref[1]);
  stroke(255,0,0,100);
  strokeWeight(5);
  line(0,0,vecMirH.x,0);
  line(vecMirH.x,vecMirH.y,vecMirH.x,0);
  noStroke();
  fill(255,0,0);
  text("dc: "+str(round(vecMirH.x/f1*100)/100)+" F",vecMirH.x/2,sgn(vecMirH.y)*20);
  stroke(0,0,255,100)
  line(0,0,ref[0],0);
  fill(0,0,255);
  line(ref[0],ref[1],ref[0],0);
  noStroke();
  text("dg: "+str(round((ref[0]/f1)*100)/100)+" F",ref[0]/2,sgn(ref[1])*20);
  noFill();
  strokeWeight(5);
  stroke('#3163C4');
  arc(r,0,2*r,2*r,PI-PI/3,PI+PI/3,OPEN);
  pop();

  stroke(50);
  fill(200);
  rect(width*(0.8), height*(0.03), width*(0.18), height*(0.94), 10);

  fill(0);
  noStroke();
  textAlign(LEFT);
  var tempG = (vecMirH.x > 1000000)?"Noktasal":round(abs(ref[1]))/10+"cm";
  tempG = (vecMirH.x == f1)?"Sonsuz":tempG;
  text("Cisim boyu: "+round(abs(vecMirH.y))/10+" cm", width*(0.82), height*(0.09));
  text("Görüntü boyu: "+tempG, width*(0.82), height*(0.15));

  for (var i = 0; i<n; i++) {
    var y1 = height*(0.20) +i*(offset + h);
    tempC = (i <= 3)?color(150):color('#3B71A3')
    fill(tempC);
    if (buttonMouse(xall, w, y1, h, true)) {
      (i <=3)?fill(175):fill(84,138,188);
    }
    stroke(50);
    strokeWeight(2);
    rect(xall, y1, w, h, 10);
    textAlign(CENTER,CENTER);
    textSize(20);
    fill(0);
    noStroke();
    text(buttonStrMirH[i], xall+w/2, y1+h/2);
  }
}


function draw(){
  if(mode == 0)mirrorRay();
  if(mode == 1)mirrorHeight();
  if(mode == 2){if(confirm("KIRILMA SİMÜLASYONU HENÜZ HAZIR DEĞİLDİR..")){mode = 0;}else{mode= 0;}}
  animation();
}

function mousePressed() {
  if (!menuMouse() && mode == 0) {
    if (mouseButton == LEFT) {
      lineCord[0] = mouseX-centerX;
      lineCord[1] = mouseY-centerY;
    } else if (mouseButton == RIGHT) {
      lineCord[2] = mouseX-centerX;
      lineCord[3] = mouseY-centerY;
    }
  }
  if (!menuMouse() && mode == 1){
    vecMirH.x = mouseX - centerXMirH;
    vecMirH.y = mouseY - centerYMirH;
  }
}
function mouseReleased() {

  var expMer = [0, 0, r, r/2];

  var expOdk = [-r/2, 0, r, r];

  var expPar = [r, r/2, r*2.0, r/2];

  var exp3F  = [r/2, 0, 2*r, -r/2];


  for (var i = 0; i<n; i++) {
    var y1 = height*(0.20) +i*(offset + h);
    if (buttonMouse(xall, w, y1, h, false))
    {
      if (i == 0) {
        lineCord = expMer;
        vecMirH.x = r1;
      } else if (i == 1) {
        lineCord = expOdk;
        vecMirH.x = r1/2;
      } else if (i == 2) {
        lineCord = expPar;
        vecMirH.x = "1E+1085";
      } else if (i == 3) {
        lineCord = exp3F;
        vecMirH.x = 3*f1;
      } else if (i == 4) {
        mode = (2+mode)%3;
      } else if ( i == 5){
        mode = (1+mode)%3;
      }
    }
  }
}
