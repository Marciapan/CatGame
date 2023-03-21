console.log("Hey, dit is de console! Ga lekker het spel spelen!");

//vars die geen html elements zijn
var lampStatus = "on";
var musicStatus = "off";

//vars voor de kat en de tekst
var catText = document.querySelector(".catText");
var catPic = document.querySelector(".cat");

//buttons
var buttonLove = document.querySelector(".buttonPet");
var buttonPlay = document.querySelector(".buttonPlay");
var buttonClean = document.querySelector(".buttonClean");
var buttonFood = document.querySelector(".buttonFood");
var buttonLight = document.querySelector(".buttonLight");
var buttonCheck = document.querySelector(".check");
var buttonMusic = document.querySelector(".music");
var buttonHardMode = document.querySelector(".hardMode");

//lets voor de progress bars
let love = document.getElementById("love");
let play = document.getElementById("play");
let clean = document.getElementById("clean");
let food = document.getElementById("hunger");

//var voor de achtergrond/kamer
var room = document.querySelector(".roomLight");

//Interval om iedere seconde te checken welk plaatje er moet staan
let checkInterval = setInterval(checkPic, 1000);
checkInterval;

//gebruikte muziek en sound effects:
// Colorful Flowers by Tokyo Music Walker | https://soundcloud.com/user-356546060
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons CC BY 3.0
// https://creativecommons.org/licenses/by/3.0/
const audio = new Audio('audio/Colorful-Flowers.mp3');

//Cat purr audio van:
//https://www.youtube.com/watch?v=3F7Zz7x4Nhs
const purrAudio = new Audio('audio/Cat_Love.mp3');

//Bonk audio van:
//https://www.youtube.com/watch?v=6TP0abZdRXg
const bonkAudio = new Audio('audio/Cat_Play.mp3');

//Cat angry meow audio van:
//https://www.youtube.com/watch?v=RqcjDMq97Xs
const cleanAudio = new Audio('audio/Cat_Clean.mp3');

//Cat munch audio van:
//https://www.youtube.com/watch?v=dTR6GaOd_S4
const munchAudio = new Audio('audio/Cat_Munch.mp3');

//The Kitty Cat Song audio van:
//https://www.youtube.com/watch?v=SaA_cs4WZHM
const danceAudio = new Audio('audio/The_Kitty_Cat_Dance.mp3');

//functions om interactie te hebben met de kat
function loveCat() {
    love.value += 10;
    catText.textContent = "I love pets!";
    catPic.src = "images/Cat_Pet.gif";
    purrAudio.volume = 1;
    purrAudio.play();
}

function playCat() {
    play.value += 20;
    catText.textContent = "Let's play!";
    catPic.src = "images/cat_play.gif";
    bonkAudio.volume = 0.1;
    bonkAudio.play();
}

function cleanCat() {
    clean.value += 25;
    love.value -= 15;
    catText.textContent = "I don't like baths...";
    catPic.src = "images/Cat_Shower.gif";
    cleanAudio.volume = 0.1;
    cleanAudio.play();
}

function foodCat() {
    food.value += 50;
    catText.textContent = "Time for food!";
    catPic.src = "images/Cat_Food.gif";
    munchAudio.volume = 0.1;
    munchAudio.play();
}


//Functions voor automatische verlies van progress
function loseLove() {
    love.value -= 1;
}

function losePlay() {
    play.value -= 1;
}

function loseClean() {
    clean.value -= 1;
}

function loseFood() {
    food.value -= 1;
}

//functie die checkt welk plaatje van de kat gebruikt moet worden
function checkPic() {
    if (love.value <= 19 || play.value <= 19 || clean.value <= 19 || food.value <= 19) {
        catPic.src = "images/Cat_Mad.gif";
    } else if (love.value == 100 && play.value == 100 && clean.value == 100 && food.value == 100) {
        catPic.src = "images/Cat_Love.gif";
    } else {
        catPic.src = "images/Cat_Idle_Gif.gif";
    }
}

//functie om te kijken of de kat helemaal gelukkig is
function checkHappiness() {
    if (love.value == 100 && play.value == 100 && clean.value == 100 && food.value == 100) {
        catText.textContent = "Thank you so much!! I'm so happy!";
        audio.pause();
        musicStatus = "off";
        danceAudio.volume = 0.2;
        danceAudio.play();
        clearInterval(checkPic, 1000);
        clearInterval(checkInterval);
        catPic.src= "images/Cat_Party.gif";
    } else {
        catText.textContent = "I'm not totally happy yet... Maybe I still need something?"
    }

}
//lampje
function lightSwitch() {
    if (lampStatus == "off") {
        room.classList.remove("roomDark");
        room.classList.add("roomLight");
        lampStatus = "on";
    } else if (lampStatus == "on") {
        room.classList.remove("roomLight");
        room.classList.add("roomDark");
        lampStatus = "off";
    }
    console.log(lampStatus);
}
//muziek aanzetten/pauseren
function playMusic() {
    if (musicStatus == "on") {
        audio.pause();
        musicStatus = "off";
    } else if (musicStatus == "off") {
        audio.volume = 0.1;
        audio.play();
        musicStatus = "on";
    }
}

//Hard Mode aanzetten
function hardMode(){
    if(confirm("Are you sure you want to play Hard Mode? It's not possible to go back unless you reload the page...")){
        setInterval(loseLove, 500);
        setInterval(losePlay, 2000);
        setInterval(loseClean, 5000);
        setInterval(loseFood, 2500);
    } else {
        return;
    }
}

//Button eventlisteners
buttonLove.addEventListener("click", loveCat);
buttonPlay.addEventListener("click", playCat);
buttonClean.addEventListener("click", cleanCat);
buttonFood.addEventListener("click", foodCat);
buttonCheck.addEventListener("click", checkHappiness);
buttonLight.addEventListener("click", lightSwitch);
buttonMusic.addEventListener("click", playMusic);
buttonHardMode.addEventListener("click", hardMode);

