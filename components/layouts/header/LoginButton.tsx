'use client'
import styles from "./Header.module.css";
import { CgUser } from "react-icons/cg";
import Link from 'next/link';
import { useSession } from "next-auth/react";

export const LoginButton = () => {
    const { data: session } = useSession();
    
    return (
        <Link href={session ? "/cart" : "/login"} className={styles.header__loginBtn}>
            <span className={styles.header__icon}><CgUser /></span>
            { session ? session.user?.name : "ログイン" }
        </Link>
    );

}