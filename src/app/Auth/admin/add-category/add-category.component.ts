import { Component } from '@angular/core';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { RowGroupHeader } from 'primeng/table';
import { CategoryList } from 'src/app/Category';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  
  styleUrls: ['./add-category.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  
})
export class AddCategoryComponent {
  productDialog: boolean=false;
  products!:CategoryList[];
  status:CategoryList[]=[];
  product!:CategoryList;
  selectedProducts!: CategoryList[];
  submitted:boolean=false;
  statuses!:any[];
  Categoryform:any=FormGroup;
  constructor(private _Api: ProductserviceService,
     private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private Formbuilder:FormBuilder
      ) {
   }

   ngOnInit() {
    this.Categoryform=this.Formbuilder.group({
      CategoryId: ['0'],
      CName:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(5),Validators.maxLength(20)]],
      CDescription: ['',Validators.required],
       })
    this.loadDataCategory();
     this.statuses = [
          {
            label: 'INSTOCK',
            value: 'instock'
          },
          {label: 'LOWSTOCK', value: 'lowstock'},
          {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];
}

loadDataCategory(){
  this._Api.postRequestUrl01('','EcartCategory/GetAllCategory').subscribe(data => {
    this.products = data
  });
}

openNewAdd() {
  this.Categoryform.controls['CategoryId'].setValue(""),
  this.Categoryform.controls['CName'].setValue(""),
  this.Categoryform.controls['CDescription'].setValue("")
   this.submitted = false;
   this.productDialog = true;
 }

editProduct(product: CategoryList) {
  this.Categoryform.controls['CategoryId'].setValue(product.CategoryID),
  this.productDialog = true;
  this.Categoryform.controls['CName'].setValue(product.CategoryName),
  this.Categoryform.controls['CDescription'].setValue(product.Description)
}

deleteProduct(product: CategoryList) {

  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.CategoryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        debugger
          let deletData={
            "CategoryID":product.CategoryID
          }
          this._Api.postRequestUrl01(deletData,'EcartCategory/DeleteCategory').subscribe({
                next: (res) => {
            this.loadDataCategory();
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

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}
get f() {
  return this.Categoryform.controls;
}

onSubmit(){
  debugger
this.submitted = true;
if (this.Categoryform.invalid) {
    return;
}
else{
  if (this.Categoryform.controls['CategoryId'].value!=0) {
    let Udata={        
      "CategoryName": this.Categoryform.controls["CName"].value,
      "Description": this.Categoryform.controls["CDescription"].value,
      "CategoryID":this.Categoryform.controls['CategoryId'].value
    }
    this._Api.postRequestUrl01(Udata,'EcartCategory/UpdateCategory').subscribe({
      next: (res) => {
        console.log(res)
      if (res.status = 200) {  
        this.loadDataCategory();
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
  else{
    let rdata={        
      "CategoryName": this.Categoryform.controls["CName"].value,
      "Description": this.Categoryform.controls["CDescription"].value,
    }
    this._Api.postRequestUrl01(rdata,'EcartCategory/AddCategory').subscribe({
          next: (res) => {
            console.log(res)
          if (res.status = 200) { 
            this.loadDataCategory();   
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
onBasicUpload(e:any){

}

}