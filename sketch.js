var player, playerImage, background1, background1Image
var invGround;
var coinGroup
var playerClimb
var enemies;
var bullet, bulletImage, bulletsGroup; 
var lives = 3
var score = 0 
function preload() {
    playerWalk = loadAnimation("PNG/Rogue/Walk/walk1.png",
        "PNG/Rogue/Walk/walk2.png",
        "PNG/Rogue/Walk/walk3.png",
        "PNG/Rogue/Walk/walk4.png", "PNG/Rogue/Walk/walk5.png", "PNG/Rogue/Walk/walk5.png")
       beamAnimation = loadAnimation("beam/beam2.png","beam/beam3.png")
        enemyWalk = loadAnimation(
        "PNG/Knight/Walk/walk2.png",
        "PNG/Knight/Walk/walk3.png",
        "PNG/Knight/Walk/walk4.png")
        
        background1Image = loadImage("City1.png")
        background2Image = loadImage("City2.png")
        background3Image = loadImage("City3.png")
        background4Image = loadImage("City4_pale.png")
        bulletImage = loadImage("bulletsimage.png")
        //playerClimb = loadAnimation("PNG/Rogue/climb1.png")
        gameoverImage = loadImage("gameover.png")

        coinAnimation = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
}

function setup() {
    createCanvas(800, 400);

    background1 = createSprite(400, 150)
    coinGroup=createGroup()
    background1.scale = 0.5

    invGround = createSprite(440, 390, 800, 10)
    invGround.visible = false

    player = createSprite(120, 300, 50, 50);
    player.addAnimation("walk", playerWalk)
   // player.addAnimation("climb", playerClimb)
    player.scale = 1.5
        //player.debug = true
    player.setCollider("circle", -20, 20, 30)
    background1.velocityX = -7
    bulletsGroup = createGroup()
    enemyGroup = createGroup()
    beamGroup = createGroup()
}



function draw() {
    background("lightBlue")
   
    if(frameCount >= 500 && frameCount<1000){
        background1.addImage(background1Image)
       }else if(frameCount>=1000 && frameCount<1500){
        background1.addImage(background3Image)
       }else if(frameCount>=1500){
        background1.addImage(background4Image)
       }else{
        background1.addImage(background2Image)
       }
    if(keyDown(UP_ARROW)){
            bullet = createSprite(player.x, player.y, 10,10)
            bullet.velocityX = 10
            bullet.addImage(bulletImage)
            bullet.scale = 0.07
            bullet.rotation = 20
            bulletsGroup.add(bullet)
            bullet.lifetime = 30
        } 
        //jump 
    if (keyDown("space") && player.y > 285) {
        player.velocityY = -20
        player.changeAnimation("climb")
       
        

    } else {
        player.changeAnimation("walk")

    }
    // gravity
    
    player.velocityY += 0.8

    player.collide(invGround)
        // scroll background
    if (background1.x < 100) {
        background1.x = 400
    }
    console.log(frameCount)
    enemies()
    beams()
    coins()
    drawSprites();
   textSize(30)
   fill("black")
   stroke("green")
    text("score ⛳:" + score,600,50)
    text("Lives ❤:"+lives,100,50)
    

    if(bulletsGroup.isTouching(enemyGroup)){
        enemyGroup[0].destroy()    
        bulletsGroup[1].destroy()    
    }  

    if(coinGroup.isTouching(player)){
        coinGroup[0].destroy()    
        score=score +1
    }

    if(player.isTouching(enemyGroup)|| player.isTouching(beamGroup)){
        if(enemyGroup[0] !== undefined)
       enemyGroup[0].destroy()    
       lives = lives-1
    }
    if(lives < 1 ){
        var gameOver = createSprite(width/2, height/2)
  gameOver.addImage(gameoverImage)
  player.velocityX = 0
  player.velocityY = 0;
  coinGroup.setVelocityXEach(0)
  enemyGroup.setVelocityXEach(0)
  background1.x      = 0
  gameOver.scale = 3 
  beamGroup.destroyEach()
  coinGroup.destroyEach() 
}

}


function enemies(){
    if(frameCount % 60==0){
    var enemy1 = createSprite(820,random(280,300))
  enemy1.addAnimation("enemy",enemyWalk)
    enemy1.velocityX = -10
    enemy1.mirrorX(-1)
    enemyGroup.add(enemy1)
  enemy1.setCollider("circle",15,20,25) 
    }
}

function coins(){
    if(frameCount % 30==0){
    var coin = createSprite(random(600,800),random(80,100))
  coin.addAnimation("coin",coinAnimation)
    coin.velocityX = -3
    coinGroup.add(coin)

 coin.scale = 0.3 
    }
}function beams(){
    if(frameCount % 200==0){
        beam = createSprite(900,200)
        beam.addAnimation("beam",beamAnimation)
        beam.velocityX = -12
        beam.scale = 0.3
    beamGroup.add(beam)
  beam.setCollider("circle",15,20,25) 
    }
}



