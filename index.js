import Discord from 'discord.js-12';
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
let exampleEmbed = new Discord.MessageEmbed();
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
let list_username = [];
let list_id = [];
let list_jour_message = [];
let list_heure_message = [];
let chemin_fichier = "./newUser.json";
let answer = "";
let role;
const prefix_wave_react_list = ["hello", "bonjour", "bonsoir", "coucou", "hey", "salut"];
const num_react_list = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
const prefix = "!";

/* ----------------------- Fonction Desmos---------------------------- */

function EnvoiMessageAdmin(messageToAdmin){
    const list = client.guilds.cache.get("904780608922849290");
    list.members.cache.forEach(member => {
        if (member.id !== "905899233876508703") {
            if (member.roles.cache.some(role => role.name === 'Admins')) {
                //if (member.user.cache.bot) return;
                member.send(messageToAdmin);
            } else if (member.roles.cache.some(role => role.name === 'Staff')) {
                //if (member.user.cache.bot) return;
                member.send(messageToAdmin);
            }
        }
    });
}

function LireFichierJson(path){
    fs.readFile(path,{encoding: 'utf8'},function(err,data) {
        let users = JSON.parse(data);
        list_username = users.pseudo;
        list_id = users.id;
        list_jour_message = users.jour;
        list_heure_message = users.heure;
    });
}

function EcrireFichierJson(path, pseudo, id, heure, jour){
    let utilisateur = {
        "pseudo" : pseudo,
        "id" : id,
        "jour" : jour,
        "heure" : heure,
    }
    let donnee = JSON.stringify(utilisateur);
    fs.writeFileSync(path, donnee , function (erreur) {
        if(erreur) console.log(erreur);
    });
}

/* ----------------------------------- Fonction Downloads ------------------------------------------ */

function dateAujourdui() {
    let Aujourdui = new Date();
    Aujourdui.setDate(Aujourdui.getDate() + 1);
    Aujourdui = Aujourdui.toISODate();
    return Aujourdui;
}
function dateSeptJour() {
    let septJours = new Date();
    septJours.setDate(septJours.getDate() - 7);
    septJours = septJours.toISODate();
    return septJours;
}
if (!Date.prototype.toISODate) {
    Date.prototype.toISODate = function() {
        return (
            this.getFullYear() +
            "-" +
            ("0" + (this.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + this.getDate()).slice(-2)
        );
    };
}
function requestHOSDL(message) {
    let nbWeek;
    let NbWeekURL = `https://www.handy-open-source.org/assets/nodejs/gettotal/?startdate=${dateSeptJour()}&enddate=${dateAujourdui()}`;
    let nbWeekDV;
    let NbWeekDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
    let nbWeekDVL;
    let NbWeekDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
    fetch(NbWeekURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data1) {
        fetch(NbWeekDVURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data2) {
            fetch(NbWeekDVLURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data3) {
                nbWeek = `${data1.result[0].total}`;
                nbWeekDV = `${data2.summaries.time.downloads}`;
                nbWeekDVL = `${data3.summaries.time.downloads}`;
                let weektot =
                parseInt(nbWeek, 10) +
                parseInt(nbWeekDV, 10) +
                parseInt(nbWeekDVL, 10);
                weektot = weektot.toString() + "%20cette%20semaine";
                message.channel.send(
                    `https://raster.shields.io/static/v1?message=${weektot}&labelColor=black&color=36393f&label=T%C3%A9l%C3%A9chargements%20DVKBuntu&style=for-the-badge`
                );
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        });
    })
    .catch(err => {
        throw err;
    });

    let nbTotal;
    let nbTotalURL = `https://www.handy-open-source.org/assets/nodejs/gettotal/?startdate=2010-01-01&enddate=${dateAujourdui()}`;
    let nbTotalDV;
    let nbTotalDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
    let nbTotalDVL;
    let nbTotalDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
    fetch(nbTotalURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data1) {
        fetch(nbTotalDVURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data2) {
            fetch(nbTotalDVLURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data3) {
                nbTotal = `${data1.result[0].total}`;
                nbTotalDV = `${data2.total}`;
                nbTotalDVL = `${data3.total}`;
                let Totaltot =
                parseInt(nbTotal, 10) +
                parseInt(nbTotalDV, 10) +
                parseInt(nbTotalDVL, 10);
                Totaltot = Totaltot.toString() + "%20au%20total";
                message.channel.send(
                    `https://raster.shields.io/static/v1?message=${Totaltot}&label=T%C3%A9l%C3%A9chargements%20dvkbuntu&labelColor=black&style=for-the-badge&color=36393f`
                );
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        });
    })
    .catch(err => {
        throw err;
    });
}

