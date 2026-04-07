"use client"
import { useContext, useState } from "react";
import styles from "./CategoryFilter.module.css";
import {CATEGORIES} from "@/types/Category"
import { Category } from "@/types/Category";
import FilterContext from "@/context/FilterContext";

export const CategoryFilter = () => {

    const context = useContext(FilterContext);

    if (!context) return null;

    const { category, selectCategory } = context;

    return (
        <ul className={styles.categoryList}>
        {Object.entries(CATEGORIES).map(([key, label]) => (
            <li key={key} className={`${styles.categoryItem} ${category===key && styles.categoryItemActive}`} onClick={()=>(selectCategory(key as Category))}>
                {label}
            </li>
        ))}
        </ul>
    );
}