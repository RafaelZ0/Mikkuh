const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Ir para o número da fila selecionado",
  execute(message, args) {
    if (!args.length) return message.reply(`Uso: ${message.client.prefix}${module.exports.name} <Queue Number>`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("<a:jeb:732400791838523493> Não há fila.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} retirou ${args[0] - 1} músicas`).catch(console.error);
  }
};
