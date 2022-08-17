// To test if the javascript is working correctly.
console.log("test...");

//Setting up for key detection.
document.onkeydown = key;

// Storing the id/class on to the variables and creating new variable for things like name, time, etc.
var again = document.getElementById("again");
var chance = document.getElementById("Chance")
var name = document.getElementById("name");
var start = document.getElementById("start");
var player = document.getElementById("player");
var object = document.getElementById("object");
var back = document.getElementById("back");
var middle = document.getElementById("middle");
var alive = false;
var timer = 0;
var chances = 0;
var score = 0;

// Removing all animations before the game is started
object.classList.remove("animationblock");	
player.style.animationPlayState = "paused";



// Asking the user to input a name for their player.
name = prompt("Enter a name for your player:");
document.getElementById("name").innerHTML = ("Name:" + " " + name);

// Instructions.
firsttext();

function firsttext() {

	// Changing the text of h1.
	document.getElementById("h1").innerHTML = ("Welcome," + " " + name + "!");

	// setting a timeout so player has enough time to read.
	setTimeout("secondtext()", 1000);
};

function secondtext() {

	// Changing the text of h1.
	document.getElementById("h1").innerHTML = ("In this game you will need to doge all the objects coming at the ball which is you.");
	
	setTimeout("thirdtext()", 3000);
};

function thirdtext() {

	//Changing the text of h1.
	document.getElementById("h1").innerHTML = ("Press the up arrow key to jump. As the timer goes up the level will change for example.");

	setTimeout("fourthtext()", 3000);
};

function fourthtext() {

	//Changing the text of h1.
	document.getElementById("h1").innerHTML = ("Once the timer hits 10 seconds you can use spacebar to jump higher.");

	setTimeout("fifthtext()", 3000);

};

function fifthtext() {

	// Changing the text of h1.
	document.getElementById("h1").innerHTML = ("Now you can start Good luck!");

	setTimeout("lasttext()", 3000);

};

function lasttext() {

	// Changing the text of h1.
	document.getElementById("h1").innerHTML = ("Level: 1");

}
// Start!
function starts() {

	// Adding the animation to begin once start has been clicked.
	object.classList.add("animationblock");
	player.style.animationPlayState = "running";
	middle.classList.add("animationbackground");
	back.classList.add("animationbackground");

	// Hidding the start button.
	start.style.display = "none";

	// calling the time function to begin.
	alive = true;
	time();

	//running the collision function.
	dead();

	// running the High score
	scores();
};

//Creating the function for the player to jump.
function key(e) { 	

	//Adding window.event to a variable.
	e = window.event;

	//This is checking for if up_arrow key if pressed, for jump animation. 
	if (e.keyCode == "38") {

		//Creating an if statement to check if the animation has already occured to make sure the player doesn't spam it.
		if (player.classList != "animation") {

			//Adding the animation class so when the up_arrow key is pressed javascript will call this animation and the player would jump.
			player.classList.add("animation");
		};
		
		setTimeout(function() {

			//Removing the animation class for 500ms or 0.5 seconds so when jump key pressed again the animation will happen again.
			player.classList.remove("animation");

		}, 500);

	} else if (timer >= 10) {

		if (e.keyCode == "32") {

			if (player.classList != "animationdouble") {

				player.classList.add("animationdouble")
			};

		};

		setTimeout(function() {

			//Removing the animation class for 500ms or 0.5 seconds so when jump key pressed again the animation will happen again.
			player.classList.remove("animationdouble");

		}, 500);
	};
};

//Checking for collosion ever 10ms or 0.01 seonds 
setInterval (function dead() {

	//Getting the player positon from css
	var playerheight = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

	//Getting object position from css
	var objecty = parseInt(window.getComputedStyle(object).getPropertyValue("left"));

	// This it to detec how far the object is from the player and if the player and the object our touching alert you lose and stop all animation and show the button to play the game again.
	if (objecty <= 20 && playerheight >= 325) {

		chances += 1;

		alive = false;

		player.style.animationPlayState = "paused";

		object.classList.remove("animationblock");	

		middle.classList.remove("animationbackground");
		
		back.classList.remove("animationbackground");

		document.getElementById("object").style.left="779px";

		again.style.display = "block";

		if (chances <= 2) {

			chance.style.display = "block";

		} else if (chances > 2) {

			chance.style.display = "none";

		};

		alert("You were alive for" + " " + (timer -= 1) + " " + "seconds");

		document.getElementById("High").innerHTML = ("High score:" + name + ":" + " " + score + " " + "Seconds");

		alert(score);

	} else if (timer > 10) {

		level2();

		if (objecty <= 20 && playerheight >= 255) {

			chances += 1;
			
			alive = false;

			document.getElementById("object").style.height = "20px";

			document.getElementById("object").style.top = "308px";

			player.style.animationPlayState = "paused";

			object.classList.remove("animationblock");	

			middle.classList.remove("animationbackground");
			
			back.classList.remove("animationbackground");

			document.getElementById("object").style.left="779px";

			again.style.display = "block";

			if (chances <= 2) {

				chance.style.display = "block";

			} else if (chances > 2) {

				chance.style.display = "none";

			};

			alert("You were alive for" + " " + (timer -= 1) + " " + "seconds");

			document.getElementById("High").innerHTML = ("High score:" + " " + name + ":" + " " + score + " " + "Seconds");

			alert(score);

		};
	};

},10);

//Play again, if the player clicks play again everything will start again.
function playagain() {

	player.style.animationPlayState = "running";

	object.classList.add("animationblock");

	document.getElementById("object").style.height = "20px";

	document.getElementById("object").style.top = "308px";

	middle.classList.add("animationbackground");
	
	back.classList.add("animationbackground");

	again.style.display = "none";

	chance.style.display = "none";

	document.getElementById("time").innerHTML = ("Time: 0 Seconds");

	document.getElementById("h1").innerHTML = ("Level: 1");

	timer = 0;

	chances = 0;

	alive = true;

	time();

};

// Timer 
setInterval(function time() {

	if (alive == true) {

		document.getElementById("time").innerHTML = ("Time:" + " " + timer + " " +"Seconds");

		timer++;

	};

},1000);

// Level 2 (When 60 seconds has been reached)
function level2() {

	document.getElementById("object").style.height = "100px";

	document.getElementById("object").style.top = "228px";

	document.getElementById("h1").innerHTML = ("Level: 2");

};

// Chance function if user guess the right number they will conitune from where they died.
function replay() {

	var randomnumber = Math.floor(Math.random()*10);

	var usr = prompt("Guess the number, I have picked a number between 0-10!");

	if (usr == randomnumber) {

		alert("You Guessed it right!");

		chance.style.display = "none";

		playagain1();

	} else {

		alert("The correct answer was " + randomnumber);

		chance.style.display = "none";

		dead();

	};
};

// playagain function but different from the original because we want the time to run from where it stopped.
function playagain1() {

	player.style.animationPlayState = "running";

	object.classList.add("animationblock");

	document.getElementById("object").style.height = "20px";

	document.getElementById("object").style.top = "308px";

	middle.classList.add("animationbackground");
	
	back.classList.add("animationbackground");

	again.style.display = "none";

	document.getElementById("time").innerHTML = ("Time:" + " " + timer + " " +"Seconds");;

	alive = true;

	time();

};

// Highscore
setInterval(function scores() {

	if (timer > score) {
	
		score = timer - 1;
	
	};

}, 100);



