const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor('SlotRUSH Komutları')
    .addField('💸 | MONEY | 💸 \nPara Kazanma komutlarını gösterir.', '> >\`/money\`\n> >\n> >\n', true)
    .addField('📘 | USER | 📘\nKullanıcı komutlarını gösterir.', '> >\`/kullanıcı\`\n> >\n> >\n', true)
    .addField('📕 | HELP | 📕\nTüm yardım komutlarını gösterir.', '> >\`/slhelp & slh\`\n> >\`/yardım\`\n> >\n', true)
    .setFooter('Daha fazla bilgi için /yardım komutunu kullanabilirsiniz.')
    .setImage('https://cdn.discordapp.com/attachments/1112309377068695632/1163507792607449248/standard_3.gif?ex=653fd412&is=652d5f12&hm=cc93f079ef31b96b8bb538ac9fc09b93eadac86ca8f7cd15766858de4962f5fd&') // Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardim', 'help'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'yardım',
};

// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n