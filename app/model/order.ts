import {Product} from "~/model/products";

export interface Order {
    orderId: number,
    product: Product,
    pointUsed: number,
}

export class Orders extends Array<Order> {}
