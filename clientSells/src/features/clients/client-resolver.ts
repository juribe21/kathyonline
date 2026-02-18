import { ResolveFn, Router } from '@angular/router';
import { Client } from '../../types/Client';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { AdminService } from '../../core/services/admin-service';

/* Leccion 116 Section 10 */
export const clientResolver: ResolveFn<Client> = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  const clientId = route.paramMap.get('id');

  if (!clientId) {
    router.navigateByUrl('not-found');
    return EMPTY;
  }

  return adminService.getClient(clientId);
};
