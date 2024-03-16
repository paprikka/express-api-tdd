import { Db, MongoClient } from 'mongodb';

let db: Db | null = null;
let client: MongoClient | null = null;

export async function getDB(): Promise<Db> {
  if (db && client) return db;

  if (!process.env.DB_URL) throw new Error('DB_URL not set');

  try {
    client = await new MongoClient(process.env.DB_URL).connect();
    console.log('Connected to DB');
    db = client.db('potato-db');

    return db;
  } catch (e) {
    console.log('Error connecting to DB');
    console.error(e);
    await closeDB();

    throw e;
  }
}

export async function closeDB() {
  console.log('Closing DB');
  if (!client) return;
  client.close();
}
