import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {MoviesChangedService} from '../movie-changed-service/movie-changed.service';
import EXIF from 'exif-js';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {

  constructor(private movieService: MovieService,
              private moviesChangedService: MoviesChangedService) {
  }

  MAX_WIDTH = 300;
  MAX_HEIGHT = 300;

  imageData: string;
  existImage = false;

  @ViewChild('dropzone')
  dropzone: ElementRef;

  elemWidth = '200px';
  elemHeight = '200px';


  add(title: string, genre: string): void {
    title = title.trim();
    if (!title) {
      return;
    }

    const movie: Movie = new Movie();
    movie.title = title;
    movie.genre = genre;
    movie.imageData = this.imageData;


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
    const reader = new FileReader();

    reader.onloadend = (loaded: ProgressEvent) => {
      const fileReader = loaded.target as FileReader;

      this.existImage = true;

      const img = new Image();

      img.src = fileReader.result;

      img.onload = (event: Event) => {

        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > this.MAX_WIDTH) {
            height *= this.MAX_HEIGHT / width;
            width = this.MAX_WIDTH;
          }
        } else {
          if (height > this.MAX_HEIGHT) {
            width *= this.MAX_WIDTH / height;
            height = this.MAX_HEIGHT;
          }
        }


        EXIF.getData(img, () => {
          const orientation = EXIF.getTag(img, 'Orientation');


          let canvasWidth: number;
          let canvasHeight: number;
          let rotateX: number;
          let rotateY: number;
          let rotateDegree: number;
          const context = canvas.getContext('2d');

          // 90Grad gedreht.
          if (orientation === 6) {
            canvasWidth = height;
            canvasHeight = width;
            rotateX = height;
            rotateY = 0;
            rotateDegree = 90;

            // normal
          } else {
            canvasHeight = height;
            canvasWidth = width;
            rotateX = 0;
            rotateY = 0;
            rotateDegree = 0;
          }
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          this.rotateCanvas(context, rotateX, rotateY, rotateDegree);
          context.drawImage(img, 0, 0, width, height);
          this.imageData = canvas.toDataURL();

          this.elemWidth = canvasWidth + 'px';
          this.elemHeight = canvasHeight + 'px';

        });


      };


    };

    reader.readAsDataURL(file);
  }

  rotateCanvas(context: CanvasRenderingContext2D, rotateX: number, rotateY: number, rotateDegree: number): CanvasRenderingContext2D {
    context.translate(rotateX, rotateY);
    context.rotate(rotateDegree * Math.PI / 180);
    context.translate(0, 0);

    return context;
  }
}
