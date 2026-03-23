import styles from "./Header.module.css";
import { CgShoppingCart } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import Link from 'next/link'

export const Header = () => {

    return (
        <header className={styles.header}>
            <div className={`${styles.container} ${styles.header__container}`}>
                <div className={styles.header__contents}>
                    <h1 className={styles.header__logo}>React EC</h1>
                    <nav className={styles.header__nav}>
                        <ul className={styles.header__list}>
                            <li className={styles.header__item}><Link href="/" className="header__link header__link--active">ホーム</Link></li>
                            <li className={styles.header__item}><Link href="/products" className="header__link">商品一覧</Link></li>
                            <li className={styles.header__item}><a href="#" className="header__link">サイトについて</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.header__actions}>
                    <div className={styles.header__searchWrapper}>
                        <input type="search" placeholder="商品を検索" className={styles.header__search} />
                        <i className={styles.header__searchIcon}><CgSearch /></i>
                    </div>
                    <span className={styles.header__icon}><CgShoppingCart /></span>
                    <button className={styles.header__loginBtn}><span className={styles.header__icon}><CgUser /></span>ログイン</button>
                </div>
            </div>
        </header> 
    );

}