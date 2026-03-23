"use client";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/Product";
// import { Product } from "@/types";
import { useState } from "react";
import StarRating from '@/app/components/Rating/Rating';


type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
        className={styles.card}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        >
            <div className={styles.imageWrapper}>
                <Image
                        src={product.imageUrl}
                        alt=""
                        fill
                        style={{objectFit: "cover"}}
                        />
            </div>
            <div className={styles.productText}>
                <h2 className={styles.name}>{product.title}</h2>
                <p className={styles.category}>{product.category}</p>
                <StarRating rating={product.rate} size={12} sumreview={1234}/>
                <div className={styles.salesInfo}>
                    <p className={styles.price}>¥{product.price}</p>
                    <p className={`${styles.stock} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                        {product.stock > 0 ? "在庫あり" : "在庫なし"}</p>
                </div>
            </div>
        </div>
    );
}