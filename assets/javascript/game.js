
var Swann = {
	name: "Swann",
	health: 150, 
	offense: 20,
	defense: 25,
	image: "assets/images/Swann.png",
	id: "Swann",
};

var Bond = {
	name: "Bond",
	health: 135, 
	offense: 31,
	defense: 30,
	image: "assets/images/Bond.png",
	id: "Bond",
};

var Blofeld = {
	name: "Blofeld",
	health: 200, 
	offense: 14,
	defense: 20,
	image: "assets/images/Blofeld.png",
	id: "Blofeld",
};

var Q = {
	name: "Q",
	health: 180, 
	offense: 25,
	defense: 15,
	image: "assets/images/Q.png",
	id: "Q",
};

var playerSelect = false;
var enemySelect = false;
var deadEnemies = 0;
var player;
var enemy;
var attackPower;

function checkPlayer(choice){
	if (choice == "Swann"){
		player = Swann;
	} else if (choice == "Bond"){
		player = Bond;
	} else if (choice == "Blofeld") {
		player = Blofeld;
	} else {
		player = Q;
	};
	playerSelect = true;
};

function checkEnemy(choice){
	if (choice == player.id){
		$("#message").html("You can't fight yourself!");
	} else if (choice == "Swann"){
		enemy = Swann;
		enemySelect = true;
	} else if (choice == "Bond"){
		enemy = Bond;
		enemySelect = true;
	} else if (choice == "Blofeld") {
		enemy = Blofeld;
		enemySelect = true;
	} else {
		enemy = Q;
		enemySelect = true;
	};
};


// reset
function reset() {
	location.reload();
};

function checkStatus(status){
	if (status === "dead"){
		return true;
	} else {
		return false;
	}
}

function checkHealth () {
	
	// detect when loose
	if (player.health <= 0){
		$("#message").html("You cost us the mission!");
		$("#" + player.id + " .image").html("<img src='assets/images/dead1.png'>");
		$("#" + enemy.id + " .image").html("<img src='assets/images/check2.png'>");

		$("#player-arena .arena-attack").empty();
		$("#player-arena .arena-img").empty();
		$("#player-arena .arena-health").empty();
	
	// detect when enemy dead
	} 

	else if (enemy.health <= 0){
		deadEnemies++;
		console.log(deadEnemies);
		// change status to dead
		$("#"+ enemy.id).attr('status','dead');
		$("#" + enemy.id + " .image").html("<img src='assets/images/dead1.png'>");

		$("#message").html("Defeat another agent for a bonus.");
			enemy;

		enemySelect = false;
		$("#enemy-arena .arena-attack").empty();
		$("#enemy-arena .arena-img").empty();
		$("#enemy-arena .arena-health").empty();
	} 
	
	//detect when win
	if (deadEnemies === 3){
		$("#message").html("Congratulations! You can keep your job.");
		$("#" + player.id + " .image").html("<img src='assets/images/check2.png'>");
	} 
}




$(document).ready(function() {

$('.character').click(function(event){

	var tempName = $(this).attr('id');
	var tempStatus = $(this).attr('status')

	//select character
	if (playerSelect === false && enemySelect === false){
		
		checkPlayer(tempName);
		console.log(player);

		attackPower = player.offense;

		//move character to player area
		$("#player-arena .arena-attack").html("<h3>Attack Power: " + player.offense +"</h3>");
		$("#player-arena .arena-img").html("<img src='assets/images/" + player.name + ".png'>");
		$("#player-arena .arena-health").html("<h2>HP: "+ player.health +"</h2>");
		$("#" + player.id + " .image").empty();
		$("#" + player.id).css("background-color", "#71A235");

	//select enemy
	} else if (checkStatus(tempStatus)) {
		$("#message").html("Pick a new opponent.");
		return;

	} else if (playerSelect === true && enemySelect === false) {
		
		checkEnemy(tempName);

		//move enemy
		$("#enemy-arena .arena-attack").html("<h3>Attack Power: " + enemy.defense +"</h3>");
		$("#enemy-arena .arena-img").html("<img src='assets/images/" + enemy.name + ".png'>");
		$("#enemy-arena .arena-health").html("<h2>HP: "+ enemy.health +"</h2>");
		$("#" + enemy.id + " .image").empty();
		$("#" + enemy.id).css("background-color", "#FEB043");
	} else {
		$("#message").html("Finish it.");
	};

});


//attack
$('#attack').click(function(){
	if (playerSelect === false || enemySelect === false){
		$("#message").html("M says pick a character and enemy.");
	} else if (player.health > 0 && enemy.health > 0) {

		// * loose health for both
		enemy.health = enemy.health - player.offense;
		player.health = player.health - enemy.defense;

		$("#enemy-arena .arena-img, #player-arena .arena-img").toggle("fast").toggle("fast");
		$("#message").html("<div id='player-message' style='color:lime;'> You: " + player.offense + " Damage Points </div>");  
		$("#message").append("<div id='enemy-message' style='color:red;'> " + enemy.name + ": " + enemy.defense + " Damage Points </div>");
		$("#enemy-arena .arena-health").html("<h2>HP: "+ enemy.health +"</h2>");
		$("#player-arena .arena-health").html("<h2>HP: "+ player.health +"</h2>");

		// * player attack ability goes up
		player.offense = player.offense+attackPower;

		$("#player-arena .arena-attack").html("<h3>Attack Power: " + player.offense +"</h3>");
		checkHealth();
	}

	
});


$('#reset').click(reset);

});