/* ----------------------------------- Fonction Mention ------------------------------------------ */

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

/*--------------------------------------Fonction Tâches-------------------------------------------*/

function task(message) {
    let content = message.content.startsWith('!tache')
      ? message.content.substr(6)
      : message.content;
    let channel=message.channel;
    let author=message.author.username;
    let profilepicture=message.author.avatarURL();
    message.delete();
    exampleEmbed
	     .setColor('#0099ff')
	     .setTitle('Tâche à effectuer')
	     .setURL('http://heficience.com/')
	     .setAuthor('Tâche donnée par ' + author, profilepicture, 'http://heficience.com/')
	     .setDescription(content)
	     .setThumbnail(profilepicture)
	     .setTimestamp()
	     .setFooter('👌 Tâche acceptée 👍 Tâche terminée 👎 Tâche abandonnée \nà traiter', 'https://i.imgur.com/SlRpNoc.png');

    channel.send(exampleEmbed);
}

function reacttask(message) {
  message.react('👌');
  message.react('👍');
  message.react('👎');
}

function attributetask(reaction_orig, message, user) {
  message.reactions.removeAll();
  if (reaction_orig.emoji.name == '👌') {
      let content='@' + user.username;
      let channel=message.channel;
      let desc=message.embeds[0].description + '\n<@' + user.id + '> acceptée';
      exampleEmbed
  	     .setColor('#8659DC')
  	     .setTitle('Tâche acceptée')
  	     .setURL('http://heficience.com/')
  	     .setAuthor('Tâche acceptée par ' + user.username, 'https://i.imgur.com/SlRpNoc.png', 'http://heficience.com/')
  	     .setDescription(desc)
             .setThumbnail(user.avatarURL())
  	     .setTimestamp()
  	     .setFooter('👌 Tâche acceptée 👍 Tâche terminée 👎 Tâche abandonnée \n' + content + ' acceptée', 'https://i.imgur.com/SlRpNoc.png');

      message.edit(exampleEmbed);
      reacttask(message);
  }
  else if (reaction_orig.emoji.name == '👍') {
      let content='@' + user.username;
      let channel=message.channel;
      let desc=message.embeds[0].description + '\n<@' + user.id + '> finit';
      exampleEmbed
  	     .setColor('#1D9213')
  	     .setTitle('Tâche terminée')
  	     .setURL('http://heficience.com/')
  	     .setAuthor('Tâche terminée par ' + user.username, 'https://i.imgur.com/SlRpNoc.png', 'http://heficience.com/')
  	     .setDescription(desc)
             .setThumbnail(user.avatarURL())
  	     .setTimestamp()
  	     .setFooter('👌 Tâche acceptée 👍 Tâche terminée 👎 Tâche abandonnée \n' + content + ' finit', 'https://i.imgur.com/SlRpNoc.png');

      message.edit(exampleEmbed);
      //reacttask(message);
  }
  else if (reaction_orig.emoji.name == '👎') {
      let content='@' + user.username;
      let channel=message.channel;
      let desc=message.embeds[0].description + '\n<@' + user.id + '> abandonnée';
      exampleEmbed
         .setColor('#FF0202')
         .setTitle('Tâche laissée vacante')
         .setURL('http://heficience.com/')
         .setAuthor('Tâche abandonée par ' + user.username, 'https://i.imgur.com/SlRpNoc.png', 'http://heficience.com/')
         .setDescription(desc)
         .setThumbnail(user.avatarURL())
         .setTimestamp()
         .setFooter('👌 Tâche acceptée 👍 Tâche terminée 👎 Tâche abandonnée \n' + content + ' abandonnée', 'https://i.imgur.com/SlRpNoc.png');

      message.edit(exampleEmbed);
      reacttask(message);
  }
}
/* ------------------------------------Fonction Rôle ----------------------------------------------*/

function addRole(reaction_orig, message, user) {
  let react = reaction_orig.emoji.name;
  if (react == 'langage_asm' || react == 'langage_c' || react == 'langage_cpp' ||
   react == 'langage_csharp' || react == 'langage_html' || react == 'langage_css' ||
   react == 'langage_java' || react == 'langage_js' || react == 'langage_lua' ||
   react == 'langage_php' || react == 'langage_python' || react == 'qt') {
     role = message.guild.roles.cache.find(r => r.name === react);
     let userMember = message.guild.members.cache.get(user.id)
     userMember.roles.add(role);
   }
}

