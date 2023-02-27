import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/service/productservice.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
   rndInt = "ORD"+Math.floor(Math.random() * 11088888);
  orderHistory:any=[];
  products:any=[];
  price:any
  discount:any=12;
  totalprice:any;
  constructor(private Productservice: ProductserviceService,private route:Router) { }
  ngOnInit():void{
    this.loadHistory();
    this.totalprice=(this.price-(this.price*this.discount)/100).toFixed(2);
  }
  loadHistory(){
    if(localStorage.getItem("orderplace")){
      let orderplacedata:any=localStorage.getItem("orderplace");
      this.orderHistory = JSON.parse(orderplacedata);
    }else{
      console.log("not  place  any  items")
    }
    console.table(this.orderHistory)
    // this.Productservice.gethistoryList().subscribe(res=>{
    //   this.orderHistory=res;
    //   // res.forEach( (value:any) => {
    //   //   this.orderHistory=value;
    //   //   value.cart.forEach((data:any) =>{
    //   //     this.product=data;
    //   //   });
        
    //   // });
    //   console.table(this.products);
      
    //    console.table(this.orderHistory);
    // })
    // console.table(this.orderHistory);
  }  
  
}
