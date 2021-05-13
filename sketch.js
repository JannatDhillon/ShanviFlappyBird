var bird, birdImg;
var blockdown;
var blockup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){

 birdImg = loadAnimation("images/birdImg1.png","images/birdImg2.png","images/birdImg3.png","images/birdImg2.png");
 blockdown = loadImage("images/blockdown.png");
 blockup = loadImage("images/blockup.png");

}

function setup() {
  createCanvas(windowWidth - 20,windowHeight - 20);

  bird = createSprite(400, 200, 50, 50);
  bird.addAnimation("bird",birdImg);
  bird.setCollider("circle",0,0,bird.width/5);
  
  bird.scale = 0.2;
  bird.debug=true;
  
  
  blockG = new Group();
  block2G = new Group();
  blueG = new Group();

  
}

function draw() {
  background("skyblue");  

  drawSprites();
  if(gameState===PLAY){

   edges = createEdgeSprites();
   bird.collide(edges);
   
   if(keyDown("space")){
     bird.velocityY = -10;
    }

   bird.depth = 2;

   spawnblocks();
   spawnblue();

   bird.velocityY = bird.velocityY + 0.8

   if(blockG.isTouching(bird)){
    gameState = END;
  }

  if(block2G.isTouching(bird)){
    gameState = END;
  }

  }

  else if (gameState === END){

    bird.velocityY = 0;

    blockG.setVelocityXEach(0);
    block2G.setVelocityXEach(0);
    blueG.setVelocityXEach(0);

    blockG.setLifetimeEach(-1);
    block2G.setLifetimeEach(-1);
    blueG.setLifetimeEach(-1);

    textSize(50);
    fill('cyan');
    stroke('black');
    strokeWeight(3);
    text('Game Over',windowWidth/2-130,windowHeight/2)
  }

}

function spawnblocks(){

 if(frameCount%100 === 0){

   var block = createSprite(windowWidth, windowHeight - 100,150,300);
    block.velocityX = -7;
    block.height = random(200,450); 
    block.setCollider("rectangle" ,0,0,block.width,block.height);
    block.lifetime = 600;
    block.shapeColor = color(random(0,255),random(0,255),random(0,255));
    blockG.add(block);
    block.depth = 2;
    block.debug=true;
  }
    
  if(frameCount%100 === 0){
 
    var block2 = createSprite(windowWidth, 100, 150, 300);
    block2.velocityX = -7;
    block2.height = random(200,450); 
    block2.setCollider("rectangle" ,0,0,block2.width,block2.height);
    block2.lifetime = 600;
    block2.shapeColor = color(random(0,255),random(0,255),random(0,255));
    block2G.add(block2);
    block2.depth = 2;
    block2.debug=true;
      
  }
}

function spawnblue(){

  if(frameCount%100 === 0){
 
    var blue = createSprite(windowWidth, windowHeight ,1,5000);
    blue.velocityX = -7;
    blue.lifetime = 600;
    blue.shapeColor = ("red");
    blueG.add(blue);
    blue.depth = 1;
  }
}