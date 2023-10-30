const Discord = require('discord.js');
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');

function formatCurrency(amount, currency) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${currency}`;
}

exports.run = async (client, message, args) => {
  let transkllanç = message.mentions.users.first();
  if (!transkllanç) return message.channel.send("Lütfen Birini Etiketleyin.");
  let kllanç = message.author;
  let para = args[1];
  if (transkllanç == kllanç) return message.channel.send(`${message.author}, Kendine para gönderemezsin`);
  if (transkllanç.bot == true) return message.channel.send(`${message.author}, Botlara para gönderemezsin`);
  if (!transkllanç) return message.channel.send(`${message.author}, Kullanım;\n\`${client.ekoayarlar.botunuzunprefixi}send @${client.user.tag} <miktar>\``);
  if (!para) return message.channel.send(`${message.author}, Kullanım;\n\`${client.ekoayarlar.botunuzunprefixi}send @${client.user.tag} <miktar>\``);
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);

  const transbakiye = await db.fetch(`bakiyeasreaper-${transkllanç.id}`);
  const transhesapdurumu = await db.fetch(`hesapdurumasreaper-${transkllanç.id}`);
  const transhesapismi = await db.fetch(`hesapismiasreaper-${transkllanç.id}`);

  if (!hesapdurumu) {
    message.reply(`${message.author}, İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  } else {
    if (hesapdurumu) {
      if (!hesapismi) {
        message.reply(`${message.author}, İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
      } else {
        if (hesapdurumu) {
          if (hesapismi) {
            if (bakiye < para) return message.channel.send(`${message.author}, Fakirsin.`);
            if (!transhesapdurumu) return message.channel.send(`${message.author}, Para göndermek istediğin kullanıcının hesabı yok.`);
            if (transhesapdurumu) {
              db.add(`bakiyeasreaper-${message.author.id}`, -para);
              db.add(`bakiyeasreaper-${transkllanç.id}`, para);
              transkllanç.send(`${message.author.tag} adlı kullanıcı hesabınıza **${formatCurrency(para, client.ekoayarlar.parabirimi)}** miktarında para yolladı.`);
              message.channel.send(`${transkllanç} adlı kullanıcının hesabına **${formatCurrency(para, client.ekoayarlar.parabirimi)}** miktarında para yolladın.`);
            }
          }
        }
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['paragonder', 'paragönder', 'para-gonder', 'para-gönder'],
  permLevel: 0,
  katagori: "Ekonomi",
};

exports.help = {
  name: 'send',
  description: 'Asreaper',
  usage: 'Asreaper',
};
