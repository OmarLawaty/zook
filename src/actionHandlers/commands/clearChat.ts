import { ApplicationCommandOptionType, ChannelType, PermissionsBitField } from 'discord.js';
import { Command } from './types';
import { onLog } from '../onLog';

export const clearChat: Command = (interaction) => {
  const { options, member, channel, guild, user } = interaction;

  const amount = options.getInteger('amount');

  if (channel.type !== ChannelType.GuildText)
    return interaction.reply({
      content: 'This command can only be used in text channels.',
      ephemeral: true,
    });

  if (amount < 1 || amount > 50)
    return interaction.reply({
      content: 'Amount must be between 1 and 50.',
      ephemeral: true,
    });

  (member.permissions as Readonly<PermissionsBitField>).has('Administrator') &&
    channel
      .bulkDelete(amount)
      .then(() => interaction.reply({ content: `Deleted ${amount} messages`, ephemeral: true }))
      .then(() => onLog(guild, { type: 'clearChat', channel, amount, user }));
};

clearChat.create = {
  name: 'clear-chat',
  description: 'Clear messages from chat.',
  options: [
    {
      name: 'amount',
      description: 'Amount of messages to clear.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
