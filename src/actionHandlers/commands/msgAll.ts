import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';
import { Command } from './types';

export const msgAll: Command = async (interaction) => {
  const { guild, member, options } = interaction;
  const message = options.getString('message');

  if (!(member.permissions as Readonly<PermissionsBitField>).has('Administrator'))
    return interaction.reply({ content: 'Only administrators are allowed to message all members!', ephemeral: true });

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
