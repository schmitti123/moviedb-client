import {Component, Input, OnInit} from '@angular/core';
import {ImageHandler} from '../../../common/imagehandler';
import {Movie} from '../movie';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.css'],
})
export class MovieEditorComponent implements OnInit {

  constructor() { }

  @Input()
  public movie: Movie = new Movie();

  MAX_WIDTH = 300;
  MAX_HEIGHT = 300;


  elemWidth = '200px';
  elemHeight = '200px';

  ngOnInit() {
    console.log(this.movie);
    const img = document.createElement('img');
    img.src = this.movie.imageData;
    img.onload = () => {
      this.elemWidth = img.width + 'px';
      this.elemHeight = img.height + 'px';
    };

  }

  onFileSelect(event: FileList) {
    this.fileDrop(event.item(0));


  }

  fileDrop(file: File) {
    const imageHandler = new ImageHandler();
    imageHandler.fileDrop(file, this.MAX_WIDTH, this.MAX_HEIGHT, (imageData, elemWidth, elemHeight) => {
      this.movie.imageData = imageData;
      this.elemHeight = elemHeight;
      this.elemWidth = elemWidth;
    });
  }

  public clear(): void {
    this.movie = new Movie();
  }

}
