import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './pages/blog/blog.component';

import { AdminComponent } from './admin/admin.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: '', pathMatch: 'full', redirectTo: 'blog' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'blogs', component: AdminBlogsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'blogs' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
