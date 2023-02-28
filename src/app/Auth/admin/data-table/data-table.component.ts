import { Component } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup,Validator } from '@angular/forms';
import { CategoryList } from 'src/app/Category';
interface Invenstatus {
  name: string,
  code: string
}
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
  Productform!:FormGroup;
  constructor(
    private _Api: ProductserviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb:FormBuilder
    ) {}

    

   ngOnInit() {
       this.Productform=this.fb.group({
      name: [''],
      description: [''],
      inventoryStatus: [''],
      category: [''],
      price: [''],
      Discount: [''],
      myFile:[''],
      quantity: [''],
      Id: ['0']
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
  this._Api.postRequestUrl01('','EcartProduct/GetProduct').subscribe(data => {
    this.products = data
    console.log(data)
  });
}

GetCategoryList(){
  this._Api.postRequestUrl01('','/EcartCategory/GetAllCategory').subscribe(data => {
    this.CategoryList = data;
  });
}



openNewAdd() {
  // this.product = {...this.product};
  this.GetCategoryList()
  this.loadProduct()
  this.productDialog = true;
  this.Productform.controls['Id'].setValue(""),
  this.Productform.controls['name'].setValue(""),
  this.Productform.controls['description'].setValue(""),
  this.Productform.controls['inventoryStatus'].setValue(""),
  this.Productform.controls['price'].setValue(""),
  this.Productform.controls['Discount'].setValue(""),
  this.Productform.controls['myFile'].setValue("")
   this.submitted = false;
   this.productDialog = true;
 }

editProduct(product: Product) {
  this.productDialog = true;
  this.Productform.controls['Id'].setValue(product.id),
  this.Productform.controls['name'].setValue(product.name),
  this.Productform.controls['description'].setValue(product.description),
  this.Productform.controls['inventoryStatus'].setValue(product.inventoryStatus),
  this.Productform.controls['price'].setValue(product.price),
  this.Productform.controls['Discount'].setValue(product.Discount),
  this.Productform.controls['myFile'].setValue("")
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter(val => !this.selectedProducts.includes(val));
          this.selectedProducts = null as any;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}
deleteProduct(product: Product) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // this.products = this.products.filter(val => val.CategoryID !== product.CategoryID);
          // this.product = {...product};
          let deletData={
            "CategoryID":product.id
          }
          this._Api.postRequestUrl01(deletData,'EartProduct/DeleteProduct').subscribe({
                next: (res) => {
          // alert(res.Message)
            this.loadProduct();
                  this.messageService.add({severity:'success', summary: 'Successful', detail:  res.Message, life: 3000});
                  
              }, error: (err) => {
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


hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

saveProduct(){
  this.submitted = true;

  if (this.Productform.invalid) {
      return;
  }
  else{
    if (this.Productform.controls["id"].value!=0) {
      debugger
      let Udata={        
        "CategoryID":this.Productform.controls["id"].value,
        "ProductName": this.Productform.controls["name"].value,
        "Description": this.Productform.controls["description"].value,
        "ImageParm":this.Productform.controls['myFile'].value,
        "inventoryStatus": this.Productform.controls["inventoryStatus"].value,
        "price": this.Productform.controls["price"].value,
        "Discount":this.Productform.controls['Discount'].value,
      }
      this._Api.postRequestUrl01(Udata,'EcartProduct/UpdateProduct').subscribe({
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
  }else{
      let rdata={        
        "CategoryID":this.Productform.controls['id'].value,
        "ProductName": this.Productform.controls["name"].value,
        "Description": this.Productform.controls["description"].value,
        "ImageParm":this.Productform.controls['myFile'].value,
        "inventoryStatus": this.Productform.controls["inventoryStatus"].value,
        "price": this.Productform.controls["price"].value,
        "Discount":this.Productform.controls['Discount'].value,
      }
      this._Api.postRequestUrl01(rdata,'/EcartProduct/AddProduct').subscribe({     
        
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
  get f() {
    return this.Productform.controls;
  }
  

GetSearchValue($event:any){
return $event.target.value
} 
uploadedImage!:File;
uploadFile(event:any){
  let fileReader = new FileReader();
  fileReader.readAsBinaryString(event.file);
  console.log(fileReader.result);
}

ImageFun(Image:any){
var base64 = btoa(String.fromCharCode(Image));
var url = 'data:' + base64;
return url;
}
}
