"use client";

import { useContext } from "react";
import CartContext from "@/context/CartContext";
import styles from "./page.module.css";
import { CustomerInfo } from "@/components/CustomerInfo/CustomerInfo";
import { SessionProvider } from "next-auth/react";

export default function CartPage() {
    const context = useContext(CartContext);

    if (!context) return null;

    const { cartItems } = context;

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shippingFee = 0;
    const totalAmount = subtotal + shippingFee;

    if(cartItems.length === 0 ) return (
        <div className={styles.container}>
            <div className={styles.title}>
            カートに商品が入っていません。
            </div>
        </div>
    ); 
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>注文情報の入力</h2>
            <div className={styles.checkoutContent}>
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>お客様情報</h3>
                    <SessionProvider>
                        <CustomerInfo />
                    </SessionProvider>
                </div>

                <div className={styles.confirmSection}>
                    <h3 className={styles.sectionTitle}>注文情報の確認</h3>
                    
                    {cartItems.map((item)=>(
                        <div key={item.product.id} className={styles.summaryByProduct}>
                            <div>
                                <p className={styles.productName}>{item.product.title}</p>
                                <p className={styles.amountByProduct}>{`${item.quantity}点 × ¥${item.product.price.toLocaleString()}`}</p>
                            </div>
                            <p className={styles.totalByProduct}>{`¥${(item.quantity * item.product.price).toLocaleString()}`}</p>
                        </div>
                    ))}

                    <hr className={styles.dividerGray} />
                    
                    <div className={styles.summaryRow}>
                        <span>小計</span>
                        <span>¥{subtotal.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>送料</span>
                        <span>¥{shippingFee.toLocaleString()}</span>
                    </div>
                    
                    <hr className={styles.dividerBlack} />
                    
                    <div className={styles.totalRow}>
                        <span>合計</span>
                        <span>¥{totalAmount.toLocaleString()}</span>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
