import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgToastModule } from "ng-angular-popup";
import { BrowserModule } from "@angular/platform-browser";
import { CategoryService } from './api/category/category.service';
import { ProductService } from './api/product/product.service';
import { BannerService } from './api/service/banner_service';
import { CartService } from './api/service/cart.service';
import { CityService } from './api/service/citys.service';
import { OrderService } from './api/service/order.service';
import { UserService } from './api/service/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerManagerComponent } from './feature/banner-manager/banner-manager.component';
import { CategoryManagerComponent } from './feature/category-manager/category-manager.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { LoginFormComponent } from './feature/login-form/login-form.component';
import { OrderDetailComponent } from './feature/order-manager/order-detail/order-detail.component';
import { OrderManagerComponent } from './feature/order-manager/order-manager.component';
import { AddProductComponent } from './feature/product-manager/add-product/add-product.component';
import { ProductManagerComponent } from './feature/product-manager/product-manager.component';
import { SpinnerComponent } from './feature/spinner/spinner.component';
import { UpdateBannerFormComponent } from './feature/update-banner-form/update-banner-form.component';
import { UserManagerComponent } from './feature/user-manager/user-manager.component';
import { LoginGuardService } from './login-guard.service';
import { MaterialExampleModule } from './module/material.module';
import { SharedService, DialogService, ToastsService } from './service';
import { SpinnerService } from './service/spinner.service';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    OrderManagerComponent,
    OrderDetailComponent,
    ProductManagerComponent,
    SidebarComponent,
    DashboardComponent,
    BannerManagerComponent,
    AddProductComponent,
    UpdateBannerFormComponent,
    LoginFormComponent,
    UserManagerComponent,
    CategoryManagerComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    NgToastModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialExampleModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSkeletonLoaderModule,

  ],
  providers: [
    CategoryService,
    ProductService,
    CartService,
    SharedService,
    OrderService,
    UserService,
    CityService,
    BannerService,
    DialogService,
    SpinnerService,
    ToastsService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
