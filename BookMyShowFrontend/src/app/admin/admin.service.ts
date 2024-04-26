import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedAttribute=new BehaviorSubject<string>('');
  constructor() { }
}
