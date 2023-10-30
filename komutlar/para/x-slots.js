const Discord = require('discord.js');
const db = require('quick.db');

const maxBetAmount = 10000000; // Maksimum bahis miktarı
const cooldownTime = 12000; // Bekleme süresi (10 saniye)

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parseBetAmount(input) {
  const parsedAmount = parseFloat(input.replace(/,/g, ''));
  return !isNaN(parsedAmount) ? Math.floor(parsedAmount) : null;
}

exports.run = async (client, message, args) => {
  const slotIcons = [
    { symbol: '🍇', multiplier: 2 },
    { symbol: '🍋', multiplier: 2 },
    { symbol: '🍆', multiplier: 2 },
    { symbol: '🍒', multiplier: 2 },
    { symbol: '💰', multiplier: 5 },
    { symbol: '💸', multiplier: 5 },
    { symbol: '💷', multiplier: 5 },
    { symbol: '💎', multiplier: 5 },
    { symbol: '💳', multiplier: 20 },
  ];

  const user = message.author;
  const symbols = [];
  const inputAmount = args[0];

  if (!inputAmount) {
    return message.reply(`Örnek Kullanım: **/sl 10,000${client.ekoayarlar.parabirimi}**`);
  }

  let betAmount = parseBetAmount(inputAmount);

  if (betAmount === null) {
    return message.reply(`Geçersiz bahis miktarı girdiniz.`);
  }

  if (betAmount < 10000 || betAmount > maxBetAmount) {
    return message.reply(`Minimum Bahis Miktarı **10,000**${client.ekoayarlar.parabirimi}\n Maksimum Bahis Miktarı **${formatCurrency(maxBetAmount)}${client.ekoayarlar.parabirimi}**.`);
  }

  // Kullanıcının hesabını kontrol et
  const userBalance = db.fetch(`bakiyeasreaper-${user.id}`);
  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);

  if (!userBalance || userBalance <= 0 || betAmount > userBalance || !hasAccount) {
    return message.reply(`**HataID: 101**\n *(Bu hatanın sebebi hesabınızda yeterli paranızın olmaması, 10,000bin'den küçük, 10,000,000milyon'dan büyük sayı girmiş olmanız veya hesabınızın olmamasından kaynaklanıyor.)*`);
  }

  // Bekleme süresini kontrol et
  const lastPlayed = db.fetch(`lastPlayedSlots_${user.id}`);
  if (lastPlayed !== null && cooldownTime - (Date.now() - lastPlayed) > 0) {
    const timeLeft = cooldownTime - (Date.now() - lastPlayed);
    return message.reply(`**${Math.floor(timeLeft / 1000)}** saniye sonra tekrar deneyin.`);
  }

  db.set(`lastPlayedSlots_${user.id}`, Date.now());

  // Slot dönme animasyonunu oluştur
  const spinningMessage = await message.channel.send(`🎰 **${formatCurrency(betAmount)}${client.ekoayarlar.parabirimi}** için bakiye işlemi uygulanıyor..⏳`);

  const interval = 900; // Slot emojilerinin değiştirme hızı (0.9 saniye)
  const totalIntervals = 5; // Toplam değiştirme sayısı
  const spinDuration = interval * totalIntervals; // Dönme süresi (4.5 saniye)

  const newSymbolsArray = [];

  for (let i = 0; i < totalIntervals; i++) {
    const newSymbols = [];
    for (let j = 0; j < 3; j++) {
      const randomIndex = Math.floor(Math.random() * slotIcons.length);
      newSymbols.push(slotIcons[randomIndex].symbol);
    }
    newSymbolsArray.push(newSymbols.join(' | '));
  }

  // Slot dönme animasyonunu güncelle
  setTimeout(async () => {
    for (let i = 0; i < totalIntervals; i++) {
      spinningMessage.edit(`\`🎰\` | ${newSymbolsArray[i]} | \`🎰\``);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    // Slot dönme animasyonu sona erdikten sonra sonucu hesapla
    const symbolCounts = [];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * slotIcons.length);
      symbols.push(slotIcons[randomIndex].symbol);

      // Sembol sayısını say
      if (symbolCounts[symbols[i]]) {
        symbolCounts[symbols[i]]++;
      } else {
        symbolCounts[symbols[i]] = 1;
      }
    }

    let winAmount = 0;

    for (const symbol in symbolCounts) {
      if (symbolCounts[symbol] >= 2) {
        // İki veya daha fazla sembol geldiyse kazanç sağla
        const symbolMultiplier = slotIcons.find((s) => s.symbol === symbol).multiplier;
        winAmount += betAmount * symbolMultiplier * (symbolCounts[symbol] - 1); // Daha fazla sembol, daha fazla kazanç
      }
    }

    let resultMessage = '';
    resultMessage += `\` 🎰 \`  | ${symbols.join(' | ')} |  \` 🎰 \`\n`;

    if (winAmount > 0) {
      db.add(`bakiyeasreaper-${user.id}`, winAmount);
      resultMessage += `${user}, you **__WON__** **from the slot!!** You deposited **${formatCurrency(betAmount)}${client.ekoayarlar.parabirimi}**\n   and received **+${formatCurrency(winAmount)}${client.ekoayarlar.parabirimi}**!!\n`;
    } else {
      db.subtract(`bakiyeasreaper-${user.id}`, betAmount);
      resultMessage += `${user}, You lost all the money you deposited... **-${formatCurrency(betAmount)}${client.ekoayarlar.parabirimi}**`;
    }

    spinningMessage.edit(resultMessage);
  }, spinDuration);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['slot', 'kumarslot', 'slotmachine'],
  permLevel: 0,
  katagori: 'Ekonomi',
};

exports.help = {
  name: 'sl',
  description: 'Kumar oynayın ve slot makinesinde şansa karşı para kazanın.',
  usage: 'slots <bahis miktarı veya "all">',
};
