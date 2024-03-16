import request from 'supertest';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import { app } from '../../src';
import { closeDB } from '../../src/db';
import { makeProfile } from '../../src/profile/model';

beforeEach(async () => {
  const { Profile } = await makeProfile();
  await Profile.deleteMany({});
});

afterAll(async () => {
  closeDB();
});

describe('GET /profile', () => {
  test('lists all profiles', async () => {
    const { Profile } = await makeProfile();

    const { insertedIds } = await Profile.insertMany([
      { name: 'Alice', email: 'alice@alice.co' },
      { name: 'Bob', email: 'bob@bob.co' },
    ]);

    const response = await request(app).get('/profile');

    expect(response.body).toEqual([
      {
        _id: insertedIds[0].toString(),
        name: 'Alice',
        email: 'alice@alice.co',
      },
      { _id: insertedIds[1].toString(), name: 'Bob', email: 'bob@bob.co' },
    ]);
    expect(response.status).toBe(200);
  });
});
