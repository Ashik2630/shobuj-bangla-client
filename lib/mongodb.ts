import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shobuj-bangla";
const dbName = process.env.MONGODB_DB || "shobuj-bangla";

let cachedClientPromise: Promise<MongoClient> | null = null;

export async function getMongoClient() {
  if (!cachedClientPromise) {
    cachedClientPromise = new MongoClient(uri).connect();
  }

  return cachedClientPromise;
}

export async function getPlacesCollection() {
  const client = await getMongoClient();
  return client.db(dbName).collection("places");
}

export async function getItemsCollection() {
  const client = await getMongoClient();
  return client.db(dbName).collection("items");
}
