import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  fetch(name?: string) {
    return this.http.get(`https://api.github.com/search/users?q=${name}`)
  }

  fetchUrl(url?:string){
    return this.http.get(`https://api.github.com/users/${url}`)
  }
}
