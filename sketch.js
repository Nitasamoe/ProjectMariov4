"strict mode"

//States
var worldSetup = [
  [true ,true ,true ,true ,true ,true ,true ,true ,true ,true ],
  [false ,true ,true ,true ,true ,true ,true ,true ,true ,true ],
  [true ,true ,true ,true ,true ,true ,true ,true ,true ,true ],
  [true ,false,true ,false,true ,true ,true ,true ,true ,true ],
  [false,false,false,false,true,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
]
var sizeBox = 25;
var gravity = 1;

var mario = {
  PosX: (worldSetup.length*sizeBox)/2,
  PosY: (worldSetup.length*sizeBox)/2,
  size: sizeBox/2,
  col: false,
  acc: 2,
  colRight: false,
  colLeft: false,
  ground: false
}

function setup() {
  createCanvas(worldSetup[0].length*sizeBox, worldSetup.length*sizeBox)
  frameRate(40)
}



function draw(){
    makeCol();
    gravitySetup();
    //console.log(mario.acc)


    if(keyIsDown(RIGHT_ARROW) && mario.colRight == false){
      if(mario.colLeft === true){
        mario.acc =2;
      }
      mario.PosX -= mario.acc;
    }
    if(keyIsDown(LEFT_ARROW) && mario.colLeft === false){
      if(mario.colRight === true){
        mario.acc =2;
      }
      mario.PosX += mario.acc;
    }
    if(keyIsDown(UP_ARROW) && mario.col === false){
      mario.colRight = false;
      mario.colLeft = false;
      mario.PosY -= 4;
      mario.acc =2;
    }



//WORLD BUILDING---------------------------------------------------------
worldBuilding()

//MARIO BUILDING-----------------------------------------------
marioBuilding();



} // Ende draw();











function makeCol(){
  for(var i =0; i<worldSetup.length;i++){
    for(var j =0; j<worldSetup[i].length; j++){
      if(worldSetup[i][j]===false){
            let posY = mario.PosY;
            let posX = (((mario.PosX-87.5))*-1)+mario.size/2;
            let posX2 = (((mario.PosX-87.5))*-1)-mario.size/2;
            let links = j*sizeBox;
            let rechts = j*sizeBox+sizeBox;
            let oben = i*sizeBox;
            let unten = i*sizeBox+sizeBox;

            let posFieldX =  ((((mario.PosX-87.5))*-1)/25 >>0)+1;
            let posFieldY =  ((mario.PosY)/25 >>0)+1;
            let ground = posFieldY * sizeBox;

            //console.log("y: "+i+" x: "+j+"----"+links +" "+rechts +" "+oben +" "+unten);
            // console.log("PosX "+ posFieldX +" - PosY " + posFieldY);
              if(posX <= rechts && posX >= links  && posY >= oben && posY <= unten){
                //console.log("success");
                mario.acc = 0;
                mario.colRight = true;
              }
              if(posX2 <= rechts && posX2 >= links  && posY >= oben && posY <= unten){
                console.log("success"+ mario.colLeft);
                mario.acc = 0;
                mario.colLeft = true;
              }
              if(posY+mario.size/2 > ground && worldSetup[posFieldY][posFieldX-1]===false){
                mario.ground = true;
              } else {mario.ground = false}
        }
    }
  }
}

function gravitySetup(){



    if(mario.ground === false){
      mario.PosY +=1;
    }
}

function marioBuilding(){
  translate(-mario.PosX,0)
  noStroke();
  fill(255,0,0);
  ellipse((worldSetup.length*sizeBox)/2,mario.PosY,mario.size);
}


function worldBuilding(){
  background(255,255,255);
  translate(mario.PosX,0)
  // BLOCK BUILDINGS-----------------------------------------------------
  for(var x=0; x<worldSetup[0].length;x++){
    for(var y=0; y<worldSetup.length;y++){
      if(worldSetup[y][x]===false){
        let Px =(x*sizeBox);
        let Py =(y*sizeBox);
        let lengthBox =sizeBox;
        fill(0,0,0);
        rect(Px,Py,lengthBox,lengthBox);
      }
    }
  }
}
