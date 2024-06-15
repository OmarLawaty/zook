import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

import type { Command } from './types';
import { UpdatePoints } from '../../db';
import { updateItem } from '../../db/types';

export const points: Command = ({ options, guild, member }) => {
  const memberToUpdate = options.getUser('member');
  const action = options.getString('action', true);
  const amount = options.getInteger('amount', true);

  UpdatePoints(memberToUpdate.id, action as updateItem, amount);
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
