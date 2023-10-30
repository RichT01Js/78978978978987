const Discord = require('discord.js');
const db = require('quick.db');
const kasalar = require('.././kasalar');

function formatCurrency(amount, currency) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

exports.run = async (client, message, args) => {
  const kasaid = args[0];
  const kasasayisi = kasalar.length;
  const kasaidembeds = new Discord.MessageEmbed()
    .setTitle(`Bir kasa ID'si girmelisin`)
    .setFooter(`Kasalara bakmak için: ${client.ekoayarlar.botunuzunprefixi}chests`)
    .setColor(client.ekoayarlar.renk);
  if (!kasaid) return message.channel.send(kasaidembeds);
  if (kasaid > kasasayisi) return message.channel.send(kasaidembeds);
  if (isNaN(kasaid)) return message.channel.send(kasaidembeds);

  const kasalarfilter = kasalar
    .filter((x) => x.kasaid == kasaid)
    .map((x) => `\n\n**${x.isim}**\n**FIYAT:** ${formatCurrency(x.fiyat, client.ekoayarlar.parabirimi)}`)
    .join('\n\n ');

  const icindekiler = require(`.././kasa${kasaid}`);
  const kasalariçindekilerfilter = icindekiler.map((x) => x).join(', ');

  const embed = new Discord.MessageEmbed()
    .addField(`KASA DETAYLARI (${kasaid} ID)`, `\n${kasalarfilter}\n\n`)
    .addField(`İçindekiler;`, `${formatCurrency(kasalariçindekilerfilter, client.ekoayarlar.parabirimi)}`)
    .setFooter(`Kasa listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}chests`)
    .setColor(client.ekoayarlar.renk);

  const hasAccount = db.fetch(`hesapdurumasreaper-${message.author.id}`);
  if (!hasAccount) {
    return message.channel.send(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  }

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cinfo', 'chest', 'cinfo'],
  permLevel: 0,
};

exports.help = {
  name: 'chest',
  description: 'Asreaper',
  usage: 'Asreaper',
};
