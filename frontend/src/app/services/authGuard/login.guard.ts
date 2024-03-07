import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../common/common.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const service = inject(CommonService) as CommonService
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  let decryptedRole:any
  if (role) {
    decryptedRole = service.decryptData(role);
  }

  if(token && role === 'admin' || role === 'supervisor'){
    router.navigate(['/dashboard'])
    return false
  }else{
    return true
  }
  
};
