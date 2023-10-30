const Discord = require('discord.js');
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

exports.run = async (client, message, args, perms) => {
  const isim = args.slice(0).join(' ');
  const bakiye = await db.fetch(`bakiyeasreaper-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${message.author.id}`);

  if (hesapdurumu) return message.channel.send(`Bir hesabınız bulunmakta. Hesap oluşturmak için: \n\`${client.ekoayarlar.botunuzunprefixi}acc <hesapismi>\``);
  if (hesapismi) return message.channel.send(`Bir hesabınız bulunmakta. Hesap oluşturmak için: \n\`${client.ekoayarlar.botunuzunprefixi}acc <hesapismi>\``);
  if (!isim) return message.channel.send(`Bir isim girmelisiniz. Doğru Kullanım;\n\`${client.ekoayarlar.botunuzunprefixi}acc <hesapismi>\``);
  if (!hesapdurumu) {
    if (!hesapismi) {
      db.set(`hesapdurumasreaper-${message.author.id}`, "aktif");
      message.channel.send("Hesabınız başarıyla oluşturuldu!");
      if (client.ekoayarlar.rastgelepara == true) {
        db.set(`hesapismiasreaper-${message.author.id}`, isim);
        const yıl = new Date().getFullYear();
        const ay = new Date().getDate();
        const gün = new Date().getMonth();
        db.set(`hesaptarihyılasreaper-${message.author.id}`, yıl);
        db.set(`hesaptarihayasreaper-${message.author.id}`, ay);
        db.set(`hesaptarihgünasreaper-${message.author.id}`, gün);
        const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara);
        db.add(`bakiyeasreaper-${message.author.id}`, randomizer);
        message.channel.send(`Başlangıç parası rastgele olarak **${formatCurrency(randomizer)} ${client.ekoayarlar.parabirimi}** hesabınıza yatırıldı!`);
      } else {
        if (client.ekoayarlar.rastgelepara == false) {
          db.set(`hesapismiasreaper-${message.author.id}`, isim);
          const yıl = new Date().getFullYear();
          const ay = new Date().getDate();
          const gün = new Date().getMonth();
          db.set(`hesaptarihyılasreaper-${message.author.id}`, yıl);
          db.set(`hesaptarihayasreaper-${message.author.id}`, ay);
          db.set(`hesaptarihgünasreaper-${message.author.id}`, gün);
          db.add(`bakiyeasreaper-${message.author.id}`, client.ekoayarlar.başlangıçparası);
          message.channel.send(`${message.author}, Banka Tarafından Hesabınıza **${formatCurrency(client.ekoayarlar.başlangıçparası)} ${client.ekoayarlar.parabirimi}** Yatırıldı. Açıklama: **Başlangıç**`);
        }
      }
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hesap'],
  permLevel: 0,
  katagori: "Ekonomi"
}
exports.help = {
  name: 'acc',
  description: 'Asreaper',
  usage: 'Asreaper',
}
