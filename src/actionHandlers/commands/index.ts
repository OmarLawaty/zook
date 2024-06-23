import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex } from '../../utils/helpers';

import type { Interaction, InteractionName } from './types';

import { points } from './points';
import { msgAll } from './msgAll';
import { clearChat } from './clearChat';
import { avatar } from './avatar';
import { diceRoll } from './diceRoll';
import { user } from './user';
import { slowMode } from './slowMode';
import { serverInfo } from './serverInfo';

export const commands = [
  { name: 'points', type: 'points', interaction: points },
  { name: 'msg-all', type: 'msgAll', interaction: msgAll },
  { name: 'clear-chat', type: 'clearChat', interaction: clearChat },
  { name: 'roll-dice', type: 'diceRoll', interaction: diceRoll },
  { name: 'avatar', type: 'avatar', interaction: avatar },
  { name: 'user', type: 'user', interaction: user },
  { name: 'slow-mode', type: 'slowMode', interaction: slowMode },
  { name: 'server-info', type: 'serverInfo', interaction: serverInfo },
] as const;

export const commandsHandler = (interaction: ChatInputCommandInteraction) => {
  const interactionName = interaction.commandName as InteractionName;
  const command = commands[getCommandIdentifierIndex(interactionName)];

  command.name === interactionName && createCommandFn(interaction, command);
};

export const commandsCreate = (commandsCreator: GuildApplicationCommandManager) =>
  Object.values(commands).forEach((command) => createCommand(commandsCreator, command));

const createCommandFn = (interaction: ChatInputCommandInteraction, command: Interaction[number]) =>
  command.interaction(interaction);

const createCommand = (commandsCreator: GuildApplicationCommandManager, command: Interaction[number]) =>
  commandsCreator.create(command.interaction.create);
