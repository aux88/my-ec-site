"use client";
import { useContext } from "react";
import FilterContext from "@/context/FilterContext"
import styles from "./Button.module.css";
import Link from "next/link";
import { Category } from "@/types/Category";


export const ViewAllProductButton = () => {

    const context = useContext(FilterContext);

    if (!context) return null;

    const { selectCategory } = context;

    return (
        <Link href="/products" className={styles.product__viewAllButton} onClick={()=>selectCategory("all" as Category)}>すべての商品を見る</Link>
    );
};

