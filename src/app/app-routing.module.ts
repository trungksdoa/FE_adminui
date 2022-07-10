import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";
import { CategoryManagerComponent } from "./feature/category-manager/category-manager.component";
import { DashboardComponent } from "./feature/dashboard/dashboard.component";
import { LoginFormComponent } from "./feature/login-form/login-form.component";
import { OrderManagerComponent } from "./feature/order-manager/order-manager.component";
import { ProductManagerComponent } from "./feature/product-manager/product-manager.component";
import { UserManagerComponent } from "./feature/user-manager/user-manager.component";
import { LoginGuardService } from "./login-guard.service";





const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'order/manager',
    component: OrderManagerComponent,
    canActivate: [AuthService]
  },
  {
    path: 'user/manager',
    component: UserManagerComponent,
    canActivate: [AuthService]
  },
  { path: 'login', component: LoginFormComponent , canActivate: [LoginGuardService]},
  // {
  //   path: 'banner',
  //   component: BannerManagerComponent,
  //   canActivate: [AuthService]
  // },
  {
    path: 'product',
    component: ProductManagerComponent,
    canActivate: [AuthService]
  },
  {
    path: 'category',
    component: CategoryManagerComponent,
    canActivate: [AuthService]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
