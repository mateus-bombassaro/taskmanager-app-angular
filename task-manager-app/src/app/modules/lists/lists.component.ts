import { Component, OnInit } from '@angular/core';
import { TaskLists } from 'src/app/models/taskLists';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: TaskLists[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists() {
    this.apiService.getLists().subscribe(
      lists => {
        this.lists = lists;
      },
      error => this.errorMessage = <any>error
    )
  }
}
