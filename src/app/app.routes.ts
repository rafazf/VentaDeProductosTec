import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'caja',
        pathMatch: 'full'
    },
    {
        path:'caja',
        title:'Caja | Sistema de Ventas',
        loadComponent: ()=>import('./MOD/Inicio/Inicio.component')
    }
];
