const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  description: "Remover música da fila",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("<a:jeb:732400791838523493> Não há fila.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Uso: ${message.client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Uso: ${message.client.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} <a:errado_1:731972969475342418> removeu **${song[0].title}** da fila.`);
  }
};
