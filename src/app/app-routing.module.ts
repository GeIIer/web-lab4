import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'students/:id',
      loadChildren: () =>
        import('./pages/students/students.module').then((m) => m.StudentsModule),
    },
    {
      path: 'groups',
      loadChildren: () =>
        import('./pages/groups/groups.module').then((m) => m.GroupsModule),
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
