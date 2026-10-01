import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL!);
const db = client.db("better-auth-db");

export const auth = betterAuth({
  //...
  emailAndPassword: {
    enabled: true,
  },

  //FOR GOOGLE:
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_CLENT_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.BETTER_AUTH_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_DISCORD_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
