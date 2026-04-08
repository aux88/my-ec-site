"use client";

import { useContext } from "react";
import styles from "./Header.module.css";
import { CgShoppingCart } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import Link from 'next/link';
import CartContext from "@/context/CartContext";
import { LoginButton } from "./LoginButton";
import { SessionProvider } from "next-auth/react";
import { SignOutButton } from "@/components/Button/SignOutButton";

export const Header = () => {
    const context = useContext(CartContext);
    const cartItems = context?.cartItems || [];
    const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className={styles.header}>
            <div className={`${styles.container} ${styles.header__container}`}>
                <div className={styles.header__contents}>
                    <h1 className={styles.header__logo}>React EC</h1>
                    <nav className={styles.header__nav}>
                        <ul className={styles.header__list}>
                            <li className={styles.header__item}><Link href="/" className={styles.header__link}>ホーム</Link></li>
                            <li className={styles.header__item}><Link href="/products" className={styles.header__link}>商品一覧</Link></li>
                            <li className={styles.header__item}><a href="#" className={styles.header__link}>サイトについて</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.header__actions}>
                    <div className={styles.header__searchWrapper}>
                        <input type="search" placeholder="商品を検索" className={styles.header__search} />
                        <i className={styles.header__searchIcon}><CgSearch /></i>
                    </div>
                    <Link href="/cart">
                        <span className={styles.cartIconWrapper}>
                            <span className={styles.header__icon}><CgShoppingCart /></span>
                            {totalItemCount > 0 && (
                                <span className={styles.badge}>{totalItemCount}</span>
                            )}
                        </span>
                    </Link>
                    <SessionProvider>
                        <LoginButton/>
                        <SignOutButton/>
                    </SessionProvider>
                </div>
            </div>
        </header> 
    );
}