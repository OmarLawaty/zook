import { EmbedBuilder, Guild, TextChannel, User } from 'discord.js';

import type { UpdateItem } from '../db/types';
import { botConfig } from '../utils';

type LogOptions = {
  type: 'points';
  action: UpdateItem;
  user: User;
  memberToUpdate: User;
  amount: number;
};

export const onLog = (guild: Guild, options: LogOptions) => {
  const logsChannel = guild.channels.cache.get(botConfig.logsChannelId) as TextChannel;

  switch (options.type) {
    case 'points':
      let _pointsEmbed = pointsEmbed(options.user, guild, options.memberToUpdate, options.action, options.amount);

      logsChannel.send({ embeds: [_pointsEmbed] });

      return _pointsEmbed;
  }
};

export const pointsEmbed = (user: User, guild: Guild, memberToUpdate: User, action: UpdateItem, amount: number) =>
  new EmbedBuilder({
    author: { name: user.displayName, icon_url: user.displayAvatarURL({ extension: 'png', size: 4096 }) },
    footer: { text: guild.name, icon_url: guild.iconURL({ extension: 'png', size: 4096 }) },
    timestamp: new Date(),
    fields: [
      { name: 'Updated Member', value: `${memberToUpdate}` },
      { name: 'Action', value: action },
      amount && { name: 'Amount', value: String(amount) },
    ],
    color: memberToUpdate.accentColor,
    thumbnail: { url: memberToUpdate.displayAvatarURL({ extension: 'png', size: 4096 }) },
    provider: guild,
  });
