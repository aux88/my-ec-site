import { Product } from "@/types/Product"
import { mockProducts } from "@/lib/mock/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


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

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.from('products').select(`
        *,
        categories (name) ,
        product_images (image_url)
      `).eq('id', id) 
      .single(); ;
    
    //const product = mockProducts.find((product) => product.id === id );

    const product: Product | undefined = {
        id: data.id,
        title: data.title,
        price: data.price,
        category: data.categories.name,
        rate: data.average_rate,
        stock: data.stock,
        description: data.description,
        publishedAt: data.published_at,
        imageUrls: data.product_images.map((img: any) => img.image_url),
      };

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