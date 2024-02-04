import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = '';
  id: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login(): void {
    this.authService.authenticateUser(this.name, this.id).subscribe(user => {
      if (user) {
        // Autenticação bem-sucedida, redirecione para a página do gráfico
        this.authService.loggedInUser = user;
        this.router.navigate(['/chart']);
      } else {
        // Exiba uma mensagem de erro, usuário não encontrado
        console.log('Usuário não encontrado');
      }
    });
  }
}