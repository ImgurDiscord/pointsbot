import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import query from './lib/db.js';
import fs from 'fs';
import Discord from 'discord.js';
import cleverbot from 'cleverbot.io';
import cats from 'cat-facts';
import yt from 'ytdl-core';
const bot = new Discord.Client();
var givenPoints = new Discord.Collection();
var numberOne = new Discord.Collection();
var userId;
var uPoints;
var uLevel;
var userName;
var nickName;
var chat;

var firstSlot = 0;
var secondSlot = 0;
var thirdSlot = 0;
var Slot1;
var Slot2;
var Slot3;
//var jackpot = 0;
var bullets = 7;
var noco;
var called;
var img;

var erp;
var noco;

var first = "redsox ayo";
var second;
var third; 

var curcolor;
var numchance = randomInt(0, 7);

/*getLeaders(function(err, result) {
	if (err) {
		console.log(err);
	}
	first = result.rows[0].username;
	second = result.rows[1].username;
	third = result.rows[2].username;
});*/

setInterval(function() {
    http.get("http://imguraffe.herokuapp.com");
}, 300000);

bot.on("ready", () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

/*bot.on("guildMemberAdd", (member) => {
	member.send(`Welcome to the server, ${member}!\nFeel free to ask questions on the server if you have any.`);
});*/

bot.on("message", message => {
    var newr = message.guild.roles.find("name", "New");
    var liked = message.guild.roles.find("name", "Liked");
    var loyal = message.guild.roles.find("name", "Loyal");
    var adored = message.guild.roles.find("name", "Adored");
    var famous = message.guild.roles.find("name", "Famous");
    var single = message.guild.roles.find("name", "Hot Single Dad");

    if (message.author.bot) return;

    userId = message.author.id;
    uPoints = 0;
    uLevel = 'Neutral';
    userName = message.author.username;
    nickName = message.member.displayName;

    givenPoints.set(message.author.username, message.author.id);

    addUser(uLevel, uPoints, userId, function(err, result) {
        if (err) {
            console.log(err);
        }
    });
    updateUsername(nickName, userId, function(err, result) {
        if (err) {
            console.log(err);
        }
    });
	
	var chnlname = message.channel.name;
	
	if (chnlname !== "bot_commands") {
		givenPoints.set(message.author.username, message.author.id);
	}

    getInfo(userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        var curPoints = result.rows[0].points;
        var curRank = result.rows[0].rank;

        if (curPoints >= 0 && curPoints <= 249 && curRank != "New") {
            let member = message.guild.member(userId);
            updateRank("New", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(newr);
        }
        if (curPoints >= 250 && curPoints <= 499 && curRank != "Liked") {
            let member = message.guild.member(userId);
            updateRank("Liked", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(liked);
        }
        if (curPoints >= 500 && curPoints <= 999 && curRank != "Loyal") {
            let member = message.guild.member(userId);
            //message.member.removeRole(liked);
            updateRank("Loyal", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(loyal);
        }
        if (curPoints >= 1000 && curPoints <= 1999 && curRank != "Adored") {
            let member = message.guild.member(userId);
            //message.member.removeRole(trusted);
            updateRank("Adored", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(adored);
        }
        if (curPoints >= 2000 && curPoints <= 3999 && curRank != "Famous") {
            let member = message.guild.member(userId);
            //message.member.removeRole(idolized);
            updateRank("Famous", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(famous);
        }
        if (curPoints >= 4000 && curRank != "Hot Single Dad") {
            let member = message.guild.member(userId);
            //message.member.removeRole(renowned);
            updateRank("Hot Single Dad", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(single);
        }
    });


});

function checkPoints() {
    //console.log(userId);
    var idExists;

    getUser(userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        //console.log(result.rows[0].exists);
        idExists = result.rows[0].exists;

        if (givenPoints.get(userName) == userId) {
            givenPoints.forEach(function(userId, userName, givenPoints) {
                updateUser(userId, 1, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    givenPoints.clear();
                });
            });
        } else {
            console.log('No available users found.');
        }
    });
}

setInterval(checkPoints, 180000);

var cbot = new cleverbot("fZFi0nV8w5JRU0uf", "Z3mf66x7lAmsjt2kI4QhQmpkLTskjNPm");
cbot.setNick("imguraffe");
cbot.create(function(err, session) {
	chat = function(line, callback) {
		cbot.ask(line, function(err, response) {
			callback(response);
		});
	};
});

bot.on("message", msg => {
    if (msg.content.startsWith(".ping")) {
		var ping = ["wot do u want m8", "This better be good.", "Ugh, it's you again.", "u wot.", "I was just about to leave, what do you need?", "Yeah, I'm still here. Relax.", "Could I get ONE second of peace?"];
		var ping = ping[Math.floor(Math.random() * ping.length)];
		
        msg.channel.send(ping);
    }
	if(msg.content.startsWith(".help")) {
		var args = msg.content.split(' ');
		if (args[1] == 1 || args[1] == undefined) {
			msg.channel.send("", {embed: {
				color: 1352973,
				author: {
					name: 'Help Page 1'
				},
				description: '--------------\n',
				fields: [
					{
					name: '.ping',
					value: '`Ping the bot.`'
					},
					{
					name: '.profile',
					value: '`Check how many points you have.`'
					},
					{
					name: '.ranks',
					value: '`Display possible ranks`'
					},
					{
					name: '.roll',
					value: '`Roll a X sided die Y amount of times.`\n`Usage: .roll <sides> <times to roll>`'
					},
					{
					name: '.leaders',
					value: '`Display the current leaders.`'
					}
				],
				footer: {
					text: 'Type .help 2 for more.'
				}
			}});
		} else if (args[1] == 2) {
			msg.channel.send("", {embed: {
				color: 1352973,
				author: {
					name: "Rules Page 2"
				},
				description: '--------------\n',
				fields: [
					{
					name: '.insult',
					value: '`Insult someone in the Discord server.`\n`Usage: .insult @<target>`'
					},
					{
					name: '.compliment',
					value: '`Send some good words to someone in the Discord server.`\n`Usage: .compliment @<target>`'
					},
					{
					name: '.giraffe',
					value: '`Talk to Giraffe.`\n`Usage: .giraffe <text>`'
					},
					{
					name: '.funfact',
					value: '`Get a random fun fact from the bot.`'
					},
					{
					name: '.catfact',
					value: '`Get a random cat fact from the bot.`'
					},
					{
					name: '.avatar',
					value: '`Get users Avatar.`\n`Usage: .avatar @<target> OR .avatar`'
					},
				],
				footer: {
					text: 'Type .help or .help 3 for more.'
				}
			}});
		} else if (args[1] == 3) {
			msg.channel.send("", {embed: {
				color: 1352973,
				author: {
					name: "Rules Page 2"
				},
				description: '--------------\n',
				fields: [
					{
					name: '.roulette',
					value: '`Pull the trigger and see if you survive!`'
					},
					{
					name: '.rat',
					value: '`Vive la Révolution!`'
					}
				],
				footer: {
					text: ''
				}
			}});
		}
	}
    if (msg.content.startsWith(".ching")) {
        msg.channel.send("chong");
    }
    if (msg.content.startsWith(".ranks")) {
        msg.channel.send("```Ranks:\n-New: 0-249 points\n-Liked: 250-499 points\n-Loyal: 500-999 points\n-Adored: 1000-1999 points\n-Famous: 2000-3999 points\n-Hot SIngle Dad: 4000+ points```");
    }
    if (msg.content.startsWith(".roll")) {
        var mess = msg.content.split(' ');
        var sided = parseInt(mess[1]);
        if (isNaN(sided)) {
            sided = 6;
        }
        if (sided > 1337) {
            sided = 1337;
        }
        var times = parseInt(mess[2]);
        if (isNaN(times)) {
            times = 1;
        }
        if (times > 5) {
            times = 5;
        }
        var num = 0;
        for (var i = 0; i < times; i++) {
            num += Math.floor((Math.random() * sided) + 1);
        }
        if (times > 1) {
            msg.channel.send("[Dice] " + msg.author.username + " rolls a " + sided + "-sided die " + times + " times: " + num);
        } else {
            msg.channel.send("[Dice] " + msg.author.username + " rolls a " + sided + "-sided die: " + num);
        }
    }
    if (msg.content.startsWith(".leaders")) {

        getLeaders(function(err, result) {
			first = result.rows[0].username;
			second = result.rows[1].username;
			third = result.rows[2].username;
            if (err) {
                console.log(err);
            }
            var leaderMsg = "";

            for (i = 0; i < 10; i++) {
                var ii = i + 1;
                leaderMsg += "["+ii+"]" + " \t>#" + result.rows[i].username + "\n\t\t\thas " + result.rows[i].points + " points. Rank:" + result.rows[i].rank + "\n";
            }
            msg.channel.send("```cs\n-Leaderboard-\n\n" + leaderMsg + "```");
        });

    } /*
    if (msg.content.startsWith(".slots")) {
		getInfo(userId, function(err, result) {
			if (err) {
				console.log(err);
			}
			var pointsLeft = result.rows[0].points - 5;
			var pointsLeft2 = result.rows[0].points;
			getJackpot(function(err, results) {
				if (err) {
					console.log(err);
				}
				var jackpot = results.rows[0].jpoints;
				if (pointsLeft2 >= 5) {
					subtractPoints(userId, 5, function(err, result) {
						if (err) {
							console.log(err);
						}
					});
					
					firstSlot = randomInt(1, 8);
					secondSlot = randomInt(1, 8);
					thirdSlot = randomInt(1, 8);
				
					if (firstSlot == 1) {
						Slot1 = ":heart:";
					} else if (firstSlot == 2) {
						Slot1 = ":peace:";
					} else if (firstSlot == 3) {
						Slot1 = ":joystick:";
					} else if (firstSlot == 4) {
						Slot1 = ":white_flower:";
					} else if (firstSlot == 5) {
						Slot1 = ":star_of_david:";
					} else if (firstSlot == 6) {
						Slot1 = ":slight_smile:";
					} else if (firstSlot == 7) {
						Slot1 = ":money_with_wings:";
					}
				
					if (secondSlot == 1) {
						Slot2 = ":heart:";
					} else if (secondSlot == 2) {
						Slot2 = ":peace:";
					} else if (secondSlot == 3) {
						Slot2 = ":joystick:";
					} else if (secondSlot == 4) {
						Slot2 = ":white_flower:";
					} else if (secondSlot == 5) {
						Slot2 = ":star_of_david:";
					} else if (secondSlot == 6) {
						Slot2 = ":slight_smile:";
					} else if (secondSlot == 7) {
						Slot2 = ":money_with_wings:";
					}
				
					if (thirdSlot == 1) {
						Slot3 = ":heart:";
					} else if (thirdSlot == 2) {
						Slot3 = ":peace:";
					} else if (thirdSlot == 3) {
						Slot3 = ":joystick:";
					} else if (thirdSlot == 4) {
						Slot3 = ":white_flower:";
					} else if (thirdSlot == 5) {
						Slot3 = ":star_of_david:";
					} else if (thirdSlot == 6) {
						Slot3 = ":slight_smile:";
					} else if (thirdSlot == 7) {
						Slot3 = ":money_with_wings:";
					}
				
					var winmessage;
					if (Slot1 == ":heart:" && Slot2 == ":heart:" && Slot3 == ":heart:") {
						winmessage = "3 hearts in a row! You win 45 points.";
						updateUser(userId, 45, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":peace:" && Slot2 == ":peace:" && Slot3 == ":peace:") {
						winmessage = "3 peace signs in a row. World peace for everyone :D\nYou win 50 points.";
						updateUser(userId, 50, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":joystick:" && Slot2 == ":joystick:" && Slot3 == ":joystick:") {
						winmessage = "Go on, go and play a game. You win 15 points.";
						updateUser(userId, 15, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":white_flower:" && Slot2 == ":white_flower:" && Slot3 == ":white_flower:") {
						winmessage = "Go and smell the roses. You got three in a row!\nYou win 45 points.";
						updateUser(userId, 45, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":star_of_david:" && Slot2 == ":star_of_david:" && Slot3 == ":star_of_david:") {
						winmessage = "What are you, jewish? You win 35 points...I guess.";
						updateUser(userId, 35, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":slight_smile:" && Slot2 == ":slight_smile:" && Slot3 == ":slight_smile:") {
						winmessage = "Let's see that smile, you got three in a row!\nYou win 60 points!";
						updateUser(userId, 60, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == ":money_with_wings:" && Slot2 == ":money_with_wings:" && Slot3 == ":money_with_wings:") {
						winmessage = "JACKPOT! You win " + jackpot + " points. Congrats!";
						
						if (jackpot > 0) {
							updateUser(userId, jackpot, function(err, result) {
								if (err) {
									console.log(err);
								}
								subtractJackpot(0, function(err, result) {
									if (err) {
										console.log(err);
									}
								});
							});
						} else {
							msg.channel.send(`There's nothing in the jackpot. Play a bit more and build it up big.`);
						}
					} else {
						winmessage = "Better luck next time...";
						addJackpot(3, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					}
					msg.channel.send("Subtracted 5 points from your total. You have **"+ pointsLeft +"** points remaining.\n" + msg.author + " pulled the lever:\n    ▄▄▄▄▄▄▄▄▄\n    " + Slot1 + " | " + Slot2 + " | " + Slot3 + "\n    ▀▀▀▀▀▀▀▀▀\n`[JACKPOT: " + jackpot + " points.]`\n" + winmessage);
				} else {
					msg.channel.send(`${msg.author}, looks like you don't have enough points to play. Talk a bit more on the server to get some more points :)`);
				}
			});
			
		});
    } */
    if (msg.content.startsWith(".insult")) {
        //var args = msg.content.split(" ");
        var insultee = msg.mentions.users.first();

        var adj = ["a terrible", "a sucky", "an idiotic", "a goat-born", "a big-headed", "a snot-nosed", "a funny-looking", "an attention-seeking", "a lazy", "a lonely", "a monstrous", "a matronly", "a repulsive", "a lame", "a cock-sucking", "a dissapointing", "a let-down of", "a dodgy", "a dead from the neck up", "a shriveled from the waist down", "a bowlegged", "a neck-bearded", "a crazy-eyed", "a scottish", "a nice", "a friendly", "an infectious", "a lumpish", "a mangled", "an artless", "a warped", "a wayward", "a skinny", "a puny", "a fat", "a chubby", "an obtuse", "a pencil-thin", "a skinny-penised", "a chinese", "a dying", "a nigger-whipping", "a misshapen", "a pregnant", "a decrepit", "a bitter", "a racist", "a petty"];
		var adj2 = ["terrible", "sucky", "idiotic", "goat-born", "big-headed", "snot-nosed", "funny-looking", "attention-seeking", "lazy", "lonely", "monstrous", "matronly", "repulsive", "lame", "cock-sucking", "dissapointing", "let-down of a(n)", "dodgy", "dead from the neck up", "shriveled from the waist down", "bowlegged", "neck-bearded", "crazy-eyed", "scottish", "nice", "friendly", "infectious", "lumpish", "mangled", "artless", "warped", "wayward", "skinny", "puny", "fat", "chubby", "obtuse", "pencil-thin", "skinny-penised", "chinese", "dying", "nigger whipping", "misshapen", "pregnant", "decrepit", "bitter", "racist", "petty"];
        var randadj = adj[Math.floor(Math.random() * adj.length)];
        var randadj2 = adj2[Math.floor(Math.random() * adj2.length)];
        var randadj3 = adj2[Math.floor(Math.random() * adj2.length)];

        var noun = ["a failed abortion", "an untreated cancer cell", "a fattened cow", "a 12 year old child", "a cunt waffle", "a whore", "a bag of human waste", "a bag of pickled dicks", "a wanna-be", "a dick", "a retard", "a disappointment", "a forgotten orphan", "a carpet muncher", "a cum chugger", "a bellend", "a spawn of satan", "a nit-wit", "a chink", "a cum rag", "a thunder cunt", "a alabama hot pocket", "a reject Ken doll", "a social reject", "a man servant", "a guy", "a black man", "a white man", "a asian man", "a indian man", "a creeper", "a pedophile", "a crank whore", "a cuntbag", "a ding-head", "a doofus", "a cockbag", "a basket-case", "a crotch fruit", "a crap-fest"];
        var noun2 = ["failed abortion", "untreated cancer cell", "fattened cow", "12 year old child", "cunt waffle", "whore", "bag of human waste", "bag of pickled dicks", "wanna-be", "dick", "retard", "disappointment", "forgotten orphan", " carpet muncher", "cum chugger", "bellend", "spawn of satan", "nit-wit", "chink", "cum rag", "thunder cunt", "alabama hot pocket", "reject Ken doll", "social reject", "man servant", "guy", "black man", "white man", "asian man", "indian man", "creeper", "pedophile", "crank whore", "cuntbag", "ding-head", "doofus", "cockbag", "basket-case", "crotch fruit", "crap-fest"];
		var randnoun = noun[Math.floor(Math.random() * noun.length)];
        var randnoun2 = noun2[Math.floor(Math.random() * noun2.length)];

        if (randnoun == randnoun2) {
            randnoun2 = noun[Math.floor(Math.random() * noun.length)];
        }

        var insulttemplates = [`${insultee}, you are **${randadj}**, **${randadj2}** **${randnoun2}.**`, `${insultee}, you are  **${randadj}** **${randnoun2}.**`, `${insultee} is nothing more but **${randadj}** **${randnoun2}.**`, `${insultee} is nothing but **${randnoun}**, balls deep fucking **${randnoun}.**`, `${insultee}, the only thing you have going for you is fulfilling your life as **${randadj}** **${randnoun2}.**`, `I would never talk about **${randadj}** **${randnoun2}** such as ${insultee}.`, `${insultee}, your personality reminds me of **${randadj}** **${randnoun2}**, but worse.`, `Why would I waste my time insulting a **${randadj}** **${randnoun2}** like ${insultee}.`]
        var randinsult = insulttemplates[Math.floor(Math.random() * insulttemplates.length)];

        if (randadj == "friendly" && randnoun == "guy") {
            updateUser(userId, 200, function(err, result) {
                if (err) {
                    console.log(err);
                }
                randinsult += "\nAw what a nice thing to say! Have some free points. On me :)";
				msg.channel.send(randinsult);
            });
        } else {
			msg.channel.send(randinsult);
		}

    }
	if(msg.content.startsWith(".rat")) {
		var rat = ["https://cdn.discordapp.com/attachments/269925256943239169/271313901004521487/handsomeratboy.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313923280601105/meme_police.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313950602166272/old_soldier.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313967937224705/ratbye.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313981807788033/ratno.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314006323625984/ratno1.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314057041018880/shit_holiday_rat_1.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314088188051466/rebellionhero.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314123092918272/allhailthetruegod.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679652815175690/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679733652127744/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679776698138634/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008047105146880/ratgottem.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008924620652545/Rats_Spaghetti.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008950478667776/ratno4.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008987388411904/ratno3.png"]
		rat = rat[Math.floor(Math.random() * rat.length)];
		
		msg.channel.send(rat);
	}
	if (msg.content.startsWith(".compliment")) {
        var target = msg.mentions.users.first();

        var adj = ["friendly", "nice", "awesome", "cute", "amazing", "spectacular", "intriguing", "flattering", "lovely", "humble", "perfect", "appreciated", "great", "smiling", "humorous", "breathtaking", "cool", "courageous", "ambitious", "affectionate", "adventurous", "compassionate", "considerate"];
        var randadj = adj[Math.floor(Math.random() * adj.length)];
        var randadj2 = adj[Math.floor(Math.random() * adj.length)];
        var randadj3 = adj[Math.floor(Math.random() * adj.length)];

        var noun = ["human", "person", "winner", "prodigy", "guy", "ray of sunshine", "smart cookie", "eager beaver", "champ", "charmer", "babe", "hard worker", "idolizer", "individual", "homemaker", "inspirer", "intellectual"];
        var randnoun = noun[Math.floor(Math.random() * noun.length)];
        var randnoun2 = noun[Math.floor(Math.random() * noun.length)];

        if (randnoun == randnoun2) {
            randnoun2 = noun[Math.floor(Math.random() * noun.length)];
        }

        var comptemplates = [`${target}, you are a ${randadj} ${randnoun}. We appreciate you :)`, `${target}, you are the best there ever was, you ${randadj} ${randnoun}.`];
        var randcomp = comptemplates[Math.floor(Math.random() * comptemplates.length)];
		
			msg.channel.send(randcomp);
    }
    if (msg.content.startsWith('.giraffe') || msg.content.startsWith('.Giraffe')) {
        var line = msg.content.slice(msg.content.indexOf('.giraffe') + 9);
		
        chat(line, function (response) {
            msg.reply(response);
        })

    }
	if (msg.content.startsWith(".funfact" || ".ff")) {
		var funfacts = ["Banging your head against a wall burns 150 calories an hour.", "When hippos are upset, their sweat turns red.", "The average woman uses her height in lipstick every 5 years.", "Billy goats urinate on their own heads to smell more attractive to females.", "During your lifetime, you will produce enough saliva to fill two swimming pools.", "Cherophobia is the fear of fun.", "King Henry VIII slept with a gigantic axe beside him.", "An eagle can kill a young deer and fly away with it.", "If Pinokio says 'My Nose Will Grow Now', it would cause a paradox.", "Bikinis and tampons were invented by men.", "An average person's yearly fast food intake will contain 12 pubic hairs.", "A toaster uses almost half as much energy as a full-sized oven.", "You cannot snore and dream at the same time.", "A baby octopus is about the size of a flea when it is born.", "In Uganda, 50% of the population is under 15 years of age.", "Catfish are the only animals that naturally have an odd number of whiskers.", "Facebook, Skype and Twitter are all banned in China.", "95% of people text things they could never say in person.", "Smearing a small amount of dog feces on an insect bite will relieve the itching and swelling.", "Hitler’s mother considered abortion but the doctor persuaded her to keep the baby.", "Recycling one glass jar saves enough energy to watch TV for 3 hours.", "The top six foods that make your fart are beans, corn, bell peppers, cauliflower, cabbage and milk.", "Nearly three percent of the ice in Antarctic glaciers is penguin urine.", "About 8,000 Americans are injured by musical instruments each year.", "The Titanic was the first ship to use the SOS signal.", "The total number of steps in the Eiffel Tower are 1665.", "The testicles on an octopus are located in its head!", "The first alarm clock could only ring at 4am.", "Birds don't urinate."];
		var randfacts = funfacts[Math.floor(Math.random() * funfacts.length)];
        msg.reply(randfacts);
    }
    if(msg.content.startsWith(".catfact")) {
        let randomfact = cats.random();
        msg.reply(randomfact);
    }
	if(msg.content.startsWith(".roulette")) {
		var bulletnum = numchance;
		let member = msg.guild.member(userId);
		var usr = msg.author.nickname;
		var dead = msg.guild.roles.find("name", "Grounded");
		
		if (bulletnum == bullets) {
			numchance = randomInt(0, 7);
			msg.channel.send(`:boom::gun: You've been shot!\nReloading...`);
			msg.member.addRole(dead);
			msg.guild.member(userId).setNickname("DEAD " + usr);
			bullets = 7;
			setTimeout(function(){
				msg.member.removeRole(dead);
				msg.guild.member(userId).setNickname(usr);
			}, 300000);
		} else {
			var bulletsleft = "";
			for (var b = 0; b < bullets - 1; b++) {
				bulletsleft += " ○ ";
			}
			bullets = bullets - 1;
			msg.channel.send(`Phew. You're still alive!\nBullets Left: [${bulletsleft}]`);
		}
		if (bullets == 0) {
			msg.channel.send("Reloading...");
			bullets = 6;
		}
    }
	if(msg.content.startsWith(".profile")) {
		if(msg.mentions.users.first() == undefined) {
			userId = msg.author.id;
			getInfo(userId, function(err, result) {
				var rank = result.rows[0].rank;
				var points = result.rows[0].points;
				
				if (err) {
					console.log(err);
				}
				msg.channel.send("", {embed: {
					color: 1352973,
					author: {
						name: msg.member.displayName
					},
					description: '--------------\n',
					fields: [
						{
						name: 'Rank:',
						value: '```cs\n' + rank + '```'
						},
						{
						name: 'Points:',
						value: '```cs\n' + points + '```'
						}
					],
					timestamp: new Date(),
					footer: {
						text: 'Giraffe'
					},
					thumbnail: {
						url: msg.author.avatarURL
					}
				}});
			});
		} else {
			userId = msg.mentions.users.first().id;
			getInfo(userId, function(err, result) {
				var rank = result.rows[0].rank;
				var points = result.rows[0].points;
				
				if (err) {
					console.log(err);
				}
				msg.channel.send("", {embed: {
					color: 1352973,
					author: {
						name: msg.mentions.users.first().username
					},
					description: '--------------\n',
					fields: [
						{
						name: 'Rank:',
						value: '```http\n' + rank + '```'
						},
						{
						name: 'Points:',
						value: '```http\n' + points + '```'
						}
					],
					timestamp: new Date(),
					footer: {
						text: 'Giraffe'
					},
					thumbnail: {
						url: msg.mentions.users.first().avatarURL
					}
				}});
			});
		}
	}
	if (msg.content.startsWith(".avatar")) {
		if(msg.mentions.users.first() == undefined) {
			msg.channel.send(`:frame_photo: **${userName}'s Avatar:**\n${msg.author.avatarURL}`);
		} else {
		msg.channel.send(`:frame_photo: **${msg.mentions.users.first().username}'s Avatar:**\n${msg.mentions.users.first().avatarURL}`);
		}
	}
	if(msg.content.startsWith(".erp")) {
		getRandomLine('./server/erp.txt');
		msg.channel.send(response);
		
		msg.delete();
	}
	if(msg.content.startsWith(".noco")) {
		noco = getRandomLine('./server/Clippy.txt');
		msg.channel.send(noco);
		
		msg.delete();
	}
	if (msg.content.startsWith('.infomercial')) {
		var mod = msg.guild.roles.get("257745006511521803");
		var member = msg.guild.member(userId);
		if (!msg.member.roles.has("257745006511521803")) {
			return;
		}
		msg.delete();
		var vid = ["https://youtu.be/cb9D00XnVO8?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/b4xw8dJkicI?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/0dx6eGpekOc?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/6e3z2H1O5zE?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/gZKUJT7-6iI?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/cG2krftM2eQ?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/lfYBeHurkZo?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/7PKG_YfWlCc", "https://youtu.be/LVx6lp5IC6o?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/g2g4YBGn8i4?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://youtu.be/s_eC-s-b-zw?list=PL8VfA9WymQTYvyRilRj4jXzwsnbfM4DzG", "https://www.youtube.com/watch?v=HAaYSQpacrU", "https://www.youtube.com/watch?v=-IrlhLF1c3k", "https://www.youtube.com/watch?v=4NOQM9duf9U", "https://www.youtube.com/watch?v=YvnGRyYTUoM", "https://www.youtube.com/watch?v=wed9xtPl5a0"];
		vid = vid[Math.floor(Math.random() * vid.length)];
		
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
		return msg.reply(`Please be in a voice channel first!`);
		}
		voiceChannel.join()
			.then(connnection => {
				let stream = yt(vid, {audioonly: true});
				const dispatcher = connnection.playStream(stream);
				dispatcher.on('end', () => {
					voiceChannel.leave();
				});
			});
	}
	if (msg.content.startsWith(".stopinfo")) {
		if (!msg.member.roles.has("257745006511521803")) {
			return;
		}
		msg.delete();
		var voiceChnl = msg.member.voiceChannel;
		voiceChnl.leave();
	}
	if(msg.content.startsWith(".translate")){
		var arg = msg.content.split(" / ");
		var lang = arg[1];
		
		if(lang !== "spanish" && lang !== "Spanish" && lang !== "french" && lang !== "French") {
			msg.channel.send(`Sorry, that's not a valid language. This command only translates to spanish, french, italian currently.`);
			
		} else if(lang == "Spanish" || lang == "spanish") {
			var spanresp = ['Somethin spanish, idk.', 'I can\'t tell, something about tacos.', 'Hey, free burrito night! Wait, no.'];
			var spanresp = spanresp[Math.floor(Math.random() * spanresp.length)];
			
			msg.channel.send(`${spanresp}`);
			
		} else if(lang == "French" || lang == "french") {
			var franresp = ['Wee wee, jar le france swah?', 'Blah, blah, baguette.', 'This is the one with the Eye-filled tower right?'];
			var franresp = franresp[Math.floor(Math.random() * franresp.length)];
			
			msg.channel.send(`${franresp}`);
		} else if(lang == "Italian" || lang == "italian") {
			var franresp = ['Wee wee, jar le france swah?', 'Blah, blah, baguette.', 'This is the one with the Eye-filled tower right?'];
			var franresp = franresp[Math.floor(Math.random() * franresp.length)];
			
			msg.channel.send(`${franresp}`);
		}
	}
	if(msg.content.startsWith(".trigger")){
		var target = msg.mentions.users.first();
		
		msg.delete();
		
		if(target == undefined) {
			msg.channel.send(`:rotating_light: ${msg.author} is **TRIGGERED**!!! :rotating_light:`);
		} else {
			msg.channel.send(`:rotating_light: ${target} is **TRIGGERED**!!! :rotating_light:`);
		}
	}
	
	if(msg.content.startsWith(".report")) {
		var target = msg.mentions.users.first();
		
		var msgs = [`${target}, STOP! You\'ve violated the law!`, `OOOOOOO, ${target} you\'re in big trouble now buddy!`, `${target}, hey! You\'re getting called out!`, `${target}, I\'m gonna find you and destroy everything you love if you do that again.`];
		var msgs = msgs[Math.floor(Math.random() * msgs.length)];
		
		if(target === undefined) {
			msg.channel.send(`${msg.author}, you have to specify a target. Try again!`);
		} else {
			msg.channel.send(msgs);
		}
	}
	
	if(msg.content.startsWith(".ship")){
		var user = msg.content.split(" ");
		var target1 = user[1];
		var target2 = user[2];
		
		if(target1 == "@everyone" || target2 == "@everyone") {
			msg.reply(`Don't mention everyone, dickweed.`);
			return;
		}
		
		var middle1 = Math.floor(target1.length / 2);
		var middle2 = Math.floor(target2.length / 2);
		
		var firstpart = target1.substr(0, middle1);
		var lastpart = target2.substr(middle2);
		
		var shipname = firstpart + lastpart;
		
		/*target1 = target1.username;
		target2 = target2.username;*/
		
		msg.reply(`Here's your new ship name!\n:heart: ${shipname} :heart:`);
	}
	
	if(msg.content.startsWith(".lottolove")){
		var user = msg.content.split(" ");
		var target1 = user[1];
		var target2 = user[2];
		 
		var percent = Math.floor((Math.random() * 100) + 1);
		
		if(percent > 0 && percent < 10) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**Yikes. Don't even think about it.**`);
		} else if(percent > 11 && percent < 20) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**I wouldn't recommend anything intimate. Just go bowling or something.**`);
		} else if(percent > 21 && percent < 30) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**Like two peas in a pod. The only difference is that those two peas are in an unstable relationship.**`);
		} else if(percent > 31 && percent < 40) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**You could try I guess, but it might not exactly end in sex.**`);
		} else if(percent > 41 && percent < 50) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**Eh, half and half. Who knows?**`);
		} else if(percent > 51 && percent < 60) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**You could possibly make something work out between the two of you. I'm no judge.**`);
		} else if(percent > 61 & percent < 70) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**You can definitely make this work, go ahead and try. The odds are with you. jk ay lmao.**`);
		} else if(percent > 71 && percent < 80) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**I'm sure you are going to agree on some things and beat each other up on others. But that's love, right?**`);
		} else if(percent > 81 && percent < 90) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**Oof, so close to true love but so far away. Either way, you could still have a good relationship.**`);
		} else if(percent > 91 && percent < 100) {
			msg.reply(`**COMPATIBILITY CALCULATOR**:couple_with_heart:\n**${target1}** and **${target2}** have a compatibility percentage of ${percent}%.\n**DING DING. That's the sound of the true love alarm going off.**`);
		}
	}
	if(msg.content.startsWith(".colorme") || msg.content.startsWith(".colourme")) {
		getColor(userId, function(err, result) {
			curcolor = result.rows[0].color;
			console.log("CurColor on command: " + curcolor);
			if (err) {
				console.log(err);
			}
			
			var args = msg.content.split(" ");
			var color = args[1];
			var colorpure = color;
			//var line = args[0] + " " + args[1] + "  ";
			//var colorname = msg.content.slice(msg.content.indexOf('.giraffe') + line.length);
			/*if (args[2] == undefined) {
				colorname = curcolor;
			}*/
			
			if (curcolor == undefined) {
				curcolor = " ";
			}
			
			if (!msg.member.roles.has("269838042221510657")) {
					msg.channel.send("HEY. Only **Hot Single Dads** can use this command.");
					return;
				} else {
				
				if (color == undefined) {
					msg.channel.send("Make sure you define a valid hex code!");
					return;
				}
				
				if (color.charAt(0) == "#") {
					if (color.length != 7) {
						msg.channel.send("Make sure you define a valid hex code!");
					}
					color = color;
				} else if (color.charAt(0) != "#") {
					if (color.length != 6) {
						msg.channel.send("Make sure you define a valid hex code!");
					}
					color = "#" + color;
				}
				console.log("Color to change to: " + color);
				
				if (msg.guild.roles.find("name", curcolor) != null) {
						
						getColor(userId, function(err, result) {
							var dbcolor = result.rows[0].color;
							console.log("CurColor after command not null: " + dbcolor);
							if (err) {
								console.log(err);
							}
							var rolex = msg.member.roles.find("name", dbcolor).id;
							
							msg.channel.send(`Changed your color to ${color}, enjoy!`);
							
							updateColor(color, userId, function(err, result) {
								console.log("Successfully added role name to DB!");
								msg.guild.roles.get(rolex)
								.setColor(color);
								if (err) {
									console.log(err);
								}
							});
						});
					
				} else if (msg.member.roles.find("name", curcolor) == null) {
					msg.guild.createRole({
						name: color,
						color: color
					});
					updateColor(color, userId, function(err, result) {
							console.log("Successfully added role name to DB!");
							if (err) {
								console.log(err);
							}
					});
					function giveColor() {
						getColor(userId, function(err, result) {
							curcolor = result.rows[0].color;
							console.log("CurColor after command null: " + curcolor);
							if (err) {
								console.log(err);
							}
							var newrole = msg.guild.roles.find("name", curcolor).id;
							msg.guild.setRolePosition(newrole, "12");
							msg.member.addRole(newrole);
							msg.channel.send(`Made you a custom role and changed your color to ${color}, just for you!`);
						});
					}
					setTimeout(giveColor, 400);
				}
			}
		});
	}
	if (msg.content.startsWith("LMAO")) {
		msg.reply("Is it really *that* funny?");
	} else if (msg.content.startsWith("xd") + msg.content.startsWith("XD")) {
		var emojis = msg.guild.emojis.find("name", "xd");
		msg.react(emojis);
	} else if (msg.content.startsWith("ROFL")) {
		msg.reply("ROFLCOPTER XDDDD");
	}
	if (msg.content.startsWith(".8ball")) {
		var q = msg.content.split(" ");
		q = q[1];
		if (q == undefined) {
			msg.reply("\n:8ball: Please ask a valid question.");
			return;
		}
		var responses = ["It is certain.", "Reply hazy try again.", "Don't count on it.", "It is decidedly so.", "Ask again later.", "My reply is no.", "Without a doubt,", "Yes definitely.", "You may rely on it.", "Better not tell you now.", "My sources say no.", "As I see it, yes.", "Cannot predict now", "Outlook not so good.", "Most likely.", "Outlook good.", "Yes", "Concentrate and ask again.", "Very doubtful.", "Signs point to yes."];
		response = responses[Math.floor(Math.random() * responses.length)];
		msg.reply("\n:8ball: " + response);
	}
	if (msg.content.startsWith(".9ball")) {
		var q = msg.content.split(" ");
		q = q[1];
		if (q == undefined) {
			msg.reply("\n:8ball: Please ask a valid question.");
			return;
		}
		var responses = ["Well, what do *you* think?", "Hey I don't have time for this. Sure I guess?.", "When are you going to ask an *actual* question?", "Isn't it obvious?", "Go away, I'm busy.", "I might just ask you the same thing.", "My sources say you're a big dickweed.", "**Nein nein nein nein nein nein nein**", "Let's all admit it, no one cares.", "Who do you think I am? Albert Einstein?", "If you believe, it will come true.", "Excuse me while I continue ignoring you", "I'm the Magic 9 Ball, not a genius.", "HAH, you're asking about *that*? What an idiot.", "You never know. Yes? No? Who knows.", "I'm gonna be perfectly honest with you. I don't care.", "**LALALALALALALALALALA** can't hear you!", "Concentrate and leave me alone.", "Don't use this command again. It's a waste of my time.", "Signs point to you, the idiot who has to ask a bot the answers to his questions."];
		response = responses[Math.floor(Math.random() * responses.length)];
		msg.reply("\n:8ball: " + response);
	}
});

