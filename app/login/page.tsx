"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: 認証API連携に置き換え
        console.log({ email, password });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>ログイン</h1>
                <p className={styles.sinupText}>または <Link href="/signup" className={styles.sinupLink}>新規登録</Link></p>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.field}>
                        <input
                            className={styles.input}
                            id="login-email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder="メールアドレス"
                        />
                        <input
                            className={styles.input}
                            id="login-password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="パスワード"
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
}

