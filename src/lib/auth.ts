import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL!);
const db = client.db("better-auth-db");
//RESEND:
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  //...
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your Password",
        html: `
        <h1>Reset your Password</h1>
        Click <a href="${url}">here</a> to reset your password.
        <p>If you have not sent any reset request, ignore this mail</p>
        `,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your Email",
        html: `
        <h1>Please Verify Your Email</h1>
        Click <a href="${url}">here</a> to reset your email.        
        `,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  //FOR GOOGLE:
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_CLIENT_SECRET as string,
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
