import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { } from '@angular/core/'
import { Observable } from 'rxjs';
import { IPost } from 'src/interfaces/IPost';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts`) as Observable<IPost[]>
  }


  getPost(id: string): Observable<IPost> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`) as Observable<IPost>
  }

}
