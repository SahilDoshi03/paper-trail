import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      console.log("USER", user)
      console.log("Account", account)
      console.log("Profile", profile)
      console.log("email", email)
      return true
    }
  }
})
