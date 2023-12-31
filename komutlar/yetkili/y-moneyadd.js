const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  if (!client.ekoayarlar.admin.includes(message.author.id)) return message.reply(`sg amk`)
  const silinecekkllnc = message.mentions.members.first();
  let para = args[1];
  
  if (!silinecekkllnc) return message.channel.send(`${message.author} Kullanıcı`)
  
  const bakiye = await db.fetch(`bakiyeasreaper-${silinecekkllnc.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${silinecekkllnc.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${silinecekkllnc.id}`);
  
  if (!hesapdurumu) return message.channel.send(`${message.author}, Bu kullanıcı kayıtlı değil.`)
  
  // Sayıları biçimlendiren fonksiyon
  function formatNumber(number) {
    return number.toLocaleString('tr-TR');
  }
  
  // Para miktarını biçimlendirme
  para = parseFloat(para.replace(',', '').replace('.', ''));
  if (isNaN(para)) return message.channel.send(`${message.author}, Geçerli bir değer girin.`);
  
  await db.add(`bakiyeasreaper-${silinecekkllnc.id}`, para);
  
  // Biçimlendirilmiş para miktarını al
  const formattedPara = formatNumber(para);
  
  message.channel.send(`${silinecekkllnc} adlı kullanıcının hesabına **${message.author}(BANKA)** tarafından **${formattedPara} ${client.ekoayarlar.parabirimi}** yatırıldı.`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['addm'],
  permLevel: 0
}

exports.help = {
  name: 'addm',
  description: 'Anqriel',
  usage: 'Anqriel'
}
