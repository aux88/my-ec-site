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
        console.log("カート追加:", product);
        context?.addItem(product);
        console.log("カート追加:", context?.cartItems.length);
    };

    return (
        <button className={styles.addToCartButton} onClick={handleClick}>
            カートに追加
        </button>
    );
};