import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {ProductsComponent} from "../../pages/products/products.component";
import {CreateProductComponent} from "../../pages/products/create-product/create-product.component";

import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['../login'])) },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    // { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'products',           component: ProductsComponent },
    { path: 'create-product',           component: CreateProductComponent },
    { path: 'edit-product/:id',           component: CreateProductComponent }
];
