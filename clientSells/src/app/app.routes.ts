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
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/not-found/not-found';
import { ServerError } from '../shared/server-error/server-error';
import { ClientProfile } from '../features/clients/client-profile/client-profile';
import { ClientMensajes } from '../features/clients/client-mensajes/client-mensajes';
import { ClientCompras } from '../features/clients/client-compras/client-compras';
import { ProductFoto } from '../features/products/product-foto/product-foto';
import { CarritoCompras } from '../features/pedidos/carrito-compras/carrito-compras';
import { clientResolver } from '../features/clients/client-resolver';
import { productResolver } from '../features/products/product-resolver';
import { preventUnsavedChangesGuard } from '../core/guards/prevent-unsaved-changes-guard';
import { ClientFoto } from '../features/clients/client-foto/client-foto';
import { Sistema } from '../features/Admin/sistema/sistema';

export const routes: Routes = [
  { path: '', component: Home },

  /* Administracion de Productos */
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'products', component: ProductList },
      { path: 'joyeria/:cat', component: ProductList },
      { path: 'enfermeria/:cat', component: ProductList },
      {
        path: 'products/:id',
        resolve: { product: productResolver },
        runGuardsAndResolvers: 'always',
        component: ProductDetailed,
        children: [
          { path: '', redirectTo: 'foto', pathMatch: 'full' },
          { path: 'foto', component: ProductFoto, title: 'Foto(s)' },
          { path: 'carrito', component: CarritoCompras, title: 'Carrito' },
        ],
      },
      { path: 'messages', component: Messages },
    ],
  },

  /* Administracion de Clientes */
  {
    path: 'clientes/:id',
    resolve: { client: clientResolver },
    runGuardsAndResolvers: 'always',
    component: ClientDetailed,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'clientfoto', component: ClientFoto, title: 'Foto(s)' },
      {
        path: 'profile',
        component: ClientProfile,
        title: 'Perfil',
        canDeactivate: [preventUnsavedChangesGuard],
      },
      { path: 'messages', component: ClientMensajes, title: 'Mensajes' },
      { path: 'compras', component: ClientCompras, title: 'Compras' },
    ],
  },

  /* Administracion */
  { path: 'users', component: UserList },
  { path: 'users/:id', component: UserDetailed },
  { path: 'clientes', component: ClientList },
  { path: 'sistema', component: Sistema },
  { path: 'addfotos', component: ProductFoto, title: 'Foto(s)' },
  { path: 'adminproducts', component: AdminProducts },
  { path: 'admincategorias', component: Categorias },
  { path: 'adminentrega', component: PuntosEntrega },
  { path: 'errors', component: TestErrors },
  { path: 'server-error', component: ServerError },

  { path: '**', component: NotFound },
];
