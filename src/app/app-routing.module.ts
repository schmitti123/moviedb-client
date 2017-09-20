import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {MoviesComponent} from './movie/movies.component';
import {MovieNewComponent} from './movie/movie-new/movie-new.component';


const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesComponent},
  {path: 'detail/:id', component: MovieDetailComponent}
  // {path: 'new', component: MovieNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
