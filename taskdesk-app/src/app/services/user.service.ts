import { TASK_DESK_API } from './taskdesk.api';
import { User } from '../model/User.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login (user: User) {
    return this.http.post(`${TASK_DESK_API}/api/auth`, user);
  }

  createOrUpdate(user : User) {
    if (user.id != null && user.id != '' ){
      return this.http.put(`${TASK_DESK_API}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${TASK_DESK_API}/api/user`, user);
    }
  }
    
  
  findAll(page: number, count: number){
    return this.http.get(`${TASK_DESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${TASK_DESK_API}/api/user/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${TASK_DESK_API}/api/user/${id}`);
  }

    
  
}
