const Discord = require('discord.js');
const db = require('quick.db');
const kasalar = require('.././kasalar');

exports.run = async (client, message, args) => {
  const embed = createEmbed(client, kasalar, message.author);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  katagori: "Ekonomi",
};

exports.help = {
  name: 'chests',
  description: 'Anqriel',
  usage: 'Anqriel',
};

function createEmbed(client, kasalar, user) {
  const kasalarfilter = kasalar.map(x => `[**ID: ${x.kasaid}**]\n > **${x.isim}** \n> - ${x.aciklama}\n> **Fiyat:** ${formatCurrency(x.fiyat)}\n`).join('\n ');
  const embed = new Discord.MessageEmbed()
    .addField(`MAĞAZA`, `${kasalarfilter}\n`)
    .setFooter(`Bir kasa hakkında bilgi almak için: ${client.ekoayarlar.botunuzunprefixi}chest <kasaid>`)
    .setColor(client.ekoayarlar.renk);

  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);
  if (!hasAccount) {
    embed.addField(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  }

  return embed;
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 💸';
}
