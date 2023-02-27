import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { Product } from '../product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers:[MessageService]
})
export class CartComponent {
  checkoutform !: FormGroup;  
  allProduct:number=0;
  productvalue:number=0;
  quantitydata:any;
  quantitysingle: any=[];
  constructor(private Productservice: ProductserviceService,private formBuilder: FormBuilder,private route:Router, private messageService:MessageService) { }
  cart:any=[]
  checkoutForm = this.formBuilder.group({
    Price:['',Validators.required],
  });
  ngOnInit():void{
   this.loadCart();
   this.getCartItemCount();
  }
  loadCart(){
    this.Productservice.getCartList().subscribe(res=>{
      this.cart=res;
      })
  }
  onSubmit(): void {
    console.warn('Your order has been submitted', this.checkoutForm.value);
  }
getTotal() {
  return this.cart.reduce((i: number, j:{ price: number; qty: number;}) => i + j.price * j.qty, 0);
}
removeCartItem(id:any) {
  this.Productservice.deleteCart(id).subscribe(res=>{
    this.loadCart();
    this.getCartItemCount();
  })
}

decreaseCartItem(product:Product) {
product.qty=product.qty-1;

this.add(product,product.id); 
this.getCartItemCount();
}

increaseCartItem(product:Product) {
  debugger
  this.getSingalProdtect(product.id);
    setTimeout(()=>{
    if(product.qty >= this.quantitysingle){
      this.messageService.add({key:'st',severity:'error', summary: 'Warn', detail: 'Product limit is over'});
  }else{
    product.qty=product.qty+1;
    this.add(product,product.id); 
  }
  },100);
  
}

getSingalProdtect(id:any){
this.Productservice.getProducts().then((data:any)=>{
    this.quantitydata=data
  for (let item of this.quantitydata) {
      if (item.id === id) {
        
        this.quantitysingle=item.quantity;
        break;
      }
    }

})

}

add(product:any,id:any){
  this.Productservice.UpadateCart(product,id).subscribe( res =>{
  })
}
checkOut(){
console.log(this.getTotal());
  sessionStorage.setItem('totalPrice', this.getTotal());
  sessionStorage.setItem('itemsPerPage', JSON.stringify(this.cart));
  this.route.navigateByUrl('/Checkout')
}
getCartItemCount(){
  this.Productservice.getCartList().subscribe(d=>{
  this.Productservice.ProductCount.next(d.length)
  })
}
}