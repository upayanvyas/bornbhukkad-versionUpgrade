import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { VendorComponent } from './vendor-add/vendor-add.component';
import { VendorslistComponent } from './vendorslist/vendorslist.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ReportComponent } from './report/report.component';
import { ItemListComponent } from './item-add/item-add.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { QrcodelistComponent } from './qrcodelist/qrcodelist.component';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'addVendor', component: VendorComponent },
  { path: 'addItem', component: ItemListComponent },
  { path: 'vendorList', component: VendorslistComponent },
  { path: 'orderDetails', component: OrderdetailsComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'itemDetails', component: ItemdetailsComponent },
  { path: 'generateQRCodes', component: QrcodelistComponent },
  { path: 'bankDetails', component: BankdetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
