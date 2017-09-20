import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Movie} from '../movie';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.movieService.getMovie(params.get('id')))
      .subscribe(movie => this.movie = movie);
  }

  save(): void {
    this.movieService.update(this.movie)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  gotoOverview(): void {
    this.router.navigate(['/movies']);
  }
}
