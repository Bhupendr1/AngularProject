import { Component } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FilterService } from "primeng/api";
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CategoryList } from 'src/app/Category';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
})
export class DataTableComponent {
  productDialog: boolean=false;
  products!:Product[];
  CategoryList!:CategoryList[]
  status: Product[]=[];
  product!: Product;
  selectedProducts!: Product[];
  submitted: boolean=false;
  statuses!: any[];
  imagedata:any;
  data:any;
  cname!:any;
  Productform:any=FormGroup;
  constructor(
    private _Api: ProductserviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private Formbuilder:FormBuilder,
    private filterService: FilterService
    ) {}

    

   ngOnInit() {
    this.Productform = this.Formbuilder.group({
      ProductId: ['0'],
      name: ['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(5),Validators.maxLength(20)]],
      description: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      category: ['',Validators.required],
      price: ['',Validators.required],
      Discount: [''],
      myFile:[''],
      quantity: ['',Validators.required],
    })
    this.loadProduct();
     this.statuses = [
          {
            label: 'INSTOCK',
            value: 'instock'
          },
          {label: 'LOWSTOCK', value: 'lowstock'},
          {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];
}

loadProduct(){
  this._Api.postRequestUrl01('','/EcartAddProduct/GetProduct').subscribe(data => {
    this.products = data
  });
}

GetCategoryList(){
  this._Api.postRequestUrl01('','/EcartCategory/GetAllCategory').subscribe(data => {
    this.CategoryList = data;
  //  console.log(data)
  });
}

get f() {
  return this.Productform.controls;
}

openNewAdd() {
  // this.product = {...this.product};
  this.GetCategoryList()
  this.loadProduct()
  this.productDialog = true;
   this.Productform.controls['ProductId'].setValue(""),
  this.Productform.controls['name'].setValue(""),
  this.Productform.controls['description'].setValue(""),
  this.Productform.controls['price'].setValue(""),
  this.Productform.controls['Discount'].setValue(""),
   this.submitted = false;

 }

editProduct(product:any) {
  this.GetCategoryList()
  this.productDialog = true;
  this.Productform.controls['ProductId'].setValue(product.IID),
  this.Productform.controls['name'].setValue(product.IName),
  this.Productform.controls['description'].setValue(product.Detail),
  this.Productform.controls['price'].setValue(product.Price),
  this.Productform.controls['quantity'].setValue(product.Qnt),
  this.Productform.controls['Discount'].setValue(product.Discount),
  this.Productform.controls['category'].setValue(product.CName),
  this.imagedata=product.Image;
 }

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

onSubmit(){
  debugger
  this.submitted = true;
  if (this.Productform.invalid) {
      return;
  }
  else{
    if (this.Productform.controls["ProductId"].value!=0) {
      debugger
      if(this.data==null || this.data==undefined){
        this.data=this.imagedata;
      }
      if(this.Productform.controls['category'].value.CategoryName!=undefined || this.Productform.controls['category'].value.CategoryName!=null){
        this.cname=this.Productform.controls['category'].value.CategoryName;
      }else{
        this.cname=this.Productform.controls['category'].value;
      }
      let Udata={  
        "IID":this.Productform.controls["ProductId"].value,      
        "CategoryName":this.cname,
        "IName": this.Productform.controls["name"].value,
        "Detail": this.Productform.controls["description"].value,
        "Price": this.Productform.controls["price"].value,
        "Qnt":this.Productform.controls['quantity'].value,
        "Discount":this.Productform.controls['Discount'].value,

        "Image":this.data,
           }
      this._Api.postRequestUrl01(Udata,'EcartItemDetail/UpdateItemProduct').subscribe({
        next: (res) => {
          console.log(res)
        if (res.status = 200) {  
  console.log(res)
          this.loadProduct();
          this.messageService.add({severity:'success', summary: 'Successful', detail: res.Message, life: 3000});      
        }
        this.products = [...this.products];
        this.productDialog = false;
        this.product = {...this.product};
    },
    error: (err) => {
      let errorObj = {
        message: err.message,
        err: err,
        response: err
      }
    }
    })
  }else{
      let rdata={      
        "CategoryName":this.Productform.controls['category'].value.CategoryName,
        "IName": this.Productform.controls["name"].value,
        "Detail": this.Productform.controls["description"].value,
        "Price": this.Productform.controls["price"].value,
        "Qnt":this.Productform.controls['quantity'].value,
        "Discount":this.Productform.controls['Discount'].value,
        "Image":this.data
        }
      this._Api.postRequestUrl01(rdata,'/EcartAddProduct/AddProductItem').subscribe({    
            next: (res) => {
              console.log(res)
            if (res.status = 200) { 
              this.loadProduct();   
              this.messageService.add({severity:'success', summary: 'Successful', detail: res.Message, life: 3000});   
            }
            this.products = [...this.products];
            this.productDialog = false;
            this.product = {...this.product};
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
    }
}
GetSearchValue($event:any){
return $event.target.value
} 
onUpload(event:any){
  let fileReader = new FileReader();
  let byteArray: string | undefined;
  for (let file of event.files) {
   // console.log(file.type)
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        // Will print the base64 here.
       console.log(fileReader.result);
        var ret = fileReader.result?.toString().replace('data:'+file.type+';base64,','');
        byteArray = ret;
    };
  }
    setTimeout(() => {
     this.data=byteArray; 
   }, 1000); 
}

deleteProduct(product: Product) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete '+ product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          let deletData={
            "ItemID":product.IID
             }
          this._Api.postRequestUrl01(deletData,'/EcartAddProduct/DeleteItemDetail').subscribe({
                next: (res) => {
            this.loadProduct();
                  this.messageService.add({severity:'success', summary: 'Successful', detail:  res.Message, life: 3000});

              },error: (err) => {
                let errorObj = {
                  message: err.message,
                  err: err,
                  response: err
                }
              }
          })
      }
  });
}

}



