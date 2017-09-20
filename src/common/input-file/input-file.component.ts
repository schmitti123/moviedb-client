import {Component, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';
import {MdFormFieldControl} from '@angular/material';

@Component({
  'moduleId': module.id,
  'selector': 'app-input-file',
  'templateUrl': './input-file.component.html'
})
export class InputFileComponent extends MdFormFieldControl<File> {

  @Input()
  accept: string;
  @Output()
  onFileSelect: EventEmitter<File[]> = new EventEmitter();

  @ViewChild('inputFile')
  nativeInputFile: ElementRef;

  private _files: File[];

  setDescribedByIds(ids: string[]): void {
  }

  focus(): void {
  }

  get fileCount(): number {
    return this._files && this._files.length || 0;
  }

  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;
    this.onFileSelect.emit(this._files);
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }
}
