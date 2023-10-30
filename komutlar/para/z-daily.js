const Discord = require('discord.js');
const db = require('quick.db');
const kasalar = require('.././kasalar');
const ms = require('parse-ms');
const DBL = require('dblapi.js');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.run = async (client, message, args) => {
  const user = message.author;
  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);

  if (!hasAccount) {
    return message.reply(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  }

  let timeout = 86400000; // 24 saat (24 * 60 * 60 * 1000 milisaniye)

  let daily = await db.fetch(`günlükkullanımgodareçdare-${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    return message.channel.send(`${user}, Tekrar Günlük **Boş Yapma** Maaşını almak için **${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye** beklemelisin`);
  }

  if (client.ekoayarlar.dbloy == false) {
    db.set(`günlükkullanımgodareçdare-${user.id}`, Date.now());
    if (client.ekoayarlar.rastgelepara == true) {
      const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara);
      db.add(`bakiyeasreaper-${user.id}`, randomizer);
      let para1 = new Discord.MessageEmbed()
        .setColor(client.ekoayarlar.renk)
        .setDescription(`**Günlük Para**`)
        .addField(`Aldığınız Miktar;`, randomizer.toLocaleString() + ` ${client.ekoayarlar.parabirimi}`)
        .setFooter(`Tebrikler, ${user.tag}! boş yaparak para kazandınız`);
      return message.channel.send(para1);
    } else {
      if (client.ekoayarlar.rastgelepara == false) {
        db.add(`bakiyeasreaper-${user.id}`, client.ekoayarlar.günlükpara);
        let para1 = new Discord.MessageEmbed()
          .setColor(client.ekoayarlar.renk)
          .setDescription(`**Banka**`)
          .addField(`Tebrikler, ${user.tag}! boş yaparak para kazandınız`, client.ekoayarlar.günlükpara.toLocaleString() + ` ${client.ekoayarlar.parabirimi} `);
        return message.channel.send(para1);
      }
    }
  } else {
    if (client.ekoayarlar.dbloy == true) {
      const dbl = new DBL(client.ekoayarlar.dblkey, client);
      dbl.hasVoted(user.id).then(voted => {
        if (voted) {
          db.set(`günlükkullanımgodareçdare-${user.id}`, Date.now());
          if (client.ekoayarlar.rastgelepara == true) {
            const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara);
            db.add(`bakiyecdare-${user.id}`, randomizer);
            let para1 = new Discord.MessageEmbed()
              .setColor(client.ekoayarlar.renk)
              .setDescription(`**Günlüwk Para**`)
              .addField(`Aldığınız Miktar;`, randomizer.toLocaleString() + ` ${client.ekoayarlar.parabirimi}`)
              .setFooter(`Tebrikler, ${user.tag}! boş yaparak para kazandınız`);
            return message.channel.send(para1);
          } else {
            if (client.ekoayarlar.rastgelepara == false) {
              db.add(`bakiyecdare-${user.id}`, client.ekoayarlar.günlükpara);
              let para1 = new Discord.MessageEmbed()
                .setColor(client.ekoayarlar.renk)
                .setDescription(`**Banka**`)
                .addField(`Tebrikler, ${user.tag}! boş yaparak para kazandınız`, client.ekoayarlar.günlükpara.toLocaleString() + ` ${client.ekoayarlar.parabirimi} `);
              return message.channel.send(para1);
            }
          }
        } else {
          return message.channel.send(`${client.ekoayarlar.dblmsj}`);
        }
      });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['günlük-para'],
  permLevel: 0,
  katagori: "Ekonomi",
};

exports.help = {
  name: 'daily',
  description: 'Günlük para ödülünü talep edin',
  usage: 'daily',
};
