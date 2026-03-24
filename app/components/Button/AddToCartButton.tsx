"use client";
import { useContext } from "react";
import CartContext from "@/app/context/CartContext";
import styles from "./Button.module.css";
import { Product } from "@/app/types/Product";

type Props = {
    product: Product;
};

export const AddToCartButton = ({ product }: Props) => {

    const context = useContext(CartContext)

    const handleClick = () => {
        context?.addItem(product);
    };

    return (
        <button className={styles.addToCartButton} onClick={handleClick}>
            カートに追加
        </button>
    );
};