const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField('Para Kazanma Komutları\n', '> - \`/sl <miktar>\` **-->** Slot oynarsınız.\n> - \`/sc\` **-->** Rastgele para kazanırsınız.\n> - \`/daily\` **-->** Günlük para alırsınız.\n> - \`/chests\` **-->** Tüm sandıkları listeler\n> - \`/chest <kasaID>\` **-->** Sandığın içeriğine bakar.\n> - \`/buy <kasaID>\` **-->** kasa alır ve açar.\n', true)
    .setFooter('Daha fazla bilgi için /yardım komutunu kullanabilirsiniz.')
    .setThumbnail('https://cdn.discordapp.com/attachments/1112309377068695632/1163507876413833216/Rich.png?ex=653fd426&is=652d5f26&hm=b70e1ea0b9dace16b1078ce90c55350e4b57f5ffbf932564331bd69d4b86cd87&') // Embedin yanındaki küçük resim (thumbnail)
    .setImage('https://cdn.discordapp.com/attachments/1112309377068695632/1163507792607449248/standard_3.gif?ex=653fd412&is=652d5f12&hm=cc93f079ef31b96b8bb538ac9fc09b93eadac86ca8f7cd15766858de4962f5fd&') // Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['money', 'pk'],
  permLevel: 0,
};

exports.help = {
  name: 'money',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'yardım',
};





// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n