import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutividadeService {
  private apiUrl = 'http://localhost:3000/tarefa';

  constructor(private http: HttpClient) {}

  obterTodasTarefas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
