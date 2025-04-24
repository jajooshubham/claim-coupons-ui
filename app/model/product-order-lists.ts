export interface ProductOrderList {
    id: number;
    productId: number;
    quantity: number;
}

export class ProductOrderLists extends Array<ProductOrderList> {}
