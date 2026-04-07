import Image from "next/image";
import styles from "./page.module.css";
import { FaCheck } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import Link from 'next/link';
import NewItemCard from "@/components/NewItemCard/NewItemCard";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { ViewAllProductButton } from "@/components/Button/ViewAllProductButton";
export default function Home() {
    return (
    <>
        
        <section className={styles.hero}>
            <div className={`${styles.container} ${styles.hero__content}`}>
                <div className={styles.hero__text}>
                    <h2 className={styles.hero__title}>トレンドの最先端へ</h2>
                    <p className={styles.hero__description}>あなたのライフスタイルを彩る厳選アイテムを取り揃えました。シンプルでありながらも個性を引き立てる商品をお届けします。</p>
                    <Link href="/products" className={styles.hero__button}>商品を見る</Link>
                </div>
                <div className={styles.hero__imageWrapper}>
                    <Image
                        src="/images/hero-image.jpg"
                        alt="ヒーロー画像"
                        fill
                        style={{objectFit: "cover"}}
                        priority
                        />
                </div>
            </div>
        </section>

        <section className={styles.category}>
            <div className={styles.category__container}>
                <h2 className={styles.sectionTitle}>カテゴリから探す</h2>
                <div className={styles.category__grid}>
                    <CategoryCard 
                        category="clothes"
                        backgroundImageUrl="/images/category-clothing.jpg"
                        description="トレンドコレクション"
                    />
                    <CategoryCard 
                        category="accessories"
                        backgroundImageUrl="/images/category-accessories.jpg"
                        description="トレンドコレクション"
                    />
                    <CategoryCard 
                        category="gadget"
                        backgroundImageUrl="/images/category-gadgets.jpg"
                        description="トレンドコレクション"
                    />
                </div>
            </div>
        </section>

        <section className={styles.product}>
            <div className={styles.product__container}>
                <h2 className={styles.sectionTitle}>新着商品</h2>
                <NewItemCard numOfPreview={4}/>
                <div className={styles.product__viewAll}>
                    <ViewAllProductButton />
                </div>
            </div>
        </section>

        <section className={styles.service}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>私たちのサービス</h2>
                <div className={styles.service__grid}>
                    <div className={styles.service__item}>
                        <div className={styles.service__iconWrapper}><i className={styles.service__icon}><FaCheck /></i></div>
                        <h3 className={styles.service__title}>高品質</h3>
                        <p className={styles.service__description}>厳選された高品質な商品のみを取り扱い、お客様の満足を追求します。</p>
                    </div>
                    <div className={styles.service__item}>
                        <div className={styles.service__iconWrapper}><i className={styles.service__icon}><FaRegClock /></i></div>
                        <h3 className={styles.service__title}>迅速配送</h3>
                        <p className={styles.service__description}>注文確定から最短で翌日にお届け。スピーディーな発送体制を整えています。</p>
                    </div>
                    <div className={styles.service__item}>
                        <div className={styles.service__iconWrapper}><i className={styles.service__icon}><CgShoppingCart /></i></div>
                        <h3 className={styles.service__title}>簡単ショッピング</h3>
                        <p className={styles.service__description}>ユーザーフレンドリーな設計で、ストレスなくお買い物をお楽しみいただけます。</p>
                    </div>
                </div>
            </div>
        </section>
    
    </>
    );
}
