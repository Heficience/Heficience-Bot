const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const crypto = require('crypto');
list_username = [];
list_id = [];
list_jour_message = [];
list_heure_message = [];
chemin_fichier = "./newUser.json";

/* ----------------------- Fonction Desmos---------------------------- */

function EnvoiMessageAdmin(messageToAdmin){
    const list = client.guilds.cache.get("472687107530555402");
    list.members.cache.forEach(member => {
         if (member.id !== "777238000316055553") {
           if (member.roles.cache.some(role => role.name === 'Administrateurs')) {
              //if (member.user.cache.bot) return;
              member.send(messageToAdmin);
           } else if (member.roles.cache.some(role => role.name === 'Moderateur')) {
              //if (member.user.cache.bot) return;
              member.send(messageToAdmin);
           }
        }
    });
}

function LireFichierJson(path){
  fs.readFile(path,{encoding: 'utf8'},function(err,data) {
    var users = JSON.parse(data);
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
  var Aujourdui = new Date();
  Aujourdui.setDate(Aujourdui.getDate() + 1);
  Aujourdui = Aujourdui.toISODate();
  return Aujourdui;
}
function dateSeptJour() {
  var septJours = new Date();
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
  var nbWeek;
  var NbWeekURL = `https://www.handy-open-source.org/assets/nodejs/gettotal/?startdate=${dateSeptJour()}&enddate=${dateAujourdui()}`;
  var nbWeekDV;
  var NbWeekDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
  var nbWeekDVL;
  var NbWeekDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
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
              var weektot =
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

  var nbTotal;
  var nbTotalURL = `https://www.handy-open-source.org/assets/nodejs/gettotal/?startdate=2010-01-01&enddate=${dateAujourdui()}`;
  var nbTotalDV;
  var nbTotalDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
  var nbTotalDVL;
  var nbTotalDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
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
              var Totaltot =
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

/* ----------------------------------- Fonction Discord ------------------------------------------ */

client.once('ready', member => {
  console.log('Ready!');
  setInterval(function(){
     let verif_time = new Date();
     verif_jour = verif_time.getDate();
     verif_heure = verif_time.getHours();
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
    jour_message = jour_arriver.getDate();
    heure_user = time.getHours();
    list_username.push(member.user.username);
    list_id.push(member.user.id);
    list_jour_message.push(jour_message);
    list_heure_message.push(heure_user);
    EcrireFichierJson(chemin_fichier,list_username, list_id, list_heure_message, list_jour_message);
});

client.on('message', message => {
    if (
      message.content.toLowerCase().startsWith("hello") ||
      message.content.toLowerCase().startsWith("bonjour") ||
      message.content.toLowerCase().startsWith("bonsoir") ||
      message.content.toLowerCase().startsWith("coucou") ||
      message.content.toLowerCase().startsWith("hey") ||
      message.content.toLowerCase().startsWith("salut")
    ) {
      message.react('👋');
    }
    const list = client.guilds.cache.get("789953828275224587");

    if (message.author.id !== "777238000316055553" && (message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.') || message.content.includes('.fr') || message.content.includes('.be') || message.content.includes('.com') || message.content.includes('.uk') || message.content.includes('.de') || message.content.includes('.org'))) {
        answer = message.author.username + ' a envoyé ce message ***'  + message.content + '*** sur le salon ' + message.channel.name;
        EnvoiMessageAdmin(answer);
    }
    if (message.content.toLowerCase().startsWith("_nbdl")) {
      answer = `nombre de téléchargements demandés`;
      message.channel.send(answer);
      requestHOSDL(message);
    }
    if (message.content.toLowerCase().startsWith("!jitsi")) {
      var crypto = require("crypto");
      var r = crypto.randomBytes(20).toString('hex');
      message.reply("https://meet.jit.si/" + r);
    };
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
