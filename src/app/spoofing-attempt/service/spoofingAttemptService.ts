import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SpoofingAttempt} from '../models/spoofingAttempt';

@Injectable({ providedIn: 'root' })
export class SpoofingAttemptService {

  private url = '/front/spoofing'; // ajuste conforme seu endpoint

  constructor(private http: HttpClient) { }

  getAll(): Observable<SpoofingAttempt[]> {
    return this.http.get<SpoofingAttempt[]>(this.url);
  }

}
