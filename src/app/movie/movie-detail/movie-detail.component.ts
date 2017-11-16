import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {ImageHandler} from '../../../common/imagehandler';
import {MovieEditorComponent} from '../movie-editor/movie-editor.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router
  ) {  }

  movie: Movie;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.movieService.getMovie(params.get('id')))
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
