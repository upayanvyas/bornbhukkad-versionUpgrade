import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { VendorComponent } from './vendor-add/vendor-add.component';
import { VendorslistComponent } from './vendorslist/vendorslist.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ReportComponent } from './report/report.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgGridModule } from 'ag-grid-angular';
import { ItemListComponent } from './item-add/item-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ProductService } from './_services/productservice';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterComponent } from './footer/footer.component';
import { QrcodelistComponent } from './qrcodelist/qrcodelist.component';
import { DisableRightClickDirective } from './_helpers/disable.right.click.directive';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ExcelService } from './_services/excel.service';
import { ReportsService } from './_services/reports.service';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { OrderAlertComponent } from './order-alert/order-alert.component';
@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, HomeComponent, BoardAdminComponent, BoardUserComponent, BoardModeratorComponent, ProfileComponent,
    VendorComponent, VendorslistComponent, OrderdetailsComponent, ReportComponent, ItemListComponent, ItemdetailsComponent, FooterComponent, QrcodelistComponent,
    DisableRightClickDirective,
    BankdetailsComponent,
    OrderAlertComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, GooglePlaceModule, AgGridModule, BrowserAnimationsModule,
    GridModule, TableModule, CalendarModule, SliderModule, DialogModule, MultiSelectModule, ContextMenuModule, DropdownModule,
    ButtonModule, ToastModule, InputTextModule, ProgressBarModule, HttpClientModule, FileUploadModule, ToolbarModule, RatingModule,
    RadioButtonModule, InputNumberModule, ConfirmDialogModule, InputTextareaModule, AccordionModule, InputMaskModule, QRCodeModule,
    NgxSpinnerModule, MomentModule, ToggleButtonModule, ChartModule, TabViewModule, PanelModule, NgIdleKeepaliveModule.forRoot(), ModalModule.forRoot()
  ],
  providers: [authInterceptorProviders, ProductService, MessageService, ConfirmationService,
    PrimeNGConfig, ExcelService, ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
