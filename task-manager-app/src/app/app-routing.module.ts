import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './modules/lists/lists.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { RegisterComponent } from './modules/register/register.component';

const routes: Routes = [
  {
    path: '', component: ListsComponent
  },
  {
    path: 'lista/visualizar/:listId', component: TasksComponent
  },
  {
    path: 'lista/editar/:listId', component: RegisterComponent
  },
  {
    path: 'tarefa/editar/:taskId', component: RegisterComponent
  },
  {
    path: 'lista/adicionar', component: RegisterComponent
  },
  {
    path: 'tarefa/adicionar', component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
