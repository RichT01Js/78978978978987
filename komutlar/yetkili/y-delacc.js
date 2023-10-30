const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')



exports.run = async (client, message, args) => {
  if(!client.ekoayarlar.admin.includes(message.author.id)) return message.reply(`sg`)
  const silinecekkllnc = message.mentions.members.first();
  if(!silinecekkllnc) return message.channel.send(`Bir kullanıcı belirtmelisin!`)
  const bakiye = await db.fetch(`bakiyeasreaper-${silinecekkllnc.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${silinecekkllnc.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${silinecekkllnc.id}`);
  
  if(!hesapdurumu) return message.channel.send(`Kayıtlı olan bir kullanıcı belirtmelisin!`)
  db.delete(`bakiyeasreaper-${silinecekkllnc.id}`)
  db.delete(`hesapdurumasreaper-${silinecekkllnc.id}`)
  db.delete(`hesapismiasreaper-${silinecekkllnc.id}`)
  message.channel.send(`${message.author}, Tamamdır:+1:`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sil'],
    permLevel: 0
}

exports.help = {
    name: 'del',
    description: 'Asreaper',
    usage: 'Asreaper'
}