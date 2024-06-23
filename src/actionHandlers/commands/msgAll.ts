import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from './types';

export const msgAll: Command = async (interaction) => {
  const { guild, user, options } = interaction;
  const message = options.getString('message');

  const allGuildMembers = (await guild.members.fetch()).map((member) => member);

  allGuildMembers.forEach((member) => !member.user.bot && member.send({ content: message }).catch((err) => err));
  interaction.reply({ content: 'Message sent to all members.', ephemeral: true });
};

msgAll.create = {
  name: 'msg-all',
  description: 'Send a message to all members.',
  options: [
    {
      name: 'message',
      description: 'The message to send.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
