import bcrypt from "bcryptjs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * email と password を受け取り、DBのハッシュ化されたパスワードと照合して
 * 正しい場合にユーザー情報を返す関数
 *
 * @param email ユーザーのメールアドレス
 * @param password ユーザーから入力された平文のパスワード
 * @returns 認証成功時はユーザー情報、失敗時は null
 */
export const verifyUserPassword = async (email: string, password: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1) DB から email が一致するユーザーレコードを取得
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, password, name")
    .eq("email", email)
    .single();

  if (error || !user) {
    console.error("User not found or database error:", error?.message);
    return null;
  }

  // 2) bcrypt を用いて入力されたパスワードと、DBに保存されたハッシュ値を比較
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return null;
  }

  // 3) 認証成功なら、パスワードを除いたユーザー情報を返す
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
