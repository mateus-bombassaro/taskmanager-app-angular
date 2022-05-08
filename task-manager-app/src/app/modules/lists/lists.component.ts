import { Component, OnInit } from '@angular/core';
import { TaskLists } from 'src/app/models/taskLists';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {

  lists: TaskLists[] = [];
  errorMessage: string = '';
  list:TaskLists;
  showLoader:boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists():void {
    this.apiService.getLists().subscribe({
      next: (lists) => this.setLists(lists),
      error: (err) => this.setError(err)
    });
  }

  onDelete(id:string):void {
    this.showLoader = true;
    this.apiService.deleteList(id).subscribe({
      next: () => this.loadLists(),
      error: (err) => this.setError(err)
    });
  }

  setError(err:any):void {
    this.errorMessage = <any>err;
    this.showLoader = false;
  }

  setLists(lists:TaskLists[]):void {
    this.lists = lists;
    this.showLoader = false;
  }
}
