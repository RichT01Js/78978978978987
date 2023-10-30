const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let kllanç = message.mentions.users.first() || message.author;
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);
  const hesaptarihyıl = await db.fetch(`hesaptarihyılasreaper-${kllanç.id}`);
  const hesaptarihay = await db.fetch(`hesaptarihayasreaper-${kllanç.id}`);
  const hesaptarihgün = await db.fetch(`hesaptarihgünasreaper-${kllanç.id}`);

  function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (!hesapdurumu) {
    if (args[0]) return message.reply(`Bakmak istediğin kullanıcının bir hesabı bulunmamakta.`);
    message.reply(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  } else {
    if (hesapdurumu) {
      if (!hesapismi) {
        const embedczdn = new Discord.MessageEmbed()
          .setColor(client.ekoayarlar.renk)
          .setDescription(`Hesap Adı: ${client.ekoayarlar.isimsiz}\nBakiye: **${formatCurrency(bakiye)} ${client.ekoayarlar.parabirimi}** \n Hesap Oluşturma Tarihi: **Bilinmiyor**`);
        message.channel.send(embedczdn);
      } else {
        if (hesapdurumu) {
          if (hesapismi) {
            const embedczdnv2 = new Discord.MessageEmbed()
              .setColor(client.ekoayarlar.renk)
              .setDescription(`> Hesap Adı: **${hesapismi}**\n> Bakiye: **${formatCurrency(bakiye)} ${client.ekoayarlar.parabirimi}**\n> Hesap Oluşturma Tarihi: **${hesaptarihay}/ ${hesaptarihgün}/${hesaptarihyıl}**`);
            message.channel.send(embedczdnv2);
          }
        }
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  katagori: "Ekonomi",
};

exports.help = {
  name: 'pinfo',
  description: 'Asreaper',
  usage: 'Asreaper',
};
