import { Component } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
interface Invenstatus {
  name: string,
  code: string
}
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

  products!:Product[];

  status: Product[]=[];

  product!: Product;

  selectedProducts!: Product[];

  submitted: boolean=false;
  statuses!: any[];

  constructor(private productService: ProductserviceService, private messageService: MessageService, private confirmationService: ConfirmationService) {

   }

   ngOnInit() {
    this.productService.getProducts().then(data => {
      this.products = data
    });
    
     this.statuses = [
          {
            label: 'INSTOCK',
            value: 'instock'
          },
          {label: 'LOWSTOCK', value: 'lowstock'},
          {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];
}
openNew() {
  this.product = {...this.product};
  this.submitted = false;
  this.productDialog = true;
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

editProduct(product: Product) {
  this.product = {...product};
  this.productDialog = true;
}

deleteProduct(product: Product) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter(val => val.id !== product.id);
          this.product = {...product};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

saveProduct() {
  this.submitted = true;

  if (this.product.name?.trim()) {
      if (this.product.id) {
          this.products[this.findIndexById(this.product.id)] = this.product;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          this.product.id = this.createId();
          this.product.image = 'product-placeholder.svg';
          this.products.push(this.product);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {...this.product};
  }
}
findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

GetSearchValue($event:any){
return $event.target.value
} 
onBasicUpload(e:any){

}

}