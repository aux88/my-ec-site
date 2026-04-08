'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Button.module.css";


export const SignOutButton = () => {
    const { data: session, status } = useSession();
    
    return (
        <button 
            className={!session ? styles.disable : ""} 
            onClick={() => session && signOut({ callbackUrl: "/login" })}
        >
            ログアウト
        </button>
    );

}