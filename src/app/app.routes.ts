import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent: () => import('./pages/order-history/order-history.component').then(m => m.OrderHistoryComponent)}
];
