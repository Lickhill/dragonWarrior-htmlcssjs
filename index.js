let xp = 0;
let health = 100;
let gold = 50;
let currenteWeapon = 0;
let currentweaponrank = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xptext = document.querySelector("#xpText");
const goldtext = document.querySelector("#goldText");
const healthtext = document.querySelector("#healthText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const locations = [
	{
		name: "town square",
		"button text": ["go to store", "go to cave", "fight dragon"],
		"button functions": [goStore, gocave, fightDragon],
		text: 'You are in the town square. You see a sign that says "store".',
	},
	{
		name: "store",
		"button text": [
			"buy health(10 gold)",
			"buy weapons(30 gold)",
			"go to town square",
		],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You have entered the store",
	},
	{
		name: "cave",
		"button text": ["fight slimes", "fight piglets", "go to town square"],
		"button functions": [fightslime, fightpiglets, goTown],
		text: "You are in the cave. You see some slimes and piglets.",
	},
	{
		name: "fighting",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [Attack, dodge, goTown],
		text: "You are fighting monsters.",
	},
	{
		name: "victory",
		"button text": ["go to town square", "replay?", "go to town square"],
		"button functions": [goTown, replay, goTown],
		text: "You have killed all the monsters haunting this town.\n You have gained experience levels and found gold.",
	},

	{
		name: "lost",
		"button text": ["Replay?", "Replay?", "Replay?"],
		"button functions": [replay, replay, replay],
		text: "You are dead. Game over.",
	},
	{
		name: "monsterdefeated",
		"button text": [
			"go to town square",
			"go to town square",
			"go to town square",
		],
		"button functions": [goTown, goTown, goTown],
		text: "You have killed all the monsters haunting this town.\n You have gained experience levels and found gold.",
	},
];

const weaponsList = [
	{
		name: "stick",
		power: 5,
	},
	{
		name: "dagger",
		power: 10,
	},
	{
		name: "katana",
		power: 20,
	},
	{
		name: "axe",
		power: 30,
	},
	{
		name: "claw hammer",
		power: 40,
	},
];

const monstersList = [
	{
		name: "Slime",
		level: 2,
		health: 10,
	},
	{
		name: "Piglet",
		level: 8,
		health: 50,
	},
	{
		name: "Dragon",
		level: 20,
		health: 150,
	},
];

button1.onclick = goStore;
button2.onclick = gocave;
button3.onclick = fightDragon;

function update(location) {
	monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
	text.innerText = location.text;
}

function goStore() {
	update(locations[1]);
}

function gocave() {
	update(locations[2]);
}

function buyHealth() {
	if (gold >= 10) {
		gold -= 10;
		health += 10;
		goldtext.innerText = gold;
		healthtext.innerText = health;
	} else {
		text.innerText = "You do not have enough gold to purchase health";
	}
}

function sellweapons() {
	if (currenteWeapon > 0) {
		gold += 15;
		currenteWeapon--;
		goldtext.innerText = gold;
		let currweapon = inventory.shift();
		text.innerText =
			"You have sold your " +
			currweapon +
			"\n your inventory is " +
			inventory;
	} else {
		text.innerText = "You do not sell your only weapon";
	}
}

function buyWeapon() {
	if (currenteWeapon < 4) {
		if (gold >= 30) {
			gold -= 30;
			currenteWeapon++;
			currentweaponrank++;
			goldtext.innerText = gold;
			inventory.push(weaponsList[currenteWeapon].name);
			text.innerText =
				"You have purchased " +
				weaponsList[currenteWeapon].name +
				" \n your inventory has " +
				inventory;
		} else {
			text.innerText = "You do not have enough gold";
		}
	} else {
		text.innerText = "You already have the most powerful weapon!";
		button2.innerText = "Sell your weapon for 15golds";
		button2.onclick = sellweapons;
	}
}

function fightslime() {
	fighting = 0;
	gofight();
}

function fightpiglets() {
	fighting = 1;
	gofight();
}

function fightDragon() {
	fighting = 2;
	gofight();
}
function gofight() {
	update(locations[3]);
	monsterStats.style.display = "block";
	monsterHealth = monstersList[fighting].health;
	monsterNameText.innerText = monstersList[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}
function Attack() {
	text.innerText =
		"You are attacking the " +
		monstersList[fighting].name +
		" with your " +
		weaponsList[currentweaponrank].name;

	health -= monstersList[fighting].level;
	monsterHealth -= weaponsList[currentweaponrank].power;
	healthtext.innerText = health;
	monsterHealthText.innerText = monsterHealth;
	if (health <= 0) {
		lost();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? victory() : monsterDefeated();
	}
}

function lost() {
	update(locations[5]);
}

function replay() {
	inventory = [];
	xp = 0;
	currenteWeapon = 0;
	health = 100;
	gold = 50;
	goldtext.innerText = gold;
	healthtext.innerText = health;
	xptext.innerText = xp;
	goTown();
}

function victory() {
	gold += monstersList[fighting].level * 6.7;
	xp += monstersList[fighting].level;
	goldtext.innerText = gold;
	xptext.innerText = xp;
	update(locations[4]);
}

function monsterDefeated() {
	gold += monstersList[fighting].level * 6.7;
	xp += monstersList[fighting].level;
	goldtext.innerText = gold;
	xptext.innerText = xp;
	update(locations[6]);
	text.innerText = "You have defeated the " + monstersList[fighting].name;
}

function dodge() {
	text.innerText =
		"You have dodged the attack of " + monstersList[fighting].name;
}

function goTown() {
	update(locations[0]);
}
