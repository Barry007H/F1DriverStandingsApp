import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './driver';

@Injectable({
  providedIn: 'root'
})
export class FetchdriversService {
  private apiUrl = 'https://localhost:7073/Data';

  constructor(private http: HttpClient) { }

  getStandings(year:string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/${year}`);
  }
}
