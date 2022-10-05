import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {ForgotPasswordComponent} from "../../pages/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "../../pages/verify-email/verify-email.component";

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgot-password',       component: ForgotPasswordComponent },
    { path: 'verify-email',       component: VerifyEmailComponent }
];
