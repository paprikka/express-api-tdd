import { WithId } from 'mongodb';
import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type ListProfileResponse = WithId<Profile>[];
