import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// ↑ 他にも GitHubProvider, TwitterProvider, FacebookProvider, CredentialsProvider, ...
//   など多数のプロバイダを必要に応じてimportできます。

// NextAuthOptions は NextAuth.js の設定全体をまとめるオブジェクトの型です。
export const authOptions: NextAuthOptions = {
  // 1) 認証プロバイダの設定
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID || "",
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    // }),
    // ... 他のOAuthプロバイダを追加可能
    
  ],

  // 2) セッション設定
  session: {
    // strategy は "jwt" (JSON Web Token) か "database" (データベースセッション) を選択可能
    strategy: "jwt",
  },

  // 3) コールバック (認証時に呼ばれる各種フック)
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // ここでユーザーがサインインしていいかどうかをチェック可能
      // 例) メールアドレスが特定ドメインの場合のみ許可するとか
      return true;
    },
    async jwt({ token, user, account }) {
      // JWT のペイロードをカスタマイズできる
      // 例) "accessToken" に OAuth provider から取得したアクセストークンを含める
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにカスタム情報を含める
      // (例: 画面にユーザー名やアイコンを表示したい場合)
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  // 4) ページ設定
  pages: {
    // signIn: '/auth/signin',
    // error: '/auth/error',
    // signOut: '/auth/signout',
    // など、任意のカスタムページを設定できる
  },

  // 5) デバッグ設定 (開発中にログ表示したいときに便利)
  debug: process.env.NODE_ENV === "development",
};

// NextAuth関数を実行してRoute Handlerとしてexport
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };