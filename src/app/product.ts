export interface Product {
    qty: number;
    num: number;
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
    cartTotal: number; 
    favouriteTotal: number; 
    Discount?: number; 
}

