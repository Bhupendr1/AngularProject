import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductserviceService } from '../service/productservice.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig
} from "primeng/api";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MessageService]
})
export class CheckoutComponent {
  sessionVal:any[]=[];
  price:any=0;
  discount:any=12;
  totalprice:any=0;
  empselfData: any = [];
  typeExpress: string[] = ['Component 1', 'Component 2', 'Component 3'];
  checkoutform !: FormGroup;  
     constructor(
      private formbuilder: FormBuilder,
      private router:Router,
      private Productservice:ProductserviceService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private primengConfig: PrimeNGConfig
    ) {}
  ngOnInit():void{
   this.checkoutform = this.formbuilder.group({
      Firstname:[''],
      lastname:[''],
      email:[''],
      address:[''],
      City:[''],
      Phone:[''],
      PostalCode:[''],
      textarea:[''],
      CardNumber:[''],
      Promocode:[''],
      Expiry:[''],
      CVC: [''],
      CardholderName:[''],
      radioBtn:['Cash-On-Delivery']
    });
    this.price =sessionStorage.getItem('totalPrice');
    this.sessionVal =  JSON.parse(sessionStorage.getItem('itemsPerPage')!);
    this.cartlist();
    this.totalprice=(this.price-(this.price*this.discount)/100).toFixed(2);
  }
   cart:any=[]
  cartlist(){
    
    this.Productservice.getCartList().subscribe( res =>{
      this.cart=res;
    })
  }

  selectedItem :any = [];
  setItem(item:any){
    this.selectedItem = item
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'info', summary:'Are you sure?', detail:'Confirm to proceed'});
}
onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}
  submitted = false;

  deleteitem(id:any){
    this.Productservice.deleteCart(id).subscribe(res=>{
    })
  }
  confirm(event:Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
          this.submitted = true;
          if (this.checkoutform.invalid) {
          return
      }else{
          let rdata=  {        
            "Firstname": this.checkoutform.controls["Firstname"].value,
            "lastname": this.checkoutform.controls["lastname"].value,
            "email": this.checkoutform.controls["email"].value,
            "address": this.checkoutform.controls["address"].value,
            "City": this.checkoutform.controls["City"].value,
            "Phone": this.checkoutform.controls["Phone"].value,
            "textarea": this.checkoutform.controls["textarea"].value,
            "PostalCode": this.checkoutform.controls["PostalCode"].value,
            "CardNumber": this.checkoutform.controls["CardNumber"].value,
            "Expiry": this.checkoutform.controls["Expiry"].value,
            "CVC": this.checkoutform.controls["CVC"].value,
            "CardholderName":this.checkoutform.controls["CardholderName"].value,
            "radioBtn":this.checkoutform.controls["radioBtn"].value,
            "Promocode":this.checkoutform.controls["Promocode"].value,
            "totalprice": this.totalprice,
            "cart": this.cart,
            "date": Date()  
          }
          this.Productservice.postAddhistory(rdata).subscribe({
            
            next: (res) => {
             
              if (res.status = 200) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have accepted"
                });
                this.cart.forEach((element: { id: any; }) => {
                 this.deleteitem(element.id);
                 localStorage.setItem("orderplace",JSON.stringify(rdata));
                 this.Productservice.ProductCount.next(res.length)
                 this.router.navigateByUrl('/order');
                //  this.Productservice.ProductCount.unsubscribe();
                 });
                //  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
      
              }
            },
            error: (err) => {
              let errorObj = {
                message: err.message,
                err: err,
                response: err
              }
            }
            })
          }
        },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }
  getCartItemCount(){
    this.Productservice.getCartList().subscribe(d=>{
    this.Productservice.ProductCount.next(d.length)
    })
    }
}

