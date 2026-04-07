import { Product } from "@/types/Product";
import styles from "./NewItemCard.module.css"
import Image from "next/image";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { CATEGORIES } from "@/types/Category";

interface NewItemCardProps {
    numOfPreview: number;
}

export default async function NewItemCard({numOfPreview}:NewItemCardProps) {
    console.log(numOfPreview);

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.from('products').select(`
        *,
        categories (label) ,
        product_images (image_url)
      `);

    const products: Product[] | undefined = data?.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.categories.label,
        rate: item.average_rate,
        stock: item.stock,
        description: item.description,
        publishedAt: item.published_at,
        imageUrls: item.product_images.map((img: any) => img.image_url),
      }));

    const items: Product[] = [...(products ?? [])];

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
                        <Image src={item.imageUrls[0]} alt={item.title}
                            fill
                            style={{objectFit: "cover"}}/>
                    </div>
                    <div className={styles.product__text}>
                        <h3 className={styles.product__name}>{item.title}</h3>
                        <p className={styles.product__category}>{CATEGORIES[item.category]}</p>
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