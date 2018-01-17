const Discord = require("discord.js");

const yt = require('ytdl-core');

const bot = new Discord.Client();

var config = require("./config.json");

var music = require("./playlist.json");

const prefix = config.prefix;

var token = config.token;

bot.on('ready', () => {
  console.log(`Started bot as: ${bot.user.tag}!`);
});

bot.on("message", function(message) {
if (message.author.equals(bot.user)) return;

if (!message.content.startsWith(prefix)) return;

var args = message.content.substring(prefix.length).split(" ");


switch (args[0].toLowerCase()) {

case "ping":
message.channel.send("Pinging...").then(pong => {
        pong.edit(`Pong!\n${bot.user.tag}: **${pong.createdTimestamp - message.createdTimestamp}ms**\nAPI **${Math.round(bot.ping)}ms**`)
      })
break;
case "music":
message.delete("music");
const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.sendMessage(":x: You are not in a voice channel!!");
    }
    voiceChannel.join()
message.channel.sendMessage("```Music Module Started```")
message.channel.sendMessage(prefix + "next " + music[Math.floor(Math.random() * music.length)]);
break;
case "skip":
message.delete("skip");
const voice = message.member.voiceChannel;
if(perms.includes(message.author.id)) {
voice.leave();
voice.join()

} else {
  message.channel.sendMessage(":x: Sorry No Perms")
}
break;





}
});

bot.on("message", function(message) {

if (!message.content.startsWith(prefix)) return;

var args = message.content.substring(prefix.length).split(" ");




switch (args[0].toLowerCase()) {
case "next":
message.delete("next");
const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.sendMessage(":x: You are not in a voice channel!!");
    }
    voiceChannel.join()
    .then(connection => {

      let stream = yt(args.join(" "), {audioonly: true});
      yt.getInfo(args.join(" "), function(err, info) {
      const title = info.title
	  message.channel.sendMessage(`Now playing \`${title}\``)
      })
      const dispatcher = connection.playStream(stream);
      dispatcher.on('end', () => {
        var myVar = setInterval(myTimer ,10000);
function myTimer() {
  message.channel.sendMessage(prefix + "next " + config.music[Math.floor(Math.random() * config.music.length)]);
clearInterval(myVar)
}
       }).catch(e =>{
         console.error(e);
       });
    })
break;





}
});





bot.login(token);
