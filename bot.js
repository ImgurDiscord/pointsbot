var Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var givenPoints = new Discord.Collection();
var userData;
var userId;

let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));

bot.on("message", message => {
	var neutral = message.guild.roles.find("name", "Neutral");
	var liked = message.guild.roles.find("name", "Liked");
	var trusted = message.guild.roles.find("name", "Trusted");
	var idolized = message.guild.roles.find("name", "Idolized");
	var renowned = message.guild.roles.find("name", "Renowned");
	var glorious = message.guild.roles.find("name", "Glorious");
	
	if(message.author.bot) return; // always ignore bots!
	
	userId = message.author.id;
	givenPoints.set(message.author.id, message.author.id);
	
	if(!points[message.author.id]) points[message.author.id] = {points: 0, rank: 0};
	fs.writeFile('./points.json', JSON.stringify(points), console.error);
	
	/*
	points[message.author.id].points++;
	message.channel.sendMessage(`1 Point added.`);
	*/
	
	userData = points[message.author.id];
	
	if (userData.points >= 0 && userData.points <= 499 && userData.rank != "Neutral") {
		let member = message.guild.member(userData);
		userData.rank = "Neutral";
		message.member.addRole(neutral);
	}
	if (userData.points >= 500 && userData.points <= 999 && userData.rank != "Liked") {
		message.member.removeRole(neutral);
		let member = message.guild.member(userData);
		userData.rank = "Liked";
		message.member.addRole(liked);
	}
	if (userData.points >= 1000 && userData.points <= 1999 && userData.rank != "Trusted") {
		message.member.removeRole(liked);
		let member = message.guild.member(userData);
		userData.rank = "Trusted";
		message.member.addRole(trusted);
	}
	if (userData.points >= 2000 && userData.points <= 3499 && userData.rank != "Idolized") {
		message.member.removeRole(trusted);
		let member = message.guild.member(userData);
		userData.rank = "Idolized";
		message.member.addRole(idolized);
	}
	if (userData.points >= 3500 && userData.points <= 4999 && userData.rank != "Renowned") {
		message.member.removeRole(idolized);
		let member = message.guild.member(userData);
		userData.rank = "Renowned";
		message.member.addRole(renowned);
	}
	if (userData.points >= 5000 && userData.rank != "Glorious") {
		message.member.removeRole(renowned);
		let member = message.guild.member(userData);
		userData.rank = "Glorious";
		message.member.addRole(glorious);
	}
	
	// Bot Commands
	if (message.content.startsWith("$mystats")) {
		message.channel.sendMessage(`${message.author.username}, you have ${userData.points} points.`);
	}
});

function checkPoints() {
	console.log(userId);
	if (givenPoints.get(userId) == userId) {
		if(!userData) {
			return;
		} else {
			console.log('User exists; giving points.')
			userData.points++;
			fs.writeFile('./points.json', JSON.stringify(points), console.error);
			givenPoints.clear();
		}
	} else {
		console.log('No available users found.');
	}
}

setInterval(checkPoints, 180000)

bot.on("ready", () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
	});


bot.on("message", msg => {
	if (msg.content.startsWith("$ping")) {
        msg.channel.sendMessage("Don't worry, I'm still alive :)");
    }
});

bot.login("MjU3ODUzNDUyNTczNjA1ODkw.CzHkmg.ABl6qzKngiG2LQknVw3vfcoj6SQ");