export interface Product  {
    id : string;
    title : string;
    price : number;
    category: string;
    rate?: number;
    stock: number;
    description: string;
    imageUrl: string;
}