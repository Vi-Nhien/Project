import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalService } from 'ng-zorro-antd/modal';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'main-project-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.scss']
})
export class NotifyModalComponent {

  selectedValue = null;
  isVisible = true;


  editorConfig : AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '180px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };


  validateForm!: FormGroup;
  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private message: NzMessageService,

  ) { }


  handleOk(): void {
    console.log('Button ok clicked!');
    this.updateMessage();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submitForm():void{}



  ////handle upload file
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`);
    }
  }

}
