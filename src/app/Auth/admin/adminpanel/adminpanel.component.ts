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
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent {


  constructor(private productService: ProductserviceService, private messageService: MessageService, private confirmationService: ConfirmationService) {

   }

  ngOnInit() {


  
}
}