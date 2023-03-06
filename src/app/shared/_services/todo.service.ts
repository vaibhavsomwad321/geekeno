import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itodo } from '../model/todoTask';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = "http://localhost:3000/tasks";
  constructor(private http:HttpClient) { }
  get(id?: number): Observable<Itodo[]> {
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.get<Itodo[]>(url);
  }
 
  post(data: Itodo): Observable<Itodo> {
    return this.http.post<Itodo>(this.baseUrl, data);
  }
  patch(id: number, data: Itodo): Observable<Itodo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Itodo>(url, data);
  }

  delete(id: number): Observable<Itodo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Itodo>(url);
  }
}
