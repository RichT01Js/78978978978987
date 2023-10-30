const db = require('quick.db');

const commandCooldowns = new Set();
const cooldownTime = 5000; // 5 saniye (milisaniye cinsinden)

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

exports.run = async (client, message, args) => {
  const minAmount = 10;
  const maxAmount = 1000;
  const currency = client.ekoayarlar.parabirimi;

  const user = message.author;
  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);

  if (!hasAccount) {
    return message.reply(`Hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}acc <Hesap İsmi>`);
  }

  let userBalance = db.fetch(`bakiyeasreaper-${user.id}`);

  if (userBalance === null || userBalance < 0) {
    userBalance = 0; // Eğer hesapta para yoksa veya eksi bakiye varsa bakiyeyi sıfırla
  }

  if (commandCooldowns.has(user.id)) {
    message.reply('Lütfen 5 saniye sonra tekrar deneyin.');
    return;
  }

  if (commandCooldowns.size > 0) {
    message.reply('Komut gönderme işlemi aşırı yüklendi. lütfen tekrar deneyin.');
    return;
  }

  const winChance = Math.random() < 0.5;

  let resultMessage = '';

  if (winChance) {
    const amountWon = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
    userBalance += amountWon;
    db.set(`bakiyeasreaper-${user.id}`, userBalance);
    const formattedAmountWon = formatCurrency(amountWon, currency);

    const winMessages = [
      `${user}, tebrikler! Yerde **${formattedAmountWon}** buldunuz.`,
      // Diğer kazanma mesajları buraya eklenebilir.
    ];

    resultMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
  } else {
    const amountLost = 0; // Kullanıcı para kaybetmez
    const formattedAmountLost = formatCurrency(amountLost, currency);

    const loseMessages = [
      `${user}, Yağmurlu havada yürürken telefonla Discord'a girip /sc yazarken yere düştün ve kafanı kaldırım taşına çarptın. Hiçbir şey kazanamadın.`,
      // Diğer kaybetme mesajları buraya eklenebilir.
    ];

    resultMessage = loseMessages[Math.floor(Math.random() * loseMessages.length)];
  }

  message.channel.send(resultMessage);

  commandCooldowns.add(user.id);
  setTimeout(() => {
    commandCooldowns.delete(user.id);
  }, cooldownTime);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sc'],
  permLevel: 0,
  category: 'Eğlence',
};

exports.help = {
  name: 'sc',
  description: 'Rastgele para kazanma veya kaybetme işlemi gerçekleştirir.',
  usage: 'sc',
};
