import ProductCard from "@/app/components/ProductCard/ProductCard";
import Link from "next/link";
import { Product } from "../types/Product";
import styles from "./page.module.css";
import { mockProducts } from "@/app/lib/mock/products";

export default function ProductsPage() {

    // const res = await fetch(
    // `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    // { cache: "no-store" }
    // );
    // const products: Product[] = await res.json();

    // 仮データ(本番ではAPIやDBなどから取得)
    const products: Product[] = [...mockProducts];

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1>すべての商品</h1>
                <p>{products.length}件の商品が見つかりました</p>
                <ul className={styles.grid}>
                    {products.map((item) => (
                        <li className={styles.item} key={item.id}>
                            <Link href={`/products/${item.id}`}>
                            <ProductCard 
                                product={item}
                            />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}