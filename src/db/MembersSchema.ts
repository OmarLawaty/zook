import { type Document, type Types, Schema, model } from 'mongoose';

import { defaultMemberConfig } from '../utils';
import type { updateItem } from './types';

export interface Member {
  userId: string;
  points: number;
}

export const MemberSchema = model<Member>(
  'member',
  new Schema<Member>({
    userId: String,
    points: Number,
  })
);

type ReturnedMemberSchema = Document<unknown, {}, Member> & Member & { _id: Types.ObjectId };

export const getMemberSchema = async (userId: string): Promise<ReturnedMemberSchema> =>
  (await MemberSchema.findOne({ userId })) ?? (await new MemberSchema({ userId, ...defaultMemberConfig }).save());

export const UpdatePoints = async (userId: string, action: updateItem, amount?: number) => {
  const user = await getMemberSchema(userId);

  switch (action) {
    case 'add':
      user.set('points', user.points + amount);
      break;

    case 'remove':
      user.set('points', user.points - amount);
      break;

    case 'set':
      user.set('points', amount);
      break;

    case 'reset':
      user.set('points', 0);
      break;
  }

  user.save();

  return user.points;
};
