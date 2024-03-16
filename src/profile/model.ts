import { getDB } from '../db';

export const makeProfile = async () => {
  const db = await getDB();
  const Profile = db.collection('profile');

  return {
    Profile,
  };
};
