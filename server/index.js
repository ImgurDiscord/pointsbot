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
var jackpot = 0;

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

        if (message.content.startsWith(".points")) {
            message.channel.sendMessage(`${message.author}, you have **${curPoints}** points.`);
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
    if (msg.content.startsWith(".help")) {
        msg.channel.sendMessage("`Commands:`\n:black_small_square:`.ping` - Ping the bot.\n:black_small_square:`.points` - Check how many points you have.\n:black_small_square:`.ranks` - Display possible ranks.\n:black_small_square:`.numone` - Get a random mystery 'We Are Number One' meme video.\n:black_small_square:`.roll` - Roll a X sided die Y amount of times. Usage: `.roll <sides> <times to roll>`\n:black_small_square:`.leaders` - Display the leaderboard.\n:black_small_square:`.slots` - Try your luck with the slot machine! Costs **5** points to play.\n:black_small_square:`.insult` - Insult someone in the Discord server. Usage: `.insult <target>`\n:black_small_square:`.compliment` - Send some good words to someone in the Discord server. Usage: `.compliment <target>`\n:black_small_square:`@Giraffe` - Talk to the Giraffe. Usage: `@Giraffe <text>`\n:black_small_square:`.funfact` - Get a fun fact from the bot.");
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
                leaderMsg += ":small_blue_diamond:" + ii + ") **[" + result.rows[i].username + "]** with **" + result.rows[i].points + "** points.\n\n";
            }
            msg.channel.sendMessage("**```Top 10 Leaderboard:```**\n" + leaderMsg);
        });

    }
    if (msg.content.startsWith(".slots")) {
		getInfo(userId, function(err, result) {
			if (err) {
				console.log(err);
			}
			var pointsLeft = result.rows[0].points - 5;
			getJackpot(function(err, result) {
				if (err) {
					console.log(err);
				}
				var jackpot = result.rows[0].jpoints;
				if (pointsLeft >= 5) {
					subtractPoints(userId, 5, function(err, result) {
						if (err) {
							console.log(err);
						}
					});
					
					firstSlot = randomInt(1, 8);
					secondSlot = randomInt(1, 8);
					thirdSlot = randomInt(1, 8);
				
					if (firstSlot == 1) {
						Slot1 = "❤";
					} else if (firstSlot == 2) {
						Slot1 = "☮";
					} else if (firstSlot == 3) {
						Slot1 = "卐";
					} else if (firstSlot == 4) {
						Slot1 = "✿";
					} else if (firstSlot == 5) {
						Slot1 = "✡";
					} else if (firstSlot == 6) {
						Slot1 = " ☺ ";
					} else if (firstSlot == 7) {
						Slot1 = "$";
					}
				
					if (secondSlot == 1) {
						Slot2 = "❤";
					} else if (secondSlot == 2) {
						Slot2 = "☮";
					} else if (secondSlot == 3) {
						Slot2 = "卐";
					} else if (secondSlot == 4) {
						Slot2 = "✿";
					} else if (secondSlot == 5) {
						Slot2 = "✡";
					} else if (secondSlot == 6) {
						Slot2 = " ☺ ";
					} else if (secondSlot == 7) {
						Slot2 = "$";
					}
				
					if (thirdSlot == 1) {
						Slot3 = "❤";
					} else if (thirdSlot == 2) {
						Slot3 = "☮";
					} else if (thirdSlot == 3) {
						Slot3 = "卐";
					} else if (thirdSlot == 4) {
						Slot3 = "✿";
					} else if (thirdSlot == 5) {
						Slot3 = "✡";
					} else if (thirdSlot == 6) {
						Slot3 = " ☺ ";
					} else if (thirdSlot == 7) {
						Slot3 = "$";
					}
				
					var winmessage;
					if (Slot1 == "❤" && Slot2 == "❤" && Slot3 == "❤") {
						winmessage = "3 hearts in a row! You win 45 points.";
						updateUser(userId, 45, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == "☮" && Slot2 == "☮" && Slot3 == "☮") {
						winmessage = "3 peace signs in a row. World peace for everyone :D\nYou win 50 points.";
						updateUser(userId, 50, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == "卐" && Slot2 == "卐" && Slot3 == "卐") {
						winmessage = "Hitler would be proud. You win 15 points.";
						updateUser(userId, 15, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == "✿" && Slot2 == "✿" && Slot3 == "✿") {
						winmessage = "Go and smell the roses. You got three in a row!\nYou win 45 points.";
						updateUser(userId, 45, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == "✡" && Slot2 == "✡" && Slot3 == "✡") {
						winmessage = "What are you, jewish? You win 35 points...I guess.";
						updateUser(userId, 35, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == " ☺ " && Slot2 == " ☺ " && Slot3 == " ☺ ") {
						winmessage = "Let's see that smile, you got three in a row!\nYou win 60 points!";
						updateUser(userId, 60, function(err, result) {
							if (err) {
								console.log(err);
							}
						});
					} else if (Slot1 == "$" && Slot2 == "$" && Slot3 == "$") {
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
					msg.channel.sendMessage("Subtracted 5 points from your total. You have **"+ pointsLeft +"** points remaining.\n" + msg.author + " pulled the lever:\n```▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n▌ " + Slot1 + " ▋ " + Slot2 + "  ▋ " + Slot3 + " ▐\n██████████████████\n██████████████████\nJackpot: " + jackpot + " points```" + winmessage);
				} else {
					msg.channel.sendMessage(`${msg.author}, looks like you don't have enough points to play. Talk a bit more on the server to get some more points :)`);
				}
			});
			
		});
    }
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
    if (msg.content.startsWith('<@!257853452573605890>')) {
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
});

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

function getJackpot(cb) {
    query(`SELECT jpoints FROM jackpot WHERE id = 1`, function(err, result) {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
}

function addJackpot(jAmount, cb) {
    query(`UPDATE jackpot SET jpoints = jpoints + '${jAmount}' WHERE id = 1`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

function subtractJackpot(jAmount, cb) {
    query(`UPDATE jackpot SET jpoints = '${jAmount}' WHERE id = 1`, function(err, result) {
        if (err)
            cb(err, null);
        //console.log(result);
        cb(null, result);

    });
}

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
    query(`SELECT points, username FROM users ORDER BY points DESC LIMIT 11`, function(err, result) {
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
