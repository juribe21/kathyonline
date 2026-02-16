import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ProductService } from '../../core/services/product-service';
import { EMPTY } from 'rxjs';
import { Product } from '../../types/Product';

export const productResolver: ResolveFn<Product> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const productId = route.paramMap.get('id');

  if (!productId) {
    router.navigateByUrl('not-found');
    return EMPTY;
  }

  return productService.getProduct(productId);
};
