import { Routes } from '@angular/router';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

export const routes: Routes = [
    { 
        path:"", 
        redirectTo:'login', 
        pathMatch: 'full'
    },
    { 
        path:"login", 
        loadComponent: () => import('./login/login.component')
            .then((m) => m.LoginComponent)
    },
    { 
        path:"dashboard",
        loadComponent: () => import('./main-layout/main-layout.component')
            .then((m) => m.MainLayoutComponent),
        children: [
        ] 
    },
    {
        path: "leaveRequest/:formData",
        component: LeaveRequestComponent
    },
    {
        path:"leaveRequest",
        loadComponent: () => import('./leave-request/leave-request.component')
            .then((m) => m.LeaveRequestComponent)
    },
    {
        path:"admin/dashboard",
        loadComponent: () => import('./admin-layout/admin-layout.component')
            .then((m) => m.AdminLayoutComponent)
    },
    {
        path:"admin/addUser",
        loadComponent: () => import('./admin-layout2/admin-layout2.component')
            .then((m) => m.AdminLayout2Component)
    },
];