function removeRole(reaction_orig, message, user) {
  let react = reaction_orig.emoji.name;
  if (react == 'langage_asm' || react == 'langage_c' || react == 'langage_cpp' ||
   react == 'langage_csharp' || react == 'langage_html' || react == 'langage_css' ||
   react == 'langage_java' || react == 'langage_js' || react == 'langage_lua' ||
   react == 'langage_php' || react == 'langage_python' || react == 'qt') {
     role = message.guild.roles.cache.find(r => r.name === react);
     let userMember = message.guild.members.cache.get(user.id)
     userMember.roles.remove(role);
   }
}

/*--------------------------------------Fonction Help-------------------------------------------*/

async function help(message) {
  const myEmbed1 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setImage("https://github.com/Heficience/Heficience-Bot/raw/main/logofinal2large.png")
    .setFooter('1/6')
  const myEmbed2 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setTitle('Heficience Bot Help')
    .setURL('http://heficience.com/')
    .setAuthor('Heficience', 'https://imgur.com/d5JaaER.png', 'http://heficience.com/')
    .setDescription('Aide pour Heficience-Bot')
    .setImage('https://github.com/Heficience/Heficience-Bot/raw/main/Laurels_bot.png')
    .setTitle('Un bot Discord')
    .setFooter('2/6')
  const myEmbed3 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setTitle('I - FONCTIONNALITÉS COOL :')
    .setDescription(
      '  1 - Toute personne qui commence son message par hello, bonjour, bonsoir, coucou, hey et salut aura la réaction : 👋 à son message.\n' +
      '  2 - La commande "**!jitsi**" envoit en réponse un message contenant un lien unique vers la plateforme jitsi.')
    .setFooter('3/6')
  const myEmbed4 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setTitle('II - ADMINISTRATION DU SERVEUR :')
    .setDescription(
      '  1 - Enregistrement des nouveaux arrivants sur un fichier json (l\'utilisation d\'un fichier permet en cas de coupure du bot même temporaire de ne pas réinitialiser la liste des nouveaux utilisateurs).\n' +
      '  2 - Prévenir les Administrateurs et les Modérateurs du Serveur Discord quand les nouveaux arrivants sont là depuis plus de 24h, afin de vérifier qu\'ils ont bien respecté les règles d\'accès au(x) différent(s) statut(s).\n' +
      '  3 - Afin de contrôler les liens postés par tout les intervenants du serveur par l\'équipe d\'Administration, une copie des messages contenant un lien internet sera transmis en MP aux Administrateurs et aux Modérateurs.\n4 - Afin de faciliter la gestion et la communication du serveur, tout message portant la mention @Administrateurs enverra une copie de ce dernier envoyée en MP aux Administrateurs et aux Modérateurs.')
    .setFooter('4/6')
  const myEmbed5 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setTitle('III - GESTION DES TÂCHES ET COMPÉTENCES :')
    .setDescription(
      '  1 - La commande\n\n' +
      '  __**!tache**__  suivi des instructions liées à la tâche\n\n' +
      '  dans le salon **#💼-taches**,\n\n' +
      '  ouvrira une tâche dans ce même salon (attention seul les admins peuvent lancer la commande). Ensuite, les personnes intéressées par la tâche peuvent :\n' +
      '   - Soit utiliser la réaction avec l\'émoji 👌 pour accepter la tâche.\n' +
      '   - Soit utiliser la réaction avec l\'émoji 👍 afin de signaler avoir terminée la tâche.\n' +
      '   - Soit utiliser la réaction avec l\'émoji 👎 afin de signaler avoir abandonnée la tâche.\n\n' +
      '   -Une fois avoir réagit avec 👍 les émojis pour choisir l\'état de la tâche disparaissent, si vous l\'avez fait par erreur ou si simplement vous voulez relancer la tâche, il faudra allez chercher manuellement l\'émoji de réaction voulue.\n\n' +
      '  2 - Dans le salon **#⌨-langage-connu**\n' +
      '   le clic sur chaque émoji correspondant au langage que vous maîtrisez vous donnera le rôle langage untel ou untel :\n' +
      '   - Langage assembleur\n' +
      '   - Langage C\n' +
      '   - langage C++\n' +
      '   - Langage C#\n' +
      '   - Langage CSS\n' +
      '   - Langage HTML\n' +
      '   - Langage Java\n' +
      '   - Langage JavaScript\n' +
      '   - Langage LUA\n' +
      '   - Langage php\n' +
      '   - Langage Python\n' +
      '   - Bibliothèques Qt (pour C++ ou Python)')
    .setImage("https://media.discordapp.net/attachments/911252140679385158/914860540893990992/langage.png")
    .setFooter('5/6')
  const myEmbed6 = new Discord.MessageEmbed()
    .setColor('#70CC95')
    .setTitle('IV - PRISE DE DÉCISIONS :')
    .setDescription(
      '  1 - Les commandes suivantes en début de message permettent les votes :\n\n' +
      '   !yes/no : ajoute 3 réactions : OUI, NON et ABSTENTION.\n\n' +
      '   !n1-n2 : ajoute des numéros de n1 à n2 en réaction pour QCM où n1 et n2 sont des nombres à deux chiffres et n1 ≥ 0, n2 ≤ 10 et n1 ≤ n2.\n\n' +
      'Par exemple :\n' +
      '  !00-09 : ajoute des numéros de 0 à 9 en réaction.\n' +
      '  !01-10 : ajoute des numéros de 1 à 10 en réaction.\n' +
      '  !04-08 : ajoute des numéros de 4 à 8 en réaction.\n' )
    .setImage('')
    .setFooter('6/6')

    let page = 0;
    let pages = [myEmbed1, myEmbed2, myEmbed3, myEmbed4, myEmbed5, myEmbed6];

    const messageSent = await message.author.send(pages[page]);

    await messageSent.react('⏪');
    await messageSent.react('⏩');


    const filter = (reaction, user) => ['⏪', '⏩'].includes(reaction.emoji.name);

    const time = 60000 //amount of time to collect for in milliseconds

    //const collector = messageSent.createReactionCollector(filter, { time: time });
    const collector = messageSent.createReactionCollector(filter, { dispose: true });

    collector.on('collect', (reaction, user) => {
      switch (reaction.emoji.name) {
        case '⏪':
          //reaction.users.remove(user);
          if (page > 0) page -= 1;
          messageSent.edit(pages[page]);
          break;
        case '⏩':
          //reaction.users.remove(user);
          if (page < 5) page += 1;
          messageSent.edit(pages[page]);
          break;
        default:
          message.author.send("mauvais choix");
      }
    })
    collector.on('remove', (reaction, user) => {
      switch (reaction.emoji.name) {
        case '⏪':
          //reaction.users.remove(user);
          if (page > 0) page -= 1;
          messageSent.edit(pages[page]);
          break;
        case '⏩':
          //reaction.users.remove(user);
          if (page < 5) page += 1;
          messageSent.edit(pages[page]);
          break;
        default:
          message.author.send("mauvais choix");
      }
    })
}


