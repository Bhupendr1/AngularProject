
import { HttpClient, HttpParams,HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map,ReplaySubject,BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../product'; 
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  baseUrl01 = environment.baseUrl01;
  postRequestUrl01(data: any, ACTION: string)
{
  ACTION = `${this.baseUrl01}` + ACTION;
  return this.http.post<any>(ACTION, data);
} 



  public subject = new Subject<any>();
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
 ProductCount=new BehaviorSubject(0)
 cart:Product[]=[];
 cartItemCount = new BehaviorSubject(0);
 private cartCount = new ReplaySubject<number>(1);
 cartCount$ = this.cartCount.asObservable();
 setCartCount(count: number) {
  // encapsulate with logic to set local storage
  localStorage.setItem("cart_count", JSON.stringify(count));
  this.cartCount.next(count);
}
 cartItemCountItem=0;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  constructor(private http: HttpClient) { }
  productNames: string[] = [
    "Bamboo Watch", 
    "Black Watch", 
    "Blue Band", 
    "Blue T-Shirt", 
    "Bracelet", 
    "Brown Purse", 
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
];

getProducts() {
  return this.http.get<any>('assets/i18n/products.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}
getProductsSmall() {
  return this.http.get<any>('assets/products-small.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}


getProductsWithOrdersSmall() {
  return this.http.get<any>('assets/products-orders-small.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}

generatePrduct(): Product {
  const product: Product =  {
    id: this.generateId(),
    name: this.generateName(),
    description: "Product Description",
    price: this.generatePrice(),
    quantity: this.generateQuantity(),
    category: "Product Category",
    inventoryStatus: this.generateStatus(),
    rating: this.generateRating(),
    qty: 0,
    num: 0,
    cartTotal: 0,
    favouriteTotal: 0
  };

  product.image = product.name?.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
  return product;
}

generateId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
}

generateName() {
  return this.productNames[Math.floor(Math.random() * Math.floor(30))];
}

generatePrice() {
  return Math.floor(Math.random() * Math.floor(299)+1);
}

generateQuantity() {
  return Math.floor(Math.random() * Math.floor(75)+1);
}

generateStatus() {
  return this.status[Math.floor(Math.random() * Math.floor(3))];
}

generateRating() {
  return Math.floor(Math.random() * Math.floor(5)+1);
}
// getSingleProducts(id:any) {
//   return this.http.get<any>('assets/i18n/products.json')
//   .toPromise()
//   .then(res => <Product[]>res.data.id)
//   .then(data => { return data; });
// }
productList=new BehaviorSubject<any>([]);
cartDataList:Product[] = [];
getProductData(){
  return this.productList.asObservable();
}


setproduct(product:any){
  this.cartDataList.push(...product);
  this.productList.next(product)
}
addToCart(product:any){
  this.cartDataList.push(product);
  this.productList.next(this.cartDataList);
  this.getTotalAmount();
}
getTotalAmount(){
  let grandTotal =0;
  this.cartDataList.map((a:any)=>{
    grandTotal += a.total;
  })
  return grandTotal
}
removeCartData(product:any){
  this.cartDataList.map((a:any,index:any)=>{
    if(product.id===a.id){
      this.cartDataList.splice(index,1)
    }
  })
}
removeAllCart(){
  this.cartDataList=[]
  this.productList.next(this.cartDataList)
} 

getCart(){

  return this.cart;
}

addProduct(product:any) {
  let added = false;

  for (let p of this.cart) {
    if (p.id === product.id) {
      p.qty += 1;
      added = true;
      break;
    }
  }
  if (!added) {
    product.qty = 1;
    this.cart.push(product);
  }

// this.cartItemCount.value + 1
// this.cartItemCount.next(this.cartItemCount.value + 1);

 
}
// getCartItemCount(){
//   //return this.cartItemCount.value;
//   this.getCartList().subscribe(d=>{
//     this.cartItemCountItem=d.length;
    
//   })
  
//  return this.cartItemCountItem;
// }

removeProduct(product:any) {

  for (const [index, item] of this.cart.entries()) {
    if (item.id === product.id) {
      this.cartItemCount.next(this.cartItemCount.value - item.qty);
      this.cart.splice(index, 1);
    }
  }
}

decreaseProduct(product:any) {

  for (const [index, item] of this.cart.entries()) {
    if (item.id === product.id) {
      item.qty -= 1;
      if (item.qty === 0) {
        this.cart.splice(index, 1);
      }
    }
  }
  this.cartItemCount.next(this.cartItemCount.value - 1);
}
postAddCart(data:any){

  return this.http.post<any>("http://localhost:3000/Cart",data).pipe(map((res:any)=>{
    return res;
  }))
}



addProductlist(product:any) {
  let added = false;

  for (let p of this.cart) {
    if (p.id === product.id) {
      p.qty += 1;
      added = true;
      break;
    }
  }
  if (!added) {
    product.qty = 1;
    this.cart.push(product);
  }

// this.cartItemCount.value + 1
 this.cartItemCount.next(this.cartItemCount.value + 1);

 
}


getCartList(){
  return this.http.get<any>("http://localhost:3000/Cart/").pipe(map((res:any)=>{
    return res;
  }))

}

UpadateCart(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/Cart/"+id,data).pipe(map((res:any)=>{
    return res;
  }))
} 
deleteCart(id:number){
  return this.http.delete<any>("http://localhost:3000/Cart/"+id).pipe(map((res:any)=>{
    return res;
  }))
}
deleteCartAll(){
  return this.http.delete("http://localhost:3000/Cart/").pipe(map((res:any)=>{
    return res;
  }))
}

//order 
postAddhistory(data:any){

  return this.http.post<any>("http://localhost:3000/orderHistory/",data).pipe(map((res:any)=>{
    return res;
  }))
}
  gethistoryList(){
    return this.http.get<any>("http://localhost:3000/orderHistory/").pipe(map((res:any)=>{
      return res;
    }))
  
  }
  
  Upadatehistory(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/orderHistory/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  } 
  deletehistory(id:number){
    return this.http.delete<any>("http://localhost:3000/orderHistory/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  deletehistoryAll(){
    return this.http.delete<any>("http://localhost:3000/orderHistory/").pipe(map((res:any)=>{
      return res;
    }))
  }
  

}
