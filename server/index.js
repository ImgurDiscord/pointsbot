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
var numone;
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
var bullets = 6;
var noco;
var called;
var img;

var cbot = new cleverbot("fZFi0nV8w5JRU0uf", "Z3mf66x7lAmsjt2kI4QhQmpkLTskjNPm");
cbot.setNick("imguraffe");
cbot.create(function(err, session) {
    chat = function(line, callback) {
        cbot.ask(line, function(err, response) {
            callback(response);
        });
    };
});

bot.on("message", message => {
    var neutral = message.guild.roles.find("name", "Neutral");
    var liked = message.guild.roles.find("name", "Liked");
    var trusted = message.guild.roles.find("name", "Trusted");
    var idolized = message.guild.roles.find("name", "Idolized");
    var renowned = message.guild.roles.find("name", "Renowned");
    var glorious = message.guild.roles.find("name", "Glorious");

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

        if (curPoints >= 0 && curPoints <= 249 && curRank != "Neutral") {
            let member = message.guild.member(userId);
            updateRank("Neutral", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(neutral);
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
        if (curPoints >= 500 && curPoints <= 999 && curRank != "Trusted") {
            let member = message.guild.member(userId);
            message.member.removeRole(liked);
            updateRank("Trusted", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(trusted);
        }
        if (curPoints >= 1000 && curPoints <= 1999 && curRank != "Idolized") {
            let member = message.guild.member(userId);
            message.member.removeRole(trusted);
            updateRank("Idolized", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(idolized);
        }
        if (curPoints >= 2000 && curPoints <= 3999 && curRank != "Renowned") {
            let member = message.guild.member(userId);
            message.member.removeRole(idolized);
            updateRank("Renowned", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(renowned);
        }
        if (curPoints >= 4000 && curRank != "Glorious") {
            let member = message.guild.member(userId);
            message.member.removeRole(renowned);
            updateRank("Glorious", userId, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
            message.member.addRole(glorious);
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

bot.on("ready", () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
    numberOne.set('s1', '<https://www.youtube.com/watch?v=StMJ-Kky9DE>');
    numberOne.set('s2', '<https://www.youtube.com/watch?v=CVJGFmr6XrM>');
    numberOne.set('s3', '<https://www.youtube.com/watch?v=ko9UgxRxN20>');
    numberOne.set('s4', '<https://www.youtube.com/watch?v=RBCYXe5ufas>');
    numberOne.set('s5', '<https://www.youtube.com/watch?v=6tR5aDGcXPg>');
    numberOne.set('s6', '<https://www.youtube.com/watch?v=XNY51SMAj-k>');
    numberOne.set('s7', '<https://www.youtube.com/watch?v=f9_lgbmuwaE>');
    numberOne.set('s8', '<https://www.youtube.com/watch?v=J48dqyz_C6s&t=77s>');
    numberOne.set('s9', '<https://www.youtube.com/watch?v=yeh708tybpM>');
    numberOne.set('s10', '<https://www.youtube.com/watch?v=VhqeNUFCyI0>');
    numberOne.set('s11', '<https://www.youtube.com/watch?v=SNg5aveZWgE>');
    numberOne.set('s12', '<https://www.youtube.com/watch?v=ira5aS3SjMw>');
    numberOne.set('s13', '<https://www.youtube.com/watch?v=8KKJVKTJdDg>');
    numberOne.set('s14', '<https://www.youtube.com/watch?v=WH4egcGHdWY>');
    numberOne.set('s15', '<https://www.youtube.com/watch?v=FPi7ddhzGH0>');
    numberOne.set('s16', '<https://www.youtube.com/watch?v=_OdKM7xa168>');
    numberOne.set('s17', '<https://www.youtube.com/watch?v=uk8LrHFzB0U>');
    numberOne.set('s18', '<https://www.youtube.com/watch?v=kAg3ibAlnGM>');
    numberOne.set('s19', '<https://www.youtube.com/watch?v=BXn4bnhOae0>');
    numberOne.set('s20', '<https://www.youtube.com/watch?v=OR7snPDeyLw>');
    numberOne.set('s21', '<https://www.youtube.com/watch?v=006JQAm6fSM>');
    numberOne.set('s22', '<https://www.youtube.com/watch?v=hKMq4_EFrsw>');
});


bot.on("message", msg => {
    if (msg.content.startsWith(".ping")) {
        msg.channel.sendMessage("Bada ping bada pong.");
    }
    if (msg.content.startsWith(".numone")) {
        numone = numberOne.random();
        msg.channel.sendMessage("Here's your mystery 'We Are Number One meme:' \n" + numone);
    }
    /*if (msg.content.startsWith(".help")) {
        msg.channel.sendMessage("`Commands:`\n:black_small_square:`.ping` - Ping the bot.\n:black_small_square:`.profile` - Check how many points you have.\n:black_small_square:`.ranks` - Display possible ranks.\n:black_small_square:`.numone` - Get a random mystery 'We Are Number One' meme video.\n:black_small_square:`.roll` - Roll a X sided die Y amount of times. Usage: `.roll <sides> <times to roll>`\n:black_small_square:`.leaders` - Display the leaderboard.
		\n:black_small_square:`.insult` - Insult someone in the Discord server. Usage: `.insult <target>`\n:black_small_square:`.compliment` - Send some good words to someone in the Discord server. Usage: `.compliment <target>`\n:black_small_square:`@Giraffe` - Talk to the Giraffe. Usage: `@Giraffe <text> or .giraffe <text>`\n:black_small_square:`.funfact` - Get a fun fact from the bot.\n:black_small_square:`.catfact` - Get a random cat fact from the bot.\n:black_small_square:`.avatar` - Get user's Discord avatar.");
    } */
	if(msg.content.startsWith(".help")) {
		var args = msg.content.split(' ');
		if (args[1] == 1 || args[1] == undefined) {
			msg.channel.sendMessage("", {embed: {
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
					name: '.numone',
					value: '`Get a random mystery "We Are Number One" meme`'
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
			msg.channel.sendMessage("", {embed: {
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
			msg.channel.sendMessage("", {embed: {
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
        msg.channel.sendMessage("chong");
    }
    if (msg.content.startsWith(".ranks")) {
        msg.channel.sendMessage("```Ranks:\n-Neutral: 0-249 points\n-Liked: 250-499 points\n-Trusted: 500-999 points\n-Idolized: 1000-1999 points\n-Renowned: 2000-3999 points\n-Glorious: 4000+ points```");
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
            msg.channel.sendMessage("[Dice] " + msg.author.username + " rolls a " + sided + "-sided die " + times + " times: " + num);
        } else {
            msg.channel.sendMessage("[Dice] " + msg.author.username + " rolls a " + sided + "-sided die: " + num);
        }
    }
    if (msg.content.startsWith(".leaders")) {

        getLeaders(function(err, result) {
            if (err) {
                console.log(err);
            }
            var leaderMsg = "";

            for (i = 0; i < 10; i++) {
                var ii = i + 1;
                leaderMsg += ":small_blue_diamond:" + ii + ") **[" + result.rows[i].username + "]** with **" + result.rows[i].points + "** points. __Rank:__ **" + result.rows[i].rank + "**\n\n";
            }
            msg.channel.sendMessage("**```Top 10 Leaderboard:```**\n" + leaderMsg);
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
							msg.channel.sendMessage(`There's nothing in the jackpot. Play a bit more and build it up big.`);
						}
					} else {
						winmessage = "Better luck next time...";
						addJackpot(3, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					}
					msg.channel.sendMessage("Subtracted 5 points from your total. You have **"+ pointsLeft +"** points remaining.\n" + msg.author + " pulled the lever:\n    ▄▄▄▄▄▄▄▄▄\n    " + Slot1 + " | " + Slot2 + " | " + Slot3 + "\n    ▀▀▀▀▀▀▀▀▀\n`[JACKPOT: " + jackpot + " points.]`\n" + winmessage);
				} else {
					msg.channel.sendMessage(`${msg.author}, looks like you don't have enough points to play. Talk a bit more on the server to get some more points :)`);
				}
			});
			
		});
    } */
    if (msg.content.startsWith(".insult")) {
        //var args = msg.content.split(" ");
        var insultee = msg.mentions.users.first();

        var adj = ["terrible", "sucky", "idiotic", "goat-born", "big-headed", "snot-nosed", "funny-looking", "attention-seeking", "lazy", "lonely", "monstrous", "matronly", "repulsive", "lame", "cock-sucking", "dissapointing", "let-down of a(n)", "dodgy", "dead from the neck up", "shriveled from the waist down", "bowlegged", "neck-bearded", "crazy-eyed", "scottish", "nice", "friendly", "infectious", "lumpish", "mangled", "artless", "warped", "wayward", "skinny", "puny", "fat", "chubby", "obtuse", "pencil-thin", "skinny-penised", "chinese", "dying", "nigger whipping", "misshapen", "pregnant", "decrepit", "bitter", "racist", "petty"];
        var randadj = adj[Math.floor(Math.random() * adj.length)];
        var randadj2 = adj[Math.floor(Math.random() * adj.length)];
        var randadj3 = adj[Math.floor(Math.random() * adj.length)];

        var noun = ["failed abortion", "untreated cancer cell", "fattened cow", "12 year old child", "cunt waffle", "whore", "bag of human waste", "bag of pickled dicks", "wanna-be", "dick", "retard", "disappointment", "forgotten orphan", " carpet muncher", "cum chugger", "bellend", "spawn of satan", "nit-wit", "chink", "cum rag", "thunder cunt", "alabama hot pocket", "reject Ken doll", "social reject", "man servant", "guy", "black man", "white man", "asian man", "indian man", "creeper", "pedophile", "crank whore", "cuntbag", "ding-head", "doofus", "cockbag", "basket-case", "crotch fruit", "crap-fest"];
        var randnoun = noun[Math.floor(Math.random() * noun.length)];
        var randnoun2 = noun[Math.floor(Math.random() * noun.length)];

        if (randnoun == randnoun2) {
            randnoun2 = noun[Math.floor(Math.random() * noun.length)];
        }

        var insulttemplates = [`${insultee}, you are a **${randadj}**, **${randadj2}** **${randnoun}.**`, `${insultee}, you are a **${randadj}** **${randnoun}.**`, `${insultee} is nothing more but a(n) **${randadj}** **${randnoun}.**`, `${insultee} is nothing but a(n) **${randnoun}**, balls deep fucking a **${randnoun2}.**`, `${insultee}, the only thing you have going for you is fulfilling your life as a(n) **${randadj}** **${randnoun}.**`, `I would never talk about a(n) **${randadj}** **${randnoun}** such as ${insultee}.`, `Kill yourself ${insultee}, you **${randadj}** **${randnoun}**.`, `${insultee}, your personality reminds me of a(n) **${randadj}** **${randnoun}**, but worse.`]
        var randinsult = insulttemplates[Math.floor(Math.random() * insulttemplates.length)];

        if (randadj == "friendly" && randnoun == "guy") {
            updateUser(userId, 200, function(err, result) {
                if (err) {
                    console.log(err);
                }
                randinsult += "\nAw what a nice thing to say! Have some free points. On me :)";
				msg.channel.sendMessage(randinsult);
            });
        } else {
			msg.channel.sendMessage(randinsult);
		}

    }
	if(msg.content.startsWith(".rat")) {
		var rat = ["https://cdn.discordapp.com/attachments/269925256943239169/271313901004521487/handsomeratboy.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313923280601105/meme_police.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313950602166272/old_soldier.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313967937224705/ratbye.png", "https://cdn.discordapp.com/attachments/269925256943239169/271313981807788033/ratno.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314006323625984/ratno1.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314057041018880/shit_holiday_rat_1.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314088188051466/rebellionhero.png", "https://cdn.discordapp.com/attachments/269925256943239169/271314123092918272/allhailthetruegod.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679652815175690/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679733652127744/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/271679776698138634/unknown.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008047105146880/ratgottem.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008924620652545/Rats_Spaghetti.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008950478667776/ratno4.png", "https://cdn.discordapp.com/attachments/269925256943239169/272008987388411904/ratno3.png"]
		rat = rat[Math.floor(Math.random() * rat.length)];
		
		msg.channel.sendMessage(rat);
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
		
			msg.channel.sendMessage(randcomp);
    }
    if (msg.content.startsWith('<@!257853452573605890>') || msg.content.startsWith('.giraffe') || msg.content.startsWith('.Giraffe')) {
        var line = msg.content.slice(msg.content.indexOf('>') + 2);
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
		var num = randomInt(0, 7);
		var bulletnum = randomInt(0, 7);
		
		if (num == bulletnum) {
			msg.channel.sendMessage(`:boom::gun: You've been shot!`);
			bullets = 6;
		} else {
			msg.channel.sendMessage(`Phew. You made it through alive.`);
			bullets = bullets - 1;
		}
		if (bullets == 0) {
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
				msg.channel.sendMessage("", {embed: {
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
				msg.channel.sendMessage("", {embed: {
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
			msg.channel.sendMessage(`:frame_photo: **${userName}'s Avatar:**\n${msg.author.avatarURL}`);
		} else {
		msg.channel.sendMessage(`:frame_photo: **${msg.mentions.users.first().username}'s Avatar:**\n${msg.mentions.users.first().avatarURL}`);
		}
	}
	if(msg.content.startsWith(".noco")) {
		//var noco = ["Hi (sry bad english)?", "Seeing as I do nothing with my day but read weird things on the internet, I'll tell you about a theory I've got about antigrav technology and how long the various governments of the world have had it.", "I haven't seen another person for about 3 years now. I spend most of my time either reading or trying to design software and automation to run my household or play with me. Everything seems to be going well. Hopefully I will never have to go outside again.", "So basically, what happened is I decided to tell my family and close friends that I'm into Anal Vore by having a 'coming-out' party. I don't think it went very well and that's why I'm here.", "Start from the present and work yourself backwards.", "Go to your shithomeway and giveback my way. Idon't know what hé supposés to had get à message so important to tell", "I'm so besotted by this girl I keep reminding myself of her existence and making exaggerated facial expressions and tensing my muscles all around my body to express how I feel towards her.", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
		//noco = noco[Math.floor(Math.random() * noco.length)];
		getRandomLine('./server/Clippy.txt');
		msg.channel.sendMessage(noco);
		
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
});

function getRandomLine(filename) {
  fs.readFile(filename, 'utf-8', function(err, data){
    if(err) throw err;
	data+='';
    var lines = data.split('\n');
    noco = lines[Math.floor(Math.random()*lines.length)];
 })
};

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
