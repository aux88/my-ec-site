import { Product } from "@/types/Product";
import styles from "./NewItemCard.module.css"
import Image from "next/image";
import { mockProducts } from "@/lib/mock/products";
import Link from "next/link";
import { CATEGORY_LABELS } from "@/types/Category"

interface NewItemCardProps {
    numOfPreview: number;
}

export const NewItemCard = ({numOfPreview}:NewItemCardProps) => {
    console.log(numOfPreview);

    // const res = await fetch(
    // `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    // { cache: "no-store" }
    // );
    // const items: Product[] = = await res.json();
    
    // 仮データ(本番ではAPIやDBなどから取得)
    const items: Product[] = [...mockProducts];

    // itemsを新着順に並べてnubOfPreviewの数だけ新しい配列に格納
    const newItems = [...items]
    .sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, numOfPreview);

    return (
        <ul className={styles.product__grid}>
            {newItems.map(item =>(
                <li className={styles.product__card} key={item.id}>
                    <div className={styles.product__imageWrapper}>
                        <Image src={item.imageUrl} alt={item.title}
                            fill
                            style={{objectFit: "cover"}}/>
                    </div>
                    <div className={styles.product__text}>
                        <h3 className={styles.product__name}>{item.title}</h3>
                        <p className={styles.product__category}>{CATEGORY_LABELS[item.category]}</p>
                        <div className={styles.product__details}>
                            <p className={styles.product__price}>¥{item.price.toLocaleString()}</p>
                            <Link href={`/products/${item.id}`} className={styles.product__link}>詳細を見る</Link>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}