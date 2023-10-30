const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] EU 》 Gerekli kurulum tamamlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] EU 》 ${client.user.tag} olarak giriş sağlandı...`);
  client.user.setActivity(`Bakımda..`, {type: 1})


};