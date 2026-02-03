import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { Router, NavigationExtras } from '@angular/router';
import { catchError, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            //toast.error(error.error);
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            } else {
              toast.error(error.error);
            }
            break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            //toast.error("Not found");
            router.navigateByUrl('/not-found');
            break;
          case 500:
            //toast.error("Server error");
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras); // section 7 lesson 75 - 78
            break;
          default:
            toast.error('Somenthing went wrong');
            break;
        }
      }
      throw error;
    }),
  );
};
