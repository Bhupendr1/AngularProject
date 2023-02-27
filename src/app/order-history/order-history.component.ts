import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/service/productservice.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  orderHistory:any=[];
  products:any=[];
  price:any
  discount:any=12;
  totalprice:any;
  city!: string;

  constructor(private Productservice: ProductserviceService,private route:Router) { }
  ngOnInit():void{
    this.loadHistory();
    this.totalprice=this.price-(this.price*this.discount)/100;
  }
  loadHistory(){
    this.Productservice.gethistoryList().subscribe(res=>{
      this.orderHistory=res;
      // res.forEach( (value:any) => {
      //   this.orderHistory=value;
      //   value.cart.forEach((data:any) =>{
      //     this.product=data;
      //   });
        
      // });
      console.table(this.products);
      
       console.table(this.orderHistory);
    })
    // console.table(this.orderHistory);
  }  
}
