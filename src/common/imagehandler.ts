import EXIF from 'exif-js';

export class ImageHandler {


  fileDrop(file: File, maxWidth: number, maxHeight: number, callback: Function) {
    const reader = new FileReader();

    reader.onloadend = (loaded: ProgressEvent) => {
      const fileReader = loaded.target as FileReader;

      const img = new Image();

      img.src = fileReader.result;

      img.onload = () => {

        const canvas = document.createElement('canvas');

        const dimension = this.calcImageDimension(maxHeight, maxWidth, img.height, img.width);

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
            canvasWidth = dimension.height;
            canvasHeight = dimension.width;
            rotateX = dimension.height;
            rotateY = 0;
            rotateDegree = 90;

            // normal
          } else {
            canvasHeight = dimension.height;
            canvasWidth = dimension.width;
            rotateX = 0;
            rotateY = 0;
            rotateDegree = 0;
          }
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          this.rotateCanvas(context, rotateX, rotateY, rotateDegree);
          context.drawImage(img, 0, 0, dimension.width, dimension.height);

          const imageData = canvas.toDataURL();

          const elemWidth = canvasWidth + 'px';
          const elemHeight = canvasHeight + 'px';

          callback(imageData, elemWidth, elemHeight);


        });


      };


    };

    reader.readAsDataURL(file);
  }

  private rotateCanvas(context: CanvasRenderingContext2D, rotateX: number, rotateY: number,
                       rotateDegree: number): CanvasRenderingContext2D {

    context.translate(rotateX, rotateY);
    context.rotate(rotateDegree * Math.PI / 180);
    context.translate(0, 0);

    return context;
  }

  private calcImageDimension(maxHeight: number, maxWidth: number, height: number, width: number): ImageDimension {
    if (width > height) {
      if (width > maxWidth) {
        height *= maxHeight / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxWidth / height;
        height = maxHeight;
      }
    }

    return new ImageDimension(height, width);
  }

}

class ImageDimension {
  constructor(public height: number, public width: number) {
  }
}
