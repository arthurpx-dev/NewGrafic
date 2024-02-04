import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'; // Importe o Router
import { Observable } from 'rxjs';
import { AuthService } from '../app/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {} // Inclua o Router no construtor

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifique a autenticação usando o serviço AuthService
    const isAuthenticated = this.authService.isUserAuthenticated();

    if (isAuthenticated) {
      // Se autenticado, permita a navegação
      return true;
    } else {
      // Se não autenticado, redirecione para a página de login ou para outra página desejada
      // Exemplo redirecionando para a página de login:
      return this.router.createUrlTree(['/login']);
    }
  }
}