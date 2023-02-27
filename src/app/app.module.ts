import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent }   from './app.component';
import { ProductserviceService } from './service/productservice.service';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@angular/router';
import {FileUploadModule} from 'primeng/fileupload';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {DividerModule} from 'primeng/divider';
import {AccordionModule} from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';
import {ListboxModule} from 'primeng/listbox';
import {InputNumberModule} from 'primeng/inputnumber';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import {TooltipModule} from 'primeng/tooltip';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import {StyleClassModule} from 'primeng/styleclass';
import {MessagesModule} from 'primeng/messages';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DockModule} from 'primeng/dock';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TreeModule } from 'primeng/tree';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ConfirmationService, MessageService } from "primeng/api";
import {MessageModule} from 'primeng/message';
import { OrderComponent } from './order/order.component';
import { MenubarModule } from 'primeng/menubar';
import { ContactusComponent } from './contactus/contactus.component';
import { MessageComponent } from './message/message.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileComponent } from './profile/profile.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { HeaderComponent } from './_layout/Web-Header/header.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ProductComponent } from './product/product.component';
import {PasswordModule} from 'primeng/password';

import { CarouselComponent } from './carousel/carousel.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { SocialComponent } from './social/social.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NeweletterComponent } from './neweletter/neweletter.component';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { AdminComponent } from './Auth/admin/admin.component';
import { AdminpanelComponent } from './Auth/admin/adminpanel/adminpanel.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { WebLayoutComponent } from './_layout/web-layout/web-layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { DataTableComponent } from './Auth/admin/data-table/data-table.component';
import { AddCategoryComponent } from './Auth/admin/add-category/add-category.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    CartComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    OrderComponent,
    ContactusComponent,
    MessageComponent,
    OrderHistoryComponent,
    ProfileComponent,
    HeaderComponent,
    TopbarComponent,
    FooterComponent,
    ContactFormComponent,
    ProductComponent,
    CarouselComponent,
    SocialComponent,
    AboutUsComponent,
    NeweletterComponent,
    ProductDiscountComponent,
    AdminComponent,
    AdminpanelComponent,
    WebLayoutComponent,
    AdminLayoutComponent,
    DataTableComponent,
    AddCategoryComponent,
   
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    TabViewModule,
    TreeModule,
    FileUploadModule,
    ConfirmPopupModule,
    PasswordModule,
    TerminalModule,
    StepsModule,
    SpeedDialModule,
    MenubarModule,
    TableModule,
    RadioButtonModule,
    DockModule,
    ToolbarModule,
    ProgressBarModule,
    ToastModule,
    GalleriaModule,
    TooltipModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    InputTextareaModule,
    CarouselModule,
    StyleClassModule,
    ListboxModule,
    SliderModule,
    ReactiveFormsModule,
    BrowserModule,
    InputNumberModule,
    AccordionModule,
    FormsModule,
    CheckboxModule,
    BadgeModule,
    ConfirmDialogModule,
    DividerModule,
    SidebarModule,
    DataViewModule,
    ScrollTopModule,
    BrowserAnimationsModule,
    DropdownModule,
    PanelModule,
    InputTextModule,
    RatingModule,
    ButtonModule,
    RippleModule,
    RouterModule.forRoot([
      {path:'',component: AppComponent}
		]),
    AppRoutingModule,
    DialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }) 
,
    RouterModule.forRoot([
      { path: 'products/:productId', component: HomeComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  providers: [ProductserviceService,ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation