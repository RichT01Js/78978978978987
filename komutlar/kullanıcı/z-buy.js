const Discord = require('discord.js');
const db = require('quick.db');
const kasalar = require('.././kasalar');

// Kullanıcıların kasayı açıp açmadığını takip etmek için bir nesne
const kasayiAcmaIslemi = {};

exports.run = async (client, message, args) => {
  const kasaid = args[0];
  const bakiye = await db.fetch(`bakiyeasreaper-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);
  const kasasayisi = kasalar.length;

  if (!hesapdurumu) return message.reply(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);

  const kasaidembeds = new Discord.MessageEmbed()
    .setTitle('Bir kasa ID si girmelisin!')
    .setFooter(`Kasa listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}chests`)
    .setColor(client.ekoayarlar.renk);

  if (!kasaid) return message.channel.send(kasaidembeds);

  if (kasayiAcmaIslemi[message.author.id]) {
    return message.channel.send(`${message.author} Yapaman`);
  }

  kasayiAcmaIslemi[message.author.id] = true;

  const kasa = kasalar.find(kasa => kasa.kasaid === kasaid);

  if (!kasa) {
    delete kasayiAcmaIslemi[message.author.id];
    return message.channel.send(kasaidembeds);
  }

  if (bakiye < kasa.fiyat) {
    delete kasayiAcmaIslemi[message.author.id];
    return message.channel.send(`${message.author} Fakirsin`);
  }

  function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  message.channel.send(`${message.author}, Kasayı açmak istediğinize emin misiniz?\n Şu anda \`${formatCurrency(bakiye)} ${client.ekoayarlar.parabirimi}\` paran var, kasayı açtıktan sonra \`${formatCurrency(bakiye - kasa.fiyat)}\` paran kalacak. \n\`Eğer açmak istiyorsan evet(e) istemiyorsan hayır(h) yazabilirsin.\``);

  let uwu = false;

  while (!uwu) {
    const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 });
    const choice = response.first().content;

    if (choice == 'hayır' || choice == 'h') {
      delete kasayiAcmaIslemi[message.author.id];
      return message.channel.send('🚀 İşlem iptal edildi.');
    }

    if (choice !== 'evet' && choice !== 'e') {
      message.channel.send('❓ Lütfen sadece **evet (e)** veya **hayır (h)** ile cevap verin.');
    }

    if (choice == 'evet' || choice == 'e') {
      uwu = true;
      try {
        db.add(`bakiyeasreaper-${message.author.id}`, -kasa.fiyat);
        message.channel.send(`Kasa Açılıyor, lütfen bekleyin ${message.author}!`).then(async msg => {
          const icindekiler = require(`.././kasa${kasaid}`);

          setTimeout(() => {
            msg.edit('Kasa Açılıyor..');
          }, 1000);

          setTimeout(() => {
            msg.edit('Kasa Açılıyor...');
          }, 2000);

          setTimeout(() => {
            msg.edit('Kasa Açılıyor..');
          }, 3000);

          setTimeout(() => {
            msg.edit('Kasa Açılıyor.');
          }, 4000);

          setTimeout(() => {
            msg.edit('Kasa Açıldı!');
            msg.delete();
            delete kasayiAcmaIslemi[message.author.id];
          }, 5000);

          setTimeout(() => {
            const icindeki = icindekiler[Math.floor(Math.random() * icindekiler.length)];
            message.channel.send(`${message.author}, Kasadan **${formatCurrency(icindeki)} ${client.ekoayarlar.parabirimi}** kazandın!`);
            db.add(`bakiyeasreaper-${message.author.id}`, icindeki);
          }, 7800);
        });
      } catch (e) {
        message.channel.send(':warning: Bir hata var!');
        delete kasayiAcmaIslemi[message.author.id];
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['buy'],
  permLevel: 0,
  katagori: 'Ekonomi',
};

exports.help = {
  name: 'buy',
  description: 'Asreaper',
  usage: 'Asreaper',
};
