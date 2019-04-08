import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';
import { Task } from '../../model/Task.model';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listTask=[];
  taskFilter = new Task('',0,'','','','',null);


  constructor(
    private dialogService: DialogService,
    private taskService: TaskService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
    }

   
  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page:number,count:number){
    this.taskService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listTask = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
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

  edit(id:string){
    this.router.navigate(['/task-new',id]);
  }

  detail(id: string){
    this.router.navigate(['/task-detail',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Você quer excluir a tarefa selecionada ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.taskService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Tarefa excluída com sucesso!`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i: number ,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

  filter() : void{
    this.page = 0;
    this.count = 5;
    this.taskService.findByParams(this.page, this.count, this.taskFilter)
    .subscribe((responseApi: ResponseApi) => {
      this.taskFilter.titulo = this.taskFilter.titulo == 'uninformed' ? '' : this.taskFilter.titulo;
      this.taskFilter.codigoTask = this.taskFilter.codigoTask == null ? 0 : this.taskFilter.codigoTask;
      this.listTask = responseApi['data']['content'];
      this.pages = responseApi['data']['totalPages'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    }); 
  }

  cleanFilter(): void {
    this.page = 0;
    this.count = 5;
    this.taskFilter = new Task('',0,'','','','',null);
    this.findAll(this.page, this.count);
  }

}
