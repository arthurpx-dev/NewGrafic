// auth.service.ts
import { Injectable } from '@angular/core';
import { UserData } from '../UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adicione uma propriedade para armazenar as informações do usuário logado
  loggedInUser: UserData | undefined;

  constructor() {}

  // Método para verificar se o usuário está autenticado
  isUserAuthenticated(): boolean {
    // Lógica de verificação de autenticação, por exemplo, verificar se o usuário está logado
    // Retorne true se autenticado, false caso contrário
   // Alterado para verificar se há um usuário logado
   if (this.loggedInUser) {
    console.log('Usuário logado:', this.loggedInUser);
    return true;
  } else {
    console.log('Nenhum usuário logado');
    return false;
  }
}
  }