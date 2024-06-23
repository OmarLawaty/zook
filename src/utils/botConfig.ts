import { ActivityOptions, ActivityType } from 'discord.js';

import { configDotenv } from 'dotenv';

import { BotConfig, MemberConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

const devModeConfig: BotConfig = {
  serverId: '1251507731496570912',
  logsChannelId: '1251689183869665332',
};

const productionModeConfig: BotConfig = {
  serverId: '1244192914389602375',
  logsChannelId: '1244195997526265906',
};

export const defaultMemberConfig: MemberConfig = {
  points: 0,
};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
