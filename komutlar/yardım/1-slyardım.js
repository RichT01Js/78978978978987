const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const listEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Slots Yardım Menüsü')
    .setImage('https://cdn.discordapp.com/attachments/1112309377068695632/1163507792607449248/standard_3.gif?ex=653fd412&is=652d5f12&hm=cc93f079ef31b96b8bb538ac9fc09b93eadac86ca8f7cd15766858de4962f5fd&')
    .setDescription('**Slot Amacı & Kuralları**\n > - Slot oyunu, __şansa dayalı__ bir kumar oyunudur. Amacınız, slot makinesinin üç sıradan oluşan slot yuvalarında iki veya üç aynı sembolleri elde etmek veya belirli semboller kombinasyonlarını yakalamaktır.\n\n > - İki veya daha fazla aynı sembolü __yanyana__ veya __çapraz__ olarak yakalarsanız, bahis miktarınızdan fazla para elde edebilirsiniz.\n\n**Sembol Kazanma Oranları**\n > - 🍇 , 🍋 , 🍆 , 🍒 = > - **2x**\n > - 💰 , 💸 , 💷 , 💎 , = **5x** \n > - 💳 = **20x**\n\n**NOT:** *Şansa dayalı bir oyundur, bu nedenle sonuçlar rastgele olacaktır. Kazançlı dönüşler elde etmeye çalışırken, dikkatli olun ve kumarı sorumlu bir şekilde oynayın.*\n**NOT2:** *Minimum **10,000** , Maksimum **10,000,000** yatırabilirsiniz.*');
  message.channel.send(listEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['slh','slhelp'],
  permLevel: 0,
};

exports.help = {
  name: 'slyardim',
  description: '.',
  usage: '.',
};


// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n
// > - \`/Komut\` **-->** Açıklama\n
