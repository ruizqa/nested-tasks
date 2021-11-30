import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newTask: any;
  title = 'public';
  tasks = [];
  newError=false;
  editError=false;
  newErrorMessage ="";
  editErrorMessage ="";
  displayTasks=false;
  editingTask= false;
  showingTask=false;
  task:any;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.resetNewTask();
     this.getTasks();
  }

  correctTask(task:any){
    task.completed = String(task.completed)
    task.updated_at = task.updated_at.slice(0,-2) + String((Number(task.updated_at.slice(-2))+1));
    task.created_at = task.created_at.slice(0,-2) + String((Number(task.updated_at.slice(-2))+1));
    return (task)
  }

  resetNewTask(){
    this.newTask = { title: "", description: "", completed:'true',
     created_at: [(new Date()).getFullYear(),(new Date()).getMonth(), (new Date()).getDate()].join('-'),
     updated_at: [(new Date()).getFullYear(),(new Date()).getMonth(), (new Date()).getDate()].join('-')}
  }

  onSubmit(event:any){
    event.preventDefault();
    let sent_task = this.newTask;
    let observable = this._httpService.newTask(this.correctTask(sent_task))
    observable.subscribe((task:any)=>{

      this.ngOnInit()
    }, err => {
      console.log(err)
      this.newError=true;
      this.newErrorMessage= 'Server Error: ' + err.error.message;
    })
  
  
  }

  Edit(event:any){
    event.preventDefault();
    let sent_task = this.task;
    console.log(sent_task)
    let observable = this._httpService.editTask(this.task.id, this.correctTask(sent_task))
    observable.subscribe((data:any)=>{
      console.log(data)
      this.ngOnInit()
    }, err => {
      console.log(err)
      this.editError=true;
      this.editErrorMessage= 'Server Error: ' + err.error.message;
    })

  }

  Delete(event:any){
    let id = Number(event.target.name)
    console.log(id);
    let observable =this._httpService.deleteTask(id);
    observable.subscribe((data:any)=>{
      this.ngOnInit()
    })

  }



  OnEdit(event:any){
    let id:number = Number(event.target.name);
    this.getTask(id);
    this.editingTask=true;
    
  }

  
  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe((data:any) => {
      this.tasks = data.map((task:any) => {
        task['created_at'] = new Date(task['created_at']).getFullYear() + '-'+ ('0' + (new Date(task['created_at']).getMonth()+1)).slice(-2) + '-' +  ('0' + new Date(task['created_at']).getDate()).slice(-2);
        task['updated_at'] = new Date(task['updated_at']).getFullYear() + '-'+ ('0' + (new Date(task['updated_at']).getMonth()+1)).slice(-2) + '-' +  ('0' + new Date(task['updated_at']).getDate()).slice(-2);
        return(task);
      })
      this.displayTasks= this.tasks.length>0;
    });
  }





  getTask(id:number){
    let tempObservable = this._httpService.getTask(id);
    tempObservable.subscribe((task:any) => {
      task['created_at'] = new Date(task['created_at']).getFullYear() + '-'+ ('0' + (new Date(task['created_at']).getMonth()+1)).slice(-2) + '-' +  ('0' + new Date(task['created_at']).getDate()).slice(-2);
      task['updated_at'] = new Date(task['updated_at']).getFullYear() + '-'+ ('0' + (new Date(task['updated_at']).getMonth()+1)).slice(-2) + '-' +  ('0' + new Date(task['updated_at']).getDate()).slice(-2);
      this.task = task;
    });
  }


  showTask(event:any){
    let id:number = Number(event.target.name);
    this.getTask(id);
    this.showingTask= true;
  }

}
