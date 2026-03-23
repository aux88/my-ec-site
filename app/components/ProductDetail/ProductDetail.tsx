import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetail.module.css";
import { Product } from "@/app/types/Product";
import StarRating from "@/app/components/Rating/Rating";

type Props = {
    product: Product;
};

export const ProductDetail = ({ product }: Props) =>{
    return (
        <div className={styles.container}>
        <div className={styles.productDetail}>
            <div className={styles.imageSection}>
            <figure className={styles.imageWrapper}>
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </figure>
            </div>
            <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.title}</h1>
            <StarRating rating={product.rate} size={20} sumreview={123} />
            <span className={styles.category}>{product.category}</span>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.priceStockRow}>
                <span className={styles.price}>¥{product.price.toLocaleString()}</span>
                <span className={`${styles.stock} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                {product.stock > 0 ? `在庫あり` : "在庫なし"}
                </span>
            </div>

            <button className={styles.addToCartButton}>
                カートに追加
            </button>
            <p className={styles.backToProducts}>
                <Link href="/products" className={styles.backLink}>
                    商品一覧に戻る
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
}
