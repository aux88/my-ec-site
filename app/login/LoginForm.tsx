import styles from "./page.module.css";
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
    email: string;
    password: string;
}

export const LoginForm = () =>{
    const { data: session, status } = useSession();

    const router = useRouter();

    const { handleSubmit, register, formState } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit({ email, password }: FormData) {
        // credentialsプロバイダを指定してsignIn
        const res = await signIn("credentials", {
            email,
            password,
            // エラー処理をしたい場合は、コールバックURLなどを指定して結果を判定
            callbackUrl: "/",
            redirect: true, // エラー時に画面遷移させないなら false
        });
    
        if (res?.error) {
            alert("ログインエラー: " + res.error);
        } else {
            // 成功の場合はトップページへ移動
            router.push("/");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
            <input
                className={styles.input}
                id="login-email"
                type="email"
                {...register("email",{ required: "入力してください"})}
                autoComplete="email"
                placeholder="メールアドレス"
            />
            <input
                className={styles.input}
                id="login-password"
                type="password"
                {...register("password",{ required: true})}
                autoComplete="current-password"
                placeholder="パスワード"
            />
        </div>

        <button type="submit" className={styles.loginBtn} disabled={!formState.isValid}>
            ログイン
        </button>
    </form>
    );
}