import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/tasks';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Tasks[] = [];
  errorMessage:string = '';
  listName:string = '';
  listId:string = '';
  showLoader:boolean = true;
  subscription:Subscription;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.listName = params.get('listTitle') || '';
      this.listId = params.get('listId') || '';
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getTasks().subscribe({
      next: (tasks) => this.setTasks(tasks),
      error: (err) => this.setError(err)
    });
  }

  onAdd(): void {
    this.router.navigate(['tarefa/adicionar/', this.listId]);
  }

  onEdit(id:string): void {
    this.router.navigate(['tarefa/editar/', id]);
  }

  onDelete(id:string): void {
    this.showLoader = true;
    this.apiService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => this.setError(err)
    });
  }

  onConclude(task:Tasks): void {
    this.showLoader = true;
    const reqBody = {...task, done: true};
    this.apiService.putTask(reqBody).subscribe({
      next: () => this.loadTasks(),
      error: (err) => this.setError(err)
    });
  }

  setError(err:any):void {
    this.errorMessage = <any>err;
    this.showLoader = false;
  }

  setTasks(tasks:Tasks[]):void {
    this.tasks = tasks.filter(task => task.listId == this.listId)
    this.showLoader = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
