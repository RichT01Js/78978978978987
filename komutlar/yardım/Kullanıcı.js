const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField('Kullanıcı Komutları\n', '> -`/acc <hesapismi>\`**-->** hesap açar.\n> -`/yardım\` **-->** yardım menüsünü gösterir\n> -`/cash @kullanıcı\` **-->** Kullanıcının bakiyesini sorgular\n> -`/send @kullanıcı <miktar>\` **-->** Para transferi yapmak için kullanılır.\n> -`/pinfo @kullanıcı\` **-->** Kullanıcının hesabını sorgular.\n', true)
    .setFooter('Daha fazla bilgi için /yardım komutunu kullanabilirsiniz.')
    .setThumbnail('https://cdn.discordapp.com/attachments/1112309377068695632/1163486075994521610/Rich.png?ex=653fbfd9&is=652d4ad9&hm=b10ea48c03b7b7fb12c80f3cf4f693532dd63d88d57bbc8635aa19d40d64f686&') // Embedin yanındaki küçük resim (thumbnail)
    .setImage('https://cdn.discordapp.com/attachments/1112309377068695632/1163507792607449248/standard_3.gif?ex=653fd412&is=652d5f12&hm=cc93f079ef31b96b8bb538ac9fc09b93eadac86ca8f7cd15766858de4962f5fd&') // Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanici', 'k'],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'yardım',
};





// > -`/Komut\` **-->** Açıklama\n
// > -`/Komut\` **-->** Açıklama\n
// > -`/Komut\` **-->** Açıklama\n