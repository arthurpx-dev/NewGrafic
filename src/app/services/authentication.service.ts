
// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserData} from '../UserData'; // Importe o tipo UserData
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users';

  // Adicione a propriedade loggedInUser
  loggedInUser: UserData | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}

  authenticateUser(name: string, id: number): Observable<UserData | undefined> {
    return this.http.get<UserData[]>(this.apiUrl).pipe(
      map(data => {
        const users = data;
        const user = users.find(u => u.name === name && u.id === id);

        // Se o usuário for encontrado, atribua as informações do usuário logado
        if (user) {
          this.authService.loggedInUser = user;
        }

        return user;
      })
    );
  }

  // Adicione um método para obter as vendas específicas do usuário autenticado
  getUserSales(): Observable<any[]> {
    const userId = this.loggedInUser?.id;
    return this.http.get<any[]>('http://localhost:3000/sales').pipe(
      map(sales => sales.filter(s => s.userId === userId))
    );
  }
}