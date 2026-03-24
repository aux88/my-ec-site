"use client"
import { useContext, useState } from "react";
import styles from "./CategoryFilter.module.css";
import {CATEGORY_LABELS} from "@/app/types/Category"
import { Category } from "@/app/types/Category";
import FilterContext from "@/app/context/FilterContext";

export const CategoryFilter = () => {

    const context = useContext(FilterContext);

    if (!context) return null;

    const { category, selectCategory } = context;

    return (
        <ul className={styles.categoryList}>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <li key={key} className={`${styles.categoryItem} ${category===key && styles.categoryItemActive}`} onClick={()=>(selectCategory(key as Category))}>
                {label}
            </li>
        ))}
        </ul>
    );
}