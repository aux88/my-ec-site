import { Product } from "../types/Product";
import ProductCard from "./ProductCard/ProductCard";
import styles from "./page.module.css";

export default function ProductsPage() {

    // const res = await fetch(
    // `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    // { cache: "no-store" }
    // );
    // const products: Product[] = await res.json();

    // 仮データ(本番ではAPIやDBなどから取得)
    const mockProducts: Product[] = [
            { id: 1, title: "Tシャツ", price: 2000 },
            { id: 2, title: "帽子", price: 1500 },
            // ...etc
        ];

    const products: Product[] = [...mockProducts];

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1>すべての商品</h1>
                <p>●件の商品が見つかりました</p>
                <ul className={styles.grid}>
                    {products.map((item) => (
                        <li className={styles.item} key={item.id}>
                            <ProductCard 
                                product={item}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}