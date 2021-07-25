//Create variables here
var dog,happyDog,dogImg,dogHappy;
var foodS,foodStock;
var database;
var lastFed,feed,addFood,fedTime;
var foodObj;

function preload()
{
	//load images here
  dogImg = loadImage("Dog.png");
  
  dogHappy = loadImage("dogImg1.png");
 
}

function setup() {
  database = firebase.database();
  createCanvas(1000,500);
  dog = createSprite(750,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food();
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  //textSize(15);
  //fill("White");
  //text("Note: Use UP_ARROW key to feed Drago Milk ",600,150);

  drawSprites();
  //add styles here

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed :" + lastFed%12 + "PM", 350,30);
  }else if(lastFed === 0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed :" + lastFed + "AM",350,30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
}

function readStock(data){
 foodS = data.val();
 foodObj.updateFoodStock(foodS);
}

//function writeStock(x){
  
  //if(x <= 0){
   // x = 0;
  //}else{
    //x = x-1;
  //}
  

  //database.ref('/').update({
    //Food:x
  //})
//}


function showError(){
  console.log("show Error in code")
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}