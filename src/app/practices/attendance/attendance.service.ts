import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AttendanceService {
  constructor(private httpClient: HttpClient) { }

  getPlayerAttendance(idPractice: number): Observable<any>{
    return this.httpClient.get('http://192.168.33.10/api/attendance/'+idPractice);
  }
  
}
