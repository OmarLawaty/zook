import { type Document, type Types, Schema, model } from 'mongoose';

import { defaultMemberConfig } from '../utils';
import type { UpdateItem } from './types';

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

type UpdatePointsProps = {
  userId: string;
} & (
  | {
      action: UpdateItem;
      amount: number;
    }
  | {
      action: 'reset';
    }
);

export const updatePoints = async ({ userId, ...points }: UpdatePointsProps) => {
  const user = await getMemberSchema(userId);

  switch (points.action) {
    case 'add':
      user.set('points', user.points + points.amount);
      break;

    case 'remove':
      user.set('points', user.points - points.amount);
      break;

    case 'set':
      user.set('points', points.amount);
      break;

    case 'reset':
      user.set('points', 0);
      break;
  }

  user.save();

  return user.points;
};
