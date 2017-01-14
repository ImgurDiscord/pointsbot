import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import query from './lib/db.js';
import fs from 'fs';
import Discord from 'discord.js';
const bot = new Discord.Client();
var givenPoints = new Discord.Collection();
var numberOne = new Discord.Collection();
var userId;
var numone;
var uPoints;
var uLevel;

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

    givenPoints.set(message.author.id, message.author.id);

    addUser(uLevel, uPoints, userId, function(err, result) {
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
		
		if (curPoints >= 0 && curPoints <= 499 && curRank != "Neutral") {
			let member = message.guild.member(userId);
			updateRank("Neutral", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(neutral);
		}
		if (curPoints >= 500 && curPoints <= 999 && curRank != "Liked") {
			let member = message.guild.member(userId);
			message.member.removeRole(neutral);
			updateRank("Liked", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(liked);
		}
		if (curPoints >= 1000 && curPoints <= 1999 && curRank != "Liked") {
			let member = message.guild.member(userId);
			message.member.removeRole(liked);
			updateRank("Trusted", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(trusted);
		}
		if (curPoints >= 2000 && curPoints <= 3499 && curRank != "Trusted") {
			let member = message.guild.member(userId);
			message.member.removeRole(trusted);
			updateRank("Idolized", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(idolized);
		}
		if (curPoints >= 3500 && curPoints <= 4999 && curRank != "Idolized") {
			let member = message.guild.member(userId);
			message.member.removeRole(idolized);
			updateRank("Renowned", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(renowned);
		}
		if (curPoints >= 5000 && curRank != "Glorious") {
			let member = message.guild.member(userId);
			message.member.removeRole(renowned);
			updateRank("Glorious", userId, function(err, result) {
				if (err) {
					console.log(err);
				}
			});
			message.member.addRole(glorious);
		}
		
		if (message.content.startsWith(".stats")) {
        message.channel.sendMessage(`${message.author.username}, you have ${curPoints} points.`);
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
		
		if (givenPoints.get(userId) == userId) {
			console.log("user exists. giving points now!");
		if (idExists == 1) {
			updateUser(userId, function(err, result) {
				if (err) {
					console.log(err);
				}
				console.log("User updated successfully :D")
			});
		}
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
        msg.channel.sendMessage("Don't worry, I'm still alive :)");
    }
    if (msg.content.startsWith(".numone")) {
        numone = numberOne.random();
        msg.channel.sendMessage("Here's your mystery 'We Are Number One meme:' \n" + numone);
    }
    if (msg.content.startsWith(".help")) {
        numone = numberOne.random();
        msg.channel.sendMessage("```Commands:\n.ping - Ping the bot.\n.stats - Check how many points you have.\n.numone - Get a random mystery 'We Are Number One' meme video.```");
    }
    if (msg.content.startsWith(".ching")) {
        numone = numberOne.random();
        msg.channel.sendMessage("chong");
    }
});

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

function updateUser(id, cb) {
    query(`UPDATE users SET points = points + 1 WHERE user_id = '${id}'`, function(err, result) {
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
