import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  Getchartinfo() {
    return this.http.get('http://localhost:3000/sales');
  }
}
