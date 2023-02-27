import { NgModule, } from '@angular/core';
import { RouterModule, Routes,CanActivate  } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MessageComponent } from './message/message.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileComponent } from './profile/profile.component';

import { HomeComponent } from './home/home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './Auth/admin/admin.component';
import { AdminpanelComponent } from './Auth/admin/adminpanel/adminpanel.component';
import { HeaderComponent } from './_layout/Web-Header/header.component';
import { WebLayoutComponent } from './_layout/web-layout/web-layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { DataTableComponent } from './Auth/admin/data-table/data-table.component';
import { AddCategoryComponent } from './Auth/admin/add-category/add-category.component';
const routes: Routes = [
//Site routes goes here 
{ 
  path: '',
  component:WebLayoutComponent,
  children: [
      {path:'', component: HomeComponent},
      {path:'cart',component:CartComponent},
      {path:'Checkout',component:CheckoutComponent},
      {path:'Contact',component:ContactusComponent},
      {path:'Message',component:MessageComponent},
      {path:'OrderHistory',component:OrderHistoryComponent},
      {path:'Profile',component:ProfileComponent},
      {path:'header',component:HeaderComponent},
      {path:'Aboutus',component:AboutUsComponent},
      {path:'productss',component:ProductComponent},
      {path:'order',component:OrderComponent},
    ]
},

 // App routes goes here here
 { 
  path: 'Admin',
  component: AdminLayoutComponent, 
  children: [
    { path: 'Dashboard', component: DataTableComponent },
    { path: 'addCategory', component: AddCategoryComponent }
  ]
},
{ path: 'AdminLogin', component: AdminComponent },

{
  path: '',
  redirectTo: 'Home',
  pathMatch: 'full'
},

// {
//   path: '',
//   component: HomeComponent,
//   children: [
//     {
//       path: 'products',
//       loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
//     },  
//     // <-- place here others lazy loaded site/public routes
//   ],        
// },


      // otherwise redirect to 404 component
    {
      path:'**', component:NotfoundComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
