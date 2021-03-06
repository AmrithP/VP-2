//Variables
var dog, happyDog, database, foodS, foodStock;
var feed, add
var foodObj
var fedTime
var lastFed

function preload(){

  //Images are loaded

  dogImg = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");

}

function setup() {

  database = firebase.database();

  createCanvas(1000, 500);

  console.log(database);


  foodObj = new Food()

  dog = createSprite(600, 250, 70, 70);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("FEED FOOD")
  feed.position(500,15)
  feed.mousePressed(feedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(addFood)

}


function draw() {  

  //Background

  background("cyan");

  foodObj.display();

  fill(255,255,254)
  textSize(15)
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });

  if(lastFed>=12){

    text("Last Feed :" + lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30)
  } else{
    text("Last Feed : "+ lastFed + " AM", 350, 30)
  }

  //Sprites are Shown

  drawSprites();

  //Texts

  textSize(25);
  fill("black");
  text("Food: " + foodS, 220, 90);
  text("Use the up arrow key to feed your pet!", 40, 50);
  
}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  
  dog.addImage(dogImg2)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  } else {

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)

  }
  
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour ()
   })
  }

function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  }
  
  )
  }