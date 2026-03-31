"use client";
import { createContext, useState, ReactNode } from "react";
import { Product } from "@/types/Product";

type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextValue = {
    cartItems: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    incrementItem: (productId: string) => void;
    decrementItem: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                if (existing.quantity >= existing.product.stock) { 
                    return prev;
                }else{
                    return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    );
                }
            }
            if (product.stock <= 0){
                return prev;
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeItem = (productId: string) => {
        setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
        );
    };

    const incrementItem = (productId: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? {...item, quantity: item.quantity < item.product.stock
                        ? item.quantity + 1 : item.quantity }
                    : item
            )
        );
    };

    const decrementItem = (productId: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, incrementItem, decrementItem}}>
        {children}
        </CartContext.Provider>
    );
}

export default CartContext;