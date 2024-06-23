import { ApplicationCommandOptionType, ApplicationCommandType, PermissionsBitField } from 'discord.js';

import { onLog, pointsEmbed } from '../';
import { updatePoints, UpdateItem } from '../../db';
import type { Command } from './types';

export const points: Command = (interaction) => {
  const { options, guild, member, user } = interaction;

  const memberToUpdate = options.getUser('member');
  const action = options.getString('action', true) as UpdateItem;
  const amount = options.getInteger('amount', true);

  if (!(member.permissions as Readonly<PermissionsBitField>).has('Administrator'))
    return interaction.reply({ content: 'Only administrators are allowed to update points!', ephemeral: true });
  if (memberToUpdate.bot) return interaction.reply({ content: "Bots don't have points!", ephemeral: true });

  updatePoints({ userId: memberToUpdate.id, action, amount }).then(() =>
    interaction.reply({ embeds: [onLog(guild, { type: 'points', action, amount, memberToUpdate, user })] })
  );
};

points.create = {
  name: 'points',
  description: 'Manage members points.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'member',
      description: 'The member to manage points',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'action',
      description: "Points' actions to a member.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'add', value: 'add' },
        { name: 'remove', value: 'remove' },
        { name: 'set', value: 'set' },
        { name: 'reset', value: 'reset' },
      ],
    },
    {
      name: 'amount',
      description: 'The amount of points to add or remove.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