/* ----------------------------------- Fonction Discord ------------------------------------------ */

client.on("ready", () => {
  client.user.setStatus("online");
  client.user.setActivity('!help', { type: "WATCHING"})
})

client.once('ready', member => {
    console.log('Ready!');
    setInterval(function(){
        let verif_time = new Date();
        let verif_jour = verif_time.getDate();
        let verif_heure = verif_time.getHours();
        LireFichierJson(chemin_fichier);
        console.log('1-heure actuel : ', verif_heure);
        for (let index = 0; index < list_username.length; index++) {
            console.log('2-heure arrivé : ', list_heure_message[index]);
            console.log('2-heure actuel : ', verif_heure);
            if(list_jour_message[index] == verif_jour && list_heure_message[index] <= verif_heure){
                message ="**"+list_username[index]+"** est arrivé sur le serveur depuis au moins 24h, merci de vérifier si il s'est __présenter dans le channel **#🛡-présentation**__ et de **statuer** sur son rôle.";
                EnvoiMessageAdmin(message);
                list_username.splice(index, 1);
                list_id.splice(index, 1);
                list_jour_message.splice(index, 1);
                list_heure_message.splice(index, 1);
                EcrireFichierJson(chemin_fichier, list_username, list_id, list_heure_message, list_jour_message);
            }
        }
        //  }, 3600000);
    }, 60000);
});

client.on('guildMemberAdd', member => {
    LireFichierJson(chemin_fichier);
    let time = new Date();
    let jour_arriver = new Date();
    jour_arriver.setDate(time.getDate()+1);
    let jour_message = jour_arriver.getDate();
    let heure_user = time.getHours();
    list_username.push(member.user.username);
    list_id.push(member.user.id);
    list_jour_message.push(jour_message);
    list_heure_message.push(heure_user);
    EcrireFichierJson(chemin_fichier,list_username, list_id, list_heure_message, list_jour_message);
});

