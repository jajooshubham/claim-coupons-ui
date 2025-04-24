export interface PlantscareProduct {
    productId: number;
    productName: string;
    mrp: number;
}

export class PlantscareProducts extends Array<PlantscareProduct> {}
