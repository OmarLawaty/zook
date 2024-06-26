import { CacheType, Client, Interaction } from 'discord.js';

import { action } from './action';

import { onReady } from './onReady';
import { onInteractionCreate } from './onInteractionCreate';

export const invokeActions = (Client: Client) => {
  action(Client, 'ready', onReady);
  action(Client, 'interactionCreate', onInteractionCreate as (i: Interaction<CacheType>) => void);
};
