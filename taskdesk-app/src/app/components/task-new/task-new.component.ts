import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../model/Task.model';
import { SharedService } from '../../services/shared.service';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {


  @ViewChild("form")
  form: NgForm

  task: Task = new Task('',0,'','','','',null);
  shared: SharedService
  message : {};
  classCss : {};

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
      this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
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

 register(){
  this.message = {};
  this.taskService.createOrUpdate(this.task).subscribe((responseApi:ResponseApi) => {
      this.task = new Task('',0,'','','','',null);
      let taskRet : Task = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Tarefa ${taskRet.titulo} incluída com sucesso!`
      });
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
    }


 


}
