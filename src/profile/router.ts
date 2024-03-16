import { Router } from 'express';
import { makeProfile } from './model';

export const profileRouter = Router();

profileRouter.get('/', async (_, res) => {
  const { Profile } = await makeProfile();
  const response = await Profile.find({}).toArray();

  res.json(response);
});
