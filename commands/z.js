module.exports = {
    name: "ㅤ",
    description: "ㅤ",
      execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        
        if (!queue) return message.reply("ㅤ").catch(console.error);
        if (!canModifyQueue(message.member)) return;

    }
};