client.on('message', message => {
    let command = message.content.slice(prefix.length, message.length).toLowerCase();

    /* -----------------------------------   Tasks    ---------------------------------- */
    if (message.author.bot && message.embeds && message.channel.name == '💼-taches') {
        reacttask(message);
    }
    /* ----------------------------- réponses et admins --------------------------------- */
    if (message.author.bot) return; // don't accept message from bots
    for (let i = 0; i < prefix_wave_react_list.length; i++) {
        if (message.content.toLowerCase().startsWith(prefix_wave_react_list[i])) {
            message.react('👋');
            break;
        }
    }

    if (message.channel.name == '✔-présentation') {
        message.react('✅');
    }

    const list = client.guilds.cache.get("904780608922849290");

    if ((message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.') || message.content.includes('.fr') || message.content.includes('.be') || message.content.includes('.com') || message.content.includes('.uk') || message.content.includes('.de') || message.content.includes('.org'))) {
        answer = message.author.username + ' a envoyé ce message ***'  + message.content + '*** sur le salon ' + message.channel.name;
        //EnvoiMessageAdmin(answer);
    }
    let mention = message.mentions.roles.first();
    if (mention) {
        if (mention.id == "904780827123134524") {
            answer = messag.startsWithe.author.username + ' a envoyé ce message ***'  + message.content + '*** sur le salon ' + message.channel.name;
            EnvoiMessageAdmin(answer);
        }
    }
    if (!message.content.startsWith(prefix)) return; // don't accept message which does not start with the prefix
    /* ----------------------------------- Commandes ---------------------------------- */
    if (command.startsWith("yes/no")) {
        const reactionEmojiOUI = message.guild.emojis.cache.find(emoji => emoji.name === 'OUI4');
        const reactionEmojiNON = message.guild.emojis.cache.find(emoji => emoji.name === 'NON4');
        const reactionEmojiABS = message.guild.emojis.cache.find(emoji => emoji.name === 'ABS3');
        message.react(reactionEmojiOUI);
        message.react(reactionEmojiNON);
        message.react(reactionEmojiABS);
    } else if (/^\d{2}-\d{2}/.test(command)) {
        let c = command.split("-");
        let n1 = parseInt(c[0]);
        let n2 = parseInt(c[1].slice(0, 2));
        if (n1 >= 0 && n2 <= num_react_list.length && n1 <= n2) {
            for (let i = n1; i <= n2; i++) {
                message.react(num_react_list[i]);
            }
        }
    } else if (command.startsWith("nbdl")) {
        answer = `nombre de téléchargements demandés`;
        message.channel.send(answer);
        requestHOSDL(message);
    } else if (command.startsWith("jitsi")) {
        let crypto = require("crypto");
        let r = crypto.randomBytes(20).toString('hex');
        message.reply("https://meet.jit.si/" + r);
    } else if (command.startsWith("tache") && message.channel.name == '💼-taches') {
        task(message);
    };
    if (command.startsWith("help")) {
      help(message);
    }
});

client.on('messageReactionAdd', async (reaction_orig, user) => {
  // fetch the message if it's not cached
  const message = !reaction_orig.message.author
      ? await reaction_orig.message.fetch()
      : reaction_orig.message;
  if (message.channel.name === '⌨-langage-connu') {
     addRole(reaction_orig, reaction_orig.message, user);
  }
  if (message.channel.name === '✔-présentation' && (user.roles.has'904780827123134524' || user.roles.has'905386175949340672')) {
     let role = message.guild.roles.cache.find(r => r.id === '916776104851820605');
     addRole('Membres', reaction_orig.message, user);
  }
  if (reaction_orig.message.author.id === user.id) {
     // the reaction is coming from the same user who posted the message
     return;
  }
  if (message.channel.name === '💼-taches') {
      attributetask(reaction_orig, reaction_orig.message, user);
  }
});

client.on('messageReactionRemove', async (reaction_orig, user) => {
  // fetch the message if it's not cached
  const message = !reaction_orig.message.author
      ? await reaction_orig.message.fetch()
      : reaction_orig.message;
  if (message.channel.name === '⌨-langage-connu') {
     removeRole(reaction_orig, reaction_orig.message, user);
  }
});

client.on('guildMemberRemove', member => {
    LireFichierJson(chemin_fichier);
    for (let index = 0; index < list_username.length; index++) {
        if(list_username[index] == member.user.username){
            list_username.splice(index, 1);
            list_id.splice(index, 1);
            list_jour_message.splice(index, 1);
            list_heure_message.splice(index, 1);
        }
    }
    EcrireFichierJson(chemin_fichier, list_username, list_id, list_heure_message, list_jour_message);
});

client.login(process.env.Token);
