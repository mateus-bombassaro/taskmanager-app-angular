import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Subscription } from 'rxjs';

import { Tasks } from 'src/app/models/tasks';
import { TaskLists } from 'src/app/models/taskLists';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage:string = '';
  pageTitle:string = 'Adicionar Tarefa';
  formValues:Tasks|TaskLists;
  formGroup:FormGroup;
  validationMessages: {[ key:string ]:string }
  subscription:Subscription;
  showLoader:boolean = true;
  formFormat:string = '';
  isAddForm:boolean = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService) {

   }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

    this.validationMessages = {
      required: 'O campo é obrigatório.',
      minlength: 'O nome deve possuir 3 ou mais caracteres.',
      maxlength: 'O tamanho máximo é 50 caracteres.'
    }

    this.formFormat = this.router.url.includes('lista') ? 'list' : 'task';

    this.subscription = this.route.paramMap.subscribe(params => {
      const taskId = params.get('taskId') || '';
      const listId = params.get('listId') || '';

      this.isAddForm = this.router.url.includes('adicionar');

      if(this.isAddForm) {
        this.formValues = this.formFormat === 'list'
          ? {id: '', title: ''}
          : {id: '', title: '', listId: listId};

        this.showLoader = false;

      } else if(taskId) {
        this.loadTask(taskId);
      } else {
        this.loadList(listId);
      }
    });
  }

  loadTask(id:string): void {
    this.apiService.getTask(id)
    .subscribe({
      next: (formValues:Tasks) => this.showForm(formValues),
      error: (err:any) => this.errorMessage = <any>err
    })
  }

  loadList(id:string): void {
    this.apiService.getList(id)
    .subscribe({
      next: (formValues:TaskLists) => this.showForm(formValues),
      error: (err:any) => this.errorMessage = <any>err
    })
  }


  showForm(formValues:Tasks|TaskLists): void {
    if(this.formGroup) {
      this.formGroup.reset();
    }

    this.formValues = formValues;

    this.pageTitle = `Editar ${this.formFormat === 'list' ? 'lista':'tarefa' }: ${this.formValues.title}`;

    this.formGroup.patchValue({
      title: this.formValues.title,
    });
    this.showLoader = false;
  }

  onSubmit(): void {
    if(this.formGroup.valid) {
      if(this.formGroup.dirty) {
        this.showLoader = true;

        const reqBody = {...this.formValues, ...this.formGroup.value};

        if(!reqBody.id) {
          this.save(reqBody);
        } else {
          this.update(reqBody);
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Por favor corriga os erros de digitação";
    }
  }

  save<TaskLists extends Tasks>(reqBody:TaskLists|Tasks):void {
    if(this.formFormat === 'task') {
      this.apiService.postTask(reqBody).subscribe({
        next: (res) => this.onSaveComplete(res),
        error: (err) => this.onError(err)
      });
    } else {
      this.apiService.postList(reqBody).subscribe({
        next: (res) => this.onSaveComplete(res),
        error: (err) => this.onError(err)
      });
    }
  }

  update<TaskLists extends Tasks>(reqBody:TaskLists|Tasks):void {
    if(this.formFormat === 'task') {
      this.apiService.putTask(reqBody).subscribe({
        next: (res) => this.onSaveComplete(res),
        error: (err) => this.onError(err)
      });
    } else {
      this.apiService.putList(reqBody).subscribe({
        next: (res) => this.onSaveComplete(res),
        error: (err) => this.onError(err)
      });
    }
  }


  onSaveComplete(res?:any):void {
    this.formGroup.reset();
    this.redirectToList();
  }

  onError(err:any):void {
    this.errorMessage = err
  }

  redirectToList():void {
    this.formFormat === 'list'
    ? this.router.navigate([''])
    : this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
