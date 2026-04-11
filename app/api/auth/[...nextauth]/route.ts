import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUserPassword } from "@/lib/auth"; // パスワード検証用の独自関数

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
    CredentialsProvider({
      name: "Credentials",
      // credentials フィールドで、ログインフォームから受け取る情報を定義
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      // 認証成功・失敗のロジックを定義するメソッド
      async authorize(credentials, req) {
        // credentials は { email: string; password: string } の形が入る想定
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing username or password");
        }
        // 独自ロジックでDBのユーザーレコードを確認
        const user = await verifyUserPassword(
          credentials.email,
          credentials.password
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }
        // 認証成功ならユーザー情報を返す
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
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
      if (user){
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにカスタム情報を含める
      // (例: 画面にユーザー名やアイコンを表示したい場合)
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.user_id;
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

  // 6) NEXTAUTH_SECRET
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth関数を実行してRoute Handlerとしてexport
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };