"use client"
import { useContext } from "react";
import styles from "./CategoryCard.module.css";
import { Category, CATEGORIES } from "@/types/Category";
import FilterContext from "@/context/FilterContext";
import Link from "next/link";
import { setupFsCheck } from "next/dist/server/lib/router-utils/filesystem";

interface CategoryCardProps {
    category: Category;
    backgroundImageUrl: string; 
    description: string;
}

export default function CategoryCard({category, backgroundImageUrl, description }:CategoryCardProps) {

    const context = useContext(FilterContext);

    if (!context) return null;

    const { selectCategory } = context;

    return (
        <Link href={"/products"} onClick={()=>selectCategory(category)}>
            <div className={styles.category__item} style={{backgroundImage: `url(${backgroundImageUrl})`}}>
                <p className={styles.category__name}>{CATEGORIES[category]}</p>
                <p className={styles.category__description}>{description}</p>
            </div>
        </Link>
    );
}