const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Alterar o volume da música atualmente sendo reproduzida",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Não há nada tocando agora.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Você precisa ingressar em um canal de voz primeiro!").catch(console.error);

    if (!args[0]) return message.reply(`O volume atual é:**${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Por favor, use um número para definir o volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Escolha um número de 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volume escolhido para: **${args[0]}%**`).catch(console.error);
  }
};
