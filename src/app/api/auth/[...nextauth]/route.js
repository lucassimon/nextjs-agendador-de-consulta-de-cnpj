import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const client = axios.create({baseURL: process.env.MS_API_USERS});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // console.log('minhas credenciais', credentials)
        try {
          const { data: { data }} = await client.post('/auth', { email: credentials.email, password: credentials.password })
          return data
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET_KEY,
  pages: {
    error: "/dashboard/login",
    signIn: '/dashboard/login',
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   debugger;
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      // console.log(baseUrl, url);
      return baseUrl
    },
    async session({ session, user, token }) {
      // console.log(session, user, token)
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken;

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log(token);
      if (user) {
        token.accessToken = user.token
        token.refreshToken = user.refresh
      }
      return token
    }
  },
  events: {
    async signIn(message) {  },
    async signOut(message) {  },
    async createUser(message) {  },
    async updateUser(message) {  },
    async linkAccount(message) {  },
    async session(message) {  },
  }
});

export { handler as GET, handler as POST };
