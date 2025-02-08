export interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    type: string;
    category: string;
    stock: number;
    inStock: boolean;
    imgUrl: string;
}

export class Products extends Array<Product> {}
