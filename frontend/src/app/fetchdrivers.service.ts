import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './driver';

@Injectable({
  providedIn: 'root'
})
export class FetchdriversService {
  private apiUrl = 'https://localhost:7073/Data';
  private apiKey = '7303c8ef-d91a-4964-a7e7-78c26ee17ec4';

  constructor(private http: HttpClient) { }

  getStandings(year:string): Observable<Driver[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get<Driver[]>(`${this.apiUrl}/${year}`, { headers });
  }
}
