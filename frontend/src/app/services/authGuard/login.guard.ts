import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if(token && role === 'admin' || role === 'supervisor'){
    router.navigate(['/dashboard'])
    return false
  }else{
    return true
  }
  
};
