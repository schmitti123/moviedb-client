import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../movie';

@Injectable()
export class MoviesChangedService {
  private subject = new Subject<any>();

  addMovie(movie: Movie) {
    this.subject.next(movie);
  }

  clearMessage() {
    this.subject.next();
  }

  movieChangedHandler(): Observable<any> {
    return this.subject.asObservable();
  }
}
