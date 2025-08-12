import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"

/**
 * NextAuth.js Configuration for Ultra Music Collab
 * 
 * Supports authentication with:
 * - Google OAuth2
 * - Microsoft Azure AD
 * 
 * Required Environment Variables:
 * - NEXTAUTH_SECRET: A random string for JWT encryption
 * - NEXTAUTH_URL: Your site's canonical URL (e.g., http://localhost:3000)
 * 
 * Google OAuth Configuration (already provided):
 * - GOOGLE_CLIENT_ID: 740397796775-e6or05ncur9a7dc98rvclbu5ltoja1sf.apps.googleusercontent.com
 * - GOOGLE_CLIENT_SECRET: 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
 * 
 * Azure AD Configuration (to be added):
 * - AZURE_AD_CLIENT_ID: [YOUR_AZURE_AD_CLIENT_ID]
 * - AZURE_AD_CLIENT_SECRET: [YOUR_AZURE_AD_CLIENT_SECRET] 
 * - AZURE_AD_TENANT_ID: [YOUR_AZURE_AD_TENANT_ID]
 * 
 * Redirect URIs configured for:
 * - http://localhost:3000/api/auth/callback/google
 * - http://localhost:3000/api/auth/callback/azure-ad
 * - https://<vercel-domain>/api/auth/callback/google
 * - https://<vercel-domain>/api/auth/callback/azure-ad
 */

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    }),
    
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      // TODO: Update these values when Azure AD credentials are available
      // Currently using placeholder values - replace with actual Azure AD app credentials
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      session.provider = token.provider
      return session
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
