import { ApplicationCommandOptionType, ApplicationCommandType, PermissionsBitField } from 'discord.js';

import { onLog, pointsEmbed } from '../';
import { updatePoints, UpdateItem } from '../../db';
import type { Command } from './types';

export const points: Command = (interaction) => {
  const { options, guild, member, user } = interaction;

  const memberToUpdate = options.getUser('member');
  const action = options.getSubcommand(true) as UpdateItem;
  const amount = options.getInteger('amount', true);

  if (!(member.permissions as Readonly<PermissionsBitField>).has('Administrator'))
    return interaction.reply({ content: 'Only administrators are allowed to update points!', ephemeral: true });
  if (memberToUpdate.bot) return interaction.reply({ content: "Bots don't have points!", ephemeral: true });

  updatePoints({ userId: memberToUpdate.id, action, amount }).then(() =>
    interaction.reply({
      embeds: [onLog(guild, { type: 'points', action, amount, memberToUpdate, user })],
      ephemeral: true,
    })
  );
};

points.create = {
  name: 'points',
  description: 'Manage members points.',
  options: [
    {
      name: 'add',
      description: 'Add points to a member.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'member',
          description: 'The member to add points.',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'amount',
          description: 'The amount of points to add.',
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove points from a member.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'member',
          description: 'The member to remove points.',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'amount',
          description: 'The amount of points to remove.',
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: 'set',
      description: 'Set points to a member.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'member',
          description: 'The member to set points.',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'amount',
          description: 'The amount of points to set.',
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
  ],
};
