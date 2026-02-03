import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { UserList } from '../features/users/user-list/user-list';
import { UserDetailed } from '../features/users/user-detailed/user-detailed';
import { ProductList } from '../features/products/product-list/product-list';
import { ProductDetailed } from '../features/products/product-detailed/product-detailed';
import { ClientList } from '../features/clients/client-list/client-list';
import { ClientDetailed } from '../features/clients/client-detailed/client-detailed';
import { Messages } from '../features/messages/messages';
import { AdminProducts } from '../features/Admin/admin-products/admin-products';
import { Categorias } from '../features/Admin/categorias/categorias';
import { PuntosEntrega } from '../features/Admin/puntos-entrega/puntos-entrega';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      /* Clientes */
      { path: 'products', component: ProductList },
      { path: 'products/joyeria', component: ProductList },
      { path: 'products/enfermeria', component: ProductList },
      { path: 'products/:id', component: ProductDetailed },
      { path: 'messages', component: Messages },
    ],
  },

  /* Administracion */
  { path: 'users', component: UserList },
  { path: 'users/:id', component: UserDetailed },
  { path: 'clientes', component: ClientList },
  { path: 'clientes/:id', component: ClientDetailed },
  { path: 'adminproducts', component: AdminProducts },
  { path: 'admincategorias', component: Categorias },
  { path: 'adminentrega', component: PuntosEntrega },

  { path: '**', component: Home },
];
