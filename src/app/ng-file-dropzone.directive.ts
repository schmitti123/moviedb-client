import {Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appNgFileDropzone]'
})
export class NgFileDropzoneDirective implements OnInit {

  @Output()
  public fileDrop = new EventEmitter<File>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }


  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'dragenter', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'dragover', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'drop', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();

      const dt = event.dataTransfer;
      const files = dt.files;

      this.handleFiles(files);
    });
  }

  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      this.fileDrop.emit(file);
    }
  }
}



