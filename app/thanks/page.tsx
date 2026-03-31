import Link from "next/link";
import styles from "./page.module.css";

export default function ThanksPage() {
    return (
        <div className={styles.container}>
            <p className={styles.message}>ご注文ありがとうございます</p>
            <Link href="/" className={styles.backToHomeLink}>ホームへ戻る</Link>
        </div>
    );
}

