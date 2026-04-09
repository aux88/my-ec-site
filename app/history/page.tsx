import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./page.module.css";


export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyMessage}>
          購入履歴を表示するにはログインしてください。
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // ordersテーブルから、現在のユーザーの購入履歴を取得
  // 外部キー結合で商品の詳細情報（タイトル、価格、画像）も取得
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      order_items (
        id,
        product_name,
        product_imageURL,
        quantity,
        price
        )
    `)
    .eq("user_email", session.user?.email) // emailを外部キーとして使っている想定
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching history:", error);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>購入履歴</h2>

      <div className={styles.historyContent}>
        <div className={styles.itemsSection}>
          {!orders || orders.length === 0 ? (
            <div className={styles.emptyMessage}>
              購入履歴がありません。
            </div>
          ) : (
            orders.map((order) => {
              const purchaseDate = new Date(order.created_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              // 合計金額（order単位）
              const totalAmount = order.order_items.reduce(
                    (sum: number, item: any) => sum + item.price * item.quantity,
                    0
              );
              return (
                <div key={order.id} className={styles.orderBlock}>
                {/* 注文ヘッダー */}
                <div className={styles.orderHeader}>
                  <div>購入日時: {purchaseDate}</div>
                  <div>合計: ¥{totalAmount.toLocaleString()}</div>
                </div>

                {/* 商品一覧 */}
                {order.order_items.map((item: any) => (
                  <div key={item.id} className={styles.historyItem}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.product_imageURL}
                        alt={item.product_name}
                        width={100}
                        height={100}
                        className={styles.itemImage}
                      />
                    </div>

                    <div className={styles.itemInfo}>
                      <div className={styles.row1}>
                        <span className={styles.itemTitle}>
                          {item.product_name}
                        </span>
                        <span className={styles.itemTotalPrice}>
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <div className={styles.itemUnitPrice}>
                        単価: ¥{item.price.toLocaleString()}
                      </div>

                      <div className={styles.quantity}>
                        数量: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
            })
          )}
        </div>
      </div>
    </div>
  );
}
