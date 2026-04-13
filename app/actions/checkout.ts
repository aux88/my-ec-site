"use server";

import { FormData } from "@/components/CustomerInfo/CustomerInfo";
import { CartItem } from "@/context/CartContext";
import { createClient } from '@/utils/supabase/server'
import { getServerSession } from "next-auth";
import { cookies } from 'next/headers'
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function checkout(formData:FormData, cartItems:CartItem[]){

    console.log("server action checkout");
    console.log(formData);
    console.log(cartItems);

    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, message: "ログインされていません" };
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data , error: error1 } = await supabase.from("orders").insert({
        user_id: session.user.id,
    })
    .select("id")
    .single();

    if (error1) {
        console.error("Insert error:", error1);
        return { success: false, message: "注文の保存に失敗しました エラー1" };
    }

    const orderItems = cartItems.map((item) => {
        
        console.log(item);
        return {
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        product_name: item.product.title,
        product_imageURL: item.product.imageUrls[0],
        order_id: data.id,
    }});

    const { error: error2 } = await supabase.from("order_items").insert(orderItems)

    if (error2) {
        console.error("Insert error:", error2);
        return { success: false, message: "注文の保存に失敗しました エラー2" };
    }

    return { success: true, message: null };

}