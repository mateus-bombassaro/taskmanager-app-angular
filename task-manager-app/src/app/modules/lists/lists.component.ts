import { Component, OnInit } from '@angular/core';
import { TaskLists } from 'src/app/models/taskLists';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: TaskLists[] = [];
  errorMessage: string = '';
  formTitle:string = 'Adicionar Lista';
  isUpdateForm:boolean = false;
  list:TaskLists;
  listForm:FormGroup;
  validationMessages: {[ key:string ]:string }
  subscription:Subscription;
  showListForm:boolean = false;
  showLoader:boolean = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
    this.loadLists();
  }

  loadLists() {
    this.apiService.getLists().subscribe({
      next: (lists) => this.lists = lists,
      error: (err) => this.errorMessage = <any>err
    });

  }

  save(): void {
    if(this.listForm.valid) {
      if(this.listForm.dirty) {

        const t = {...this.list, ...this.listForm.value};

        if(!t.id) {
          this.apiService.postTask(t).subscribe({
            next: (res) => this.onSaveComplete(res),
            error: (err:any) => this.errorMessage = <any>err
          });
        } else {
          this.apiService.putTask(t).subscribe({
            next: (res) => this.onSaveComplete(res),
            error: (err:any) => this.errorMessage = <any>err
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Por favor corriga os erros de digitação";
    }
  }

  onSaveComplete(res?:any) {
    this.listForm.reset();
    this.router.navigate([`/lists/${res.listId}`])
  }

  onEdit(id:string) {
    this.showLoader = true;
  }
}
