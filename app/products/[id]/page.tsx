import { Product } from "@/app/types/Product"
import { mockProducts } from "@/app/lib/mock/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/app/components/ProductDetail/ProductDetail"

type Params = {
    id : string;
};

export default async function ProductDetailPage({ params }: {params: Promise<Params>}) {
    const { id } = await params;
    /*
    const res = await fetch(`https://xxx/products/${id}`, {
        // ISRを設定するなら next: { revalidate: 60 } など
    });

    const product = await res.json();
    */

    const product = mockProducts.find((product) => product.id === id );

    if (!product) {
        notFound();
    }

    return (
        <div>
            <ProductDetail
                product={product}
            />
        </div>
    );
}

// 特定のパスを事前生成したい場合に使用
export async function generateStaticParams() {
    /*
    const res = await fetch("https://xxx/products/");
    const products = await res.json();

    // 事前に生成するidをいくつか決める
    return products.slice(0, 5).map((product: Product) => ({
        id: product.id,
    }));
    */
    return mockProducts.slice(0, 5).map((product: Product) => ({
        id: product.id,
    }));
}