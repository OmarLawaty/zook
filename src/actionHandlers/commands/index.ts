import { ChatInputCommandInteraction, GuildApplicationCommandManager } from 'discord.js';

import { getCommandIdentifierIndex } from '../../utils/helpers';

import type { Interaction, InteractionName } from './types';

import { points } from './points';

export const commands = [{ name: 'points', type: 'points', interaction: points }] as const;

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
