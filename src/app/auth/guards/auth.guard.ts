import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
// console.log('Verificando autenticación...');
  if (authService.isLoggedIn()) {
    // console.log('Usuario autenticado');
    return true;
  } else {
    // console.log('Usuario no autenticado, redirigiendo a login');
    router.navigate(['/login']);
    return false;
  }
};
