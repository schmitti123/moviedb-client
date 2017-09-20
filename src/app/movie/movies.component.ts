///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Movie} from './movie';
import {MovieService} from './movie.service';
import {MoviesChangedService} from './movie-changed-service/movie-changed.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-my-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  dataChange: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  datasource: MoviesDatasource;
  displayedColumns = ['title', 'genre', 'delete', 'details'];

  @ViewChild('filter')
  filter: ElementRef;

  constructor(private movieService: MovieService,
              private router: Router, private moviesChangedService: MoviesChangedService) {


    moviesChangedService.movieChangedHandler().subscribe(movie => this.add(movie));

    this.movieService
      .getMovies()
      .then(movies => this.datasource = new MoviesDatasource(movies, this.dataChange));


  }

  getMovies(): void {
    this.movieService
      .getMovies()
      .then(movies => this.movies = movies);
  }

  add(movie: Movie): void {
    this.movies.push(movie);
    const copiedData = this.movies.slice();
    this.dataChange.next(copiedData);


  }

  delete(movie: Movie): void {
    this.movieService
      .delete(movie.id)
      .then(() => {
        console.log(this.movies);
        console.log(movie);

        let index = 0;
        for (const m of this.movies) {
          if (movie.id === m.id) {
            break;
          }
          index++;
        }
        // const index = this.movies.indexOf(movie);
        this.movies.splice(index, 1);
        const copiedData = this.movies.slice();
        this.dataChange.next(copiedData);

      });
  }

  details(movie: Movie): void {
    this.router.navigate(['/detail', movie.id]);
  }

  ngOnInit(): void {
    this.getMovies();
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.datasource) {
          return;
        }
        this.datasource.filter = this.filter.nativeElement.value;
      });
  }


}

export class MoviesDatasource extends DataSource<Movie> {
  data: Movie[];
  dataChange: BehaviorSubject<Movie[]>;

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(data: Movie[], dataChange: BehaviorSubject<Movie[]>) {
    super();
    this.data = data;
    this.dataChange = dataChange;
    this.dataChange.next(data);
  }

  connect(): Observable<Movie[]> {
    const displayDataChanges = [
      this.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.dataChange.getValue().slice().filter((item: Movie) => {
        const searchStr = (item.title + item.genre).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {
  }

}
