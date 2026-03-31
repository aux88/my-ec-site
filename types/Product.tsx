import { Category } from "./Category";
export interface Product  {
    id : string;
    title : string;
    price : number;
    category: Category;
    rate?: number;
    stock: number;
    description: string;
    imageUrl: string;
    publishedAt: string;
}