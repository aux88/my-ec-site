import styles from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.footer__upper}`}>
                <div className={styles.footer__column}>
                    <h3 className={styles.footer__title}>React EC</h3>
                    <p className={styles.footer__description}>React学習のための段階的な課題集で作成したECサイトです。</p>
                </div>
                <div className={styles.footer__column}>
                    <h3 className={styles.footer__title}>ショップ情報</h3>
                    <ul className={styles.footer__links}>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>サイトについて</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>プライバシーポリシー</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>利用規約</a></li>
                    </ul>
                </div>
                <div className={styles.footer__column}>
                    <h3 className={styles.footer__title}>商品カテゴリー</h3>
                    <ul className={styles.footer__links}>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>衣類</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>アクセサリー</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>ガジェット</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>すべての商品</a></li>
                    </ul>
                </div>
                <div className={styles.footer__column}>
                    <h3 className={styles.footer__title}>ご利用ガイド</h3>
                    <ul className={styles.footer__links}>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>ご注文方法</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>お支払いについて</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>配送について</a></li>
                        <li className={styles.footer__item}><a href="#" className={styles.footer__link}>よくある質問</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer__divider}></div>
            <div className={`${styles.container} ${styles.footer__lower}`}>
                <p className={styles.footer__copyright}>&copy; 2026 React EC. All rights reserved.</p>
                <div className={styles.footer__social}>
                    <a href="#" className={styles.footer__socialLink}><FaFacebook /></a>
                    <a href="#" className={styles.footer__socialLink}><FaInstagram /></a>
                    <a href="#" className={styles.footer__socialLink}><FaTwitter /></a>
                </div>
            </div>
        </footer>
    );
}