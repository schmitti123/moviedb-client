import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MovieService} from './movie/movie.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {MoviesComponent} from './movie/movies.component';
import {
  MdButtonModule, MdCardContent, MdCardModule, MdExpansionModule, MdInputModule, MdListModule,
  MdTableModule
} from '@angular/material';
import {MovieNewComponent} from './movie/movie-new/movie-new.component';
import {MoviesChangedService} from './movie/movie-changed-service/movie-changed.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputFileComponent} from '../common/input-file/input-file.component';
import {MyHeaderComponent} from '../common/my-header/my-header.component';
import {NgFileDropzoneDirective} from './ng-file-dropzone.directive';
import { MovieEditorComponent } from './movie/movie-editor/movie-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    MoviesComponent,
    MovieNewComponent,
    InputFileComponent,
    MyHeaderComponent,
    NgFileDropzoneDirective,
    MovieEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MdButtonModule,
    MdInputModule,
    MdTableModule,
    MdExpansionModule,
    MdListModule,
    MdCardModule,
    BrowserAnimationsModule,
  ],
  providers: [MovieService, MoviesChangedService, MovieEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
