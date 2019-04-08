import { Task } from './../model/Task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TASK_DESK_API } from './taskdesk.api';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  createOrUpdate(task: Task){
    if (task.id != null && task.id != '' ) {
      return this.http.put(`${TASK_DESK_API}/api/task`, task);
    }
    else
    {
      task.id = null;
      return this.http.post(`${TASK_DESK_API}/api/task`, task);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${TASK_DESK_API}/api/task/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${TASK_DESK_API}/api/task/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${TASK_DESK_API}/api/task/${id}`);
  }

  findByParams(page: number, count: number, task : Task ){
    task.codigoTask = task.codigoTask == null ? 0 : task.codigoTask;
    task.titulo = task.titulo == null ? "uninformed" : task.titulo;
    task.prioridade = task.prioridade == null ? "uninformed" : task.prioridade;
    return this.http.get(`${TASK_DESK_API}/api/task/${page}/${count}/${task.codigoTask}/${task.titulo}/${task.prioridade}`);
  }
}
