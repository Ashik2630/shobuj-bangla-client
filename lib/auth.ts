import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shobuj-bangla";
const client = new MongoClient(mongoUri);
const db = client.db("shobuj-bangla");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me",
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
