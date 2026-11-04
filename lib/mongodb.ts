import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Thiếu MONGODB_URI trong .env.local");

const globalForMongo = globalThis as typeof globalThis & {
    mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(uri);
globalForMongo.mongoClient = client;

export const db = client.db(process.env.MONGODB_DB);