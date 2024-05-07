import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export default async function connectToDatabase(): Promise<Db> {
  if (clientPromise) {
    return clientPromise.then(client => client.db(process.env.MONGODB_DB));
  }

  client = new MongoClient(uri);

  clientPromise = client.connect();
  return clientPromise.then(client => client.db(process.env.MONGODB_DB));
}

