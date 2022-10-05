import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import {ProductsComponent} from "./pages/products/products.component";
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";

import { ConexionService } from "./services/conexion.service";
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//Toast
import { ToastrModule } from 'ngx-toastr';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
// import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

// @ts-ignore
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AdminLayoutModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ProductsComponent,
    CreateProductComponent,
    VerifyEmailComponent,
    // ForgotPasswordComponent
  ],
  providers: [ConexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
