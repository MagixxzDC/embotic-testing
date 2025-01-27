module.exports = {
    name: 'purge',
    aliases: ['p', 'clear', 'c', 'delete', 'd'],
    description: 'Deletes a specified number of messages from the channel.',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      const filter = response => {
        return response.author.id === message.author.id;
      };
  
      message.channel.send('How many messages do you want to delete?').then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
          .then(collected => {
            const response = collected.first();
            const amount = parseInt(response.content);
  
            if (isNaN(amount)) {
              return message.reply('Please enter a valid number.');
            } else if (amount < 1 || amount > 100) {
              return message.reply('You need to input a number between 1 and 100.');
            }
  
            message.channel.bulkDelete(amount, true).catch(err => {
              console.error(err);
              message.channel.send('There was an error trying to purge messages in this channel!');
            });
          })
          .catch(() => {
            message.channel.send('You did not enter any number in time.');
          });
      });
    },
  };