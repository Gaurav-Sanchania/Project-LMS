import { Routes } from '@angular/router';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard], // ✅ Protect dashboard with guard
    children: []
  },
  {
    path: 'leaveRequest/:formData',
    component: LeaveRequestComponent,
    canActivate: [AuthGuard] // ✅ Protect leave request route
  },
  {
    path: 'leaveRequest',
    loadComponent: () => import('./leave-request/leave-request.component').then((m) => m.LeaveRequestComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/addUser',
    loadComponent: () => import('./admin-layout2/admin-layout2.component').then((m) => m.AdminLayout2Component),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/leaves',
    loadComponent: () => import('./leave-layout/leave-layout.component').then((m) => m.LeaveLayoutComponent),
    canActivate: [AuthGuard]
  }
];
