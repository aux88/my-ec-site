import { Product } from "@/types/Product";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { ProductList } from "@/components/ProductList/ProductList";

export default async function ProductsPage() {

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.from('products').select(`
        *,
        categories (label) ,
        product_images (image_url)
      `);

    const products: Product[] | undefined = data?.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.categories.label,
        rate: item.average_rate,
        stock: item.stock,
        description: item.description,
        publishedAt: item.published_at,
        imageUrls: item.product_images.map((img: any) => img.image_url),
      }));

    const items: Product[] = [...(products ?? [])];

    return (
        <ProductList products={items} />
    );

}