"use client";

import { SessionProvider } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";
import { SignInWithGoogle } from "@/components/Button/SignInWithGoogle";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {

    return (
        <SessionProvider>
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>ログイン</h1>
                <p className={styles.sinupText}>または <Link href="/signup" className={styles.sinupLink}>新規登録</Link></p>
                <LoginForm />

                <SignInWithGoogle />
            </div>
        </div>
        </SessionProvider>
    );
}

