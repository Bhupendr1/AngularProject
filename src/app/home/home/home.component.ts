import { Component,ViewChild,Input,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product } from 'src/app/product';
import { Router } from '@angular/router';
import {Message} from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { PrimeNGConfig } from 'primeng/api';
import { ProductComponent } from 'src/app/product/product.component';
export interface Tutorial {
  title?: String;
  image?: String;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService,ConfirmationService],
})

export class HomeComponent  implements OnInit{
  constructor(
    private messageService: MessageService,
    public translate: TranslateService,
    private productService: ProductserviceService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
     ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
}
}
