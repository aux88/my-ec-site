'use client'
import FilterContext from "@/context/FilterContext";
import { CATEGORIES } from "@/types/Category";
import { Product } from "@/types/Product";
import { useContext } from "react";
import { CategoryFilter } from "../Filter/CategoryFilter";
import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";

interface ProductListProps {
    products : Product[];
}

export const ProductList = ( { products } : ProductListProps) => {

    const context = useContext(FilterContext);

    if (!context) return null;

    const { category } = context;

    // itemsを新着順に並べる
    const sorted_products = [...products]
    .sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h2>{category === "all" ? "すべての商品" : CATEGORIES[category]}</h2>
                <p>{category === "all" ? products.length : products.filter((item) => item.category === category).length}件の商品が見つかりました</p>
                <div className={styles.filter}><CategoryFilter/></div>
                <ul className={styles.grid}>
                    {sorted_products.map((item) => 
                        {
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
