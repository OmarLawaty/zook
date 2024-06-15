import { commands } from '../actionHandlers';
import { InteractionName } from '../actionHandlers/commands/types';

export const getCommandIdentifierIndex = (interactionName: InteractionName): number =>
  commands.findIndex((command) => command.name === interactionName);
