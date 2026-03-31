"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form"
type FormData = {
    email: string;
    password: string;
}

export default function LoginPage() {

    const { handleSubmit, register, formState } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = ({ email, password }: FormData) => {
        // TODO: 認証API連携に置き換え
        console.log({ email, password });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>ログイン</h1>
                <p className={styles.sinupText}>または <Link href="/signup" className={styles.sinupLink}>新規登録</Link></p>
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
            </div>
        </div>
    );
}

