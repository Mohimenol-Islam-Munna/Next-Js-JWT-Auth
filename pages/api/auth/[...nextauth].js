import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "my-project",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
        tenantKey: {
          label: "Tenant Key",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        console.log("payload data :: in pera ::", payload);

        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/users"
        );

        const user = await res;

        // If no error and we have user data, return it
        if (user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  //   secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },

  //   callbacks: {
  //     async jwt({ token, user, account }) {
  //       if (account && user) {
  //         return {
  //           ...token,
  //           accessToken: user.data.token,
  //           refreshToken: user.data.refreshToken,
  //         };
  //       }

  //       return token;
  //     },

  //     async session({ session, token }) {
  //       session.user.accessToken = token.accessToken;
  //       session.user.refreshToken = token.refreshToken;
  //       session.user.accessTokenExpires = token.accessTokenExpires;

  //       return session;
  //     },
  //   },
  //   theme: {
  //     colorScheme: "auto", // "auto" | "dark" | "light"
  //     brandColor: "", // Hex color code #33FF5D
  //     logo: "/logo.png", // Absolute URL to image
  //   },
});
