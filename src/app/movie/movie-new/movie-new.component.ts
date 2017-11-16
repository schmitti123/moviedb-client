import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {MoviesChangedService} from '../movie-changed-service/movie-changed.service';
import {ImageHandler} from '../../../common/imagehandler';
import {MovieEditorComponent} from '../movie-editor/movie-editor.component';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {

  constructor(private movieService: MovieService,
              private moviesChangedService: MoviesChangedService
              ) {
  }

  @Input('movieEditor')
  movieEditor: MovieEditorComponent;

  MAX_WIDTH = 300;
  MAX_HEIGHT = 300;

  imageData: string;

  elemWidth = '200px';
  elemHeight = '200px';


  add(movie: Movie): void {
    movie.title = movie.title.trim();
    if (!movie.title) {
      return;
    }


    this.movieService.create(movie)
      .then(m => {
        this.moviesChangedService.addMovie(m);
      });
  }

  ngOnInit() {
  }

  onFileSelect(event: FileList) {
    this.fileDrop(event.item(0));

  }

  fileDrop(file: File) {
    const imageHandler = new ImageHandler();
    imageHandler.fileDrop(file, this.MAX_WIDTH, this.MAX_HEIGHT, (imageData, elemWidth, elemHeight) => {
      this.imageData = imageData;
      this.elemHeight = elemHeight;
      this.elemWidth = elemWidth;
    });
  }



}
