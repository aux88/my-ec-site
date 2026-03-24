'use client'
import ProductCard from "@/app/components/ProductCard/ProductCard";
import Link from "next/link";
import { Product } from "../types/Product";
import styles from "./page.module.css";
import { mockProducts } from "@/app/lib/mock/products";
import { CategoryFilter } from "../components/Filter/CategoryFilter";
import FilterContext from "@/app/context/FilterContext";
import { useContext } from "react";

export default function ProductsPage() {

    // const res = await fetch(
    // `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    // { cache: "no-store" }
    // );
    // const products: Product[] = await res.json();

    // 仮データ(本番ではAPIやDBなどから取得)
    const products: Product[] = [...mockProducts];

    const context = useContext(FilterContext);

    if (!context) return null;

    const { category } = context;

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h2>すべての商品</h2>
                <p>{products.length}件の商品が見つかりました</p>
                <div className={styles.filter}><CategoryFilter/></div>
                <ul className={styles.grid}>
                    {products.map((item) => 
                        {
                            console.log("category=" + category);
                            if(category==="all"){
                                return <li className={styles.item} key={item.id}>
                                    <Link href={`/products/${item.id}`}><ProductCard product={item}/></Link></li>
                            }
                            return item.category===category && <li className={styles.item} key={item.id}>
                                    <Link href={`/products/${item.id}`}><ProductCard product={item}/></Link></li>
                        }
                    )}
                </ul>
            </div>
        </div>
    );
}