import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { SharedService } from './../../services/shared.service';
import { Task } from './../../model/Task.model';
import { Component, OnInit } from '@angular/core';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task = new Task('',null,'','','','',null);
  shared: SharedService;
  message : {};
  classCss : {};

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
      this.shared = SharedService.getInstance();

   }

  ngOnInit() {

    let id: string = this.route.snapshot.params['id'];
    if (id != undefined){
      this.findById(id);
    }
  }

  findById(id: string){
    this.taskService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.task = responseApi.data;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
 }



}
