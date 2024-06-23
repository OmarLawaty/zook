export type Prefix = 'gt!';

export type BotConfig = {
  serverId: `${number}`;
  logsChannelId: `${number}`;
};

export interface MemberConfig {
  points: number;
}
