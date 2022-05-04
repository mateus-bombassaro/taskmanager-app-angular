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
    path: 'lista/:listId', component: TasksComponent
  },
  {
    path: 'lista/:listId/task/:taskId', component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