var response;
function getRandomLine(filename){
  var data = fs.readFileSync(filename, 'utf8');
    data += '';
    var lines = data.split('\n');
    response = lines[Math.floor(Math.random()*lines.length)];
    return response;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

bot.login("MjU3ODUzNDUyNTczNjA1ODkw.CzHkmg.ABl6qzKngiG2LQknVw3vfcoj6SQ");


var app = express();
app.server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/************************************/
/* DATABASE QUERY FUNCTIONS */
/************************************/
function getUser(id, cb) {
    query(`SELECT (EXISTS(SELECT * FROM users WHERE user_id = '${id}'))::int`, function(err, result) {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
}

function getInfo(id, cb) {
    query(`SELECT points, rank FROM users WHERE user_id = '${id}'`, function(err, result) {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
}

function addUser(level, pts, id, cb) {
    query(`INSERT INTO users(user_id, rank, points) VALUES ('${id}', '${level}', '${pts}') ON CONFLICT (user_id) DO NOTHING`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);
    });
}

function updateUsername(username, id, cb) {
    query(`UPDATE users SET username = '${username}' WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function updateUser(id, pAmount, cb) {
    query(`UPDATE users SET points = points + '${pAmount}' WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

/* function getJackpot(cb) {
    query(`SELECT jpoints FROM jackpot`, function(err, result) {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
}

function addJackpot(jAmount, cb) {
    query(`UPDATE jackpot SET jpoints = jpoints + '${jAmount}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function subtractJackpot(jAmount, cb) {
    query(`UPDATE jackpot SET jpoints = '${jAmount}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
} */

function subtractPoints(id, pAmount, cb) {
    query(`UPDATE users SET points = points - '${pAmount}' WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);
    });
}

function updateRank(rank, id, cb) {
    query(`UPDATE users SET rank = '${rank}' WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function getLeaders(cb) {
    query(`SELECT points, username, rank FROM users ORDER BY points DESC LIMIT 11`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function getColor(id, cb) {
    query(`SELECT color FROM users WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function updateColor(colorn, id, cb) {
    query(`UPDATE users SET color = '${colorn}' WHERE user_id = '${id}'`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

// function addUser(level, pts, id, cb) {
//     query(`INSERT INTO users(user_id, rank, points) VALUES ('${id}', '${level}', '${pts}')`, function(err, result) {
//         if (err)
//             cb(err, null);
//         //console.log(result);
//         cb(null, result);
//     });
// }

// function setPoints(level, pts, id, cb) {
//     //just the function you use to make queries
//     query(`UPDATE users SET rank='${level}', points='${pts}' WHERE user_id='${id}'`, function(err, result) {
//         if (err)
//             cb(err, null);
//         //console.log(result);
//         cb(null, result);
//     });
// }

app.use(express.static('./client'));

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());

// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res) {
//     res.redirect(301, '/404');
// });


app.server.listen(process.env.PORT || 8080);

console.log(`Started on port ${app.server.address().port}`);

export default app;

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
