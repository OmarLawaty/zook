import { ActivityOptions, ActivityType } from 'discord.js';

import { configDotenv } from 'dotenv';

import { BotConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

const devModeConfig: BotConfig = {
  serverId: '1251507731496570912',
};

const productionModeConfig: BotConfig = {
  serverId: '673700884617625621',
};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
