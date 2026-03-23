"use client";

import { useContext } from "react";
import Image from "next/image";
import CartContext from "@/app/context/CartContext";
import styles from "./page.module.css";

export default function CartPage() {
    const context = useContext(CartContext);

    if (!context) return null;

    const { cartItems, incrementItem, decrementItem, removeItem } = context;

    const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shippingFee = 0;
    const totalAmount = subtotal + shippingFee;

    return (
        <div className={styles.container}>
        <h2 className={styles.title}>ショッピングカート</h2>

        <div className={styles.cartContent}>
            <div className={styles.itemsSection}>
            {cartItems.length === 0 ? (
                <div className={styles.emptyMessage}>
                カートに商品が入っていません。
                </div>
            ) : (
                cartItems.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                    <div className={styles.imageWrapper}>
                    <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        width={120}
                        height={120}
                        className={styles.itemImage}
                    />
                    </div>
                    <div className={styles.itemInfo}>
                    <div className={styles.row1}>
                        <h2 className={styles.itemTitle}>{item.product.title}</h2>
                        <span className={styles.itemTotalPrice}>
                        ¥{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                    <div className={styles.row2}>
                        <span className={styles.itemUnitPrice}>
                        ¥{item.product.price.toLocaleString()}
                        </span>
                    </div>
                    <div className={styles.row3}>
                        <span className={styles.stock}>
                        残り{item.product.stock}点
                        </span>
                    </div>
                    <div className={styles.row4}>
                        <div className={styles.quantityControl}>
                        <button
                            className={styles.quantityBtn}
                            onClick={() => decrementItem(item.product.id)}
                        >
                            -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                            className={styles.quantityBtn}
                            onClick={() => incrementItem(item.product.id)}
                        >
                            +
                        </button>
                        </div>
                        <button
                        className={styles.deleteBtn}
                        onClick={() => removeItem(item.product.id)}
                        >
                        削除
                        </button>
                    </div>
                    </div>
                </div>
                ))
            )}
            </div>

            <div className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>注文サマリー</h2>
            <div className={styles.summaryRow}>
                <span>商品数</span>
                <span>{totalItemCount}点</span>
            </div>
            <div className={styles.summaryRow}>
                <span>小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>送料</span>
                <span>¥{shippingFee.toLocaleString()}</span>
            </div>
            
            <hr className={styles.divider} />
            
            <div className={styles.totalRow}>
                <span>合計</span>
                <span>¥{totalAmount.toLocaleString()}</span>
            </div>
            
            <button className={styles.checkoutBtn}>
                レジに進む
            </button>
            </div>
        </div>
        </div>
    );
}
