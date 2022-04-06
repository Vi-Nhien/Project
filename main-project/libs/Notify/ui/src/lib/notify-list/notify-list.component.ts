import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

interface ListThongBao {
  key: string;
  tieude: string;
  quantrong: boolean;
  ngayHetHan: string;
  nguoiTao: string;
  ngayTao: string;
  daXem: number;
  chuaXem: number;
  checked: boolean
}

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.css']
})
export class NotifyListComponent implements OnInit {

  selectedValue = null;
  validateForm!: FormGroup;

  listOfData: ListThongBao[] = [
    {
      key: '1',
      tieude: 'hello world',
      quantrong: true,
      ngayHetHan: '22/12/2021',
      nguoiTao: 'alex',
      ngayTao: '22/10/2021',
      daXem: 2,
      chuaXem: 20,
      checked: true
    },
    {
      key: '2',
      tieude: 'Thử nghiệm',
      quantrong: true,
      ngayHetHan: '22/2/2022',
      nguoiTao: 'admin',
      ngayTao: '22/10/2021',
      daXem: 24,
      chuaXem: 10,
      checked: false
    },
    {
      key: '3',
      tieude: 'thông báo V/v',
      quantrong: true,
      ngayHetHan: '2/3/2022',
      nguoiTao: 'alex',
      ngayTao: '22/10/2021',
      daXem: 2,
      chuaXem: 20,
      checked: true
    }

  ];



  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    registerLocaleData(zh);
    this.validateForm = this.fb.group({
      tieude: [null, [Validators.required]],
      noidung:[''],
    });
  }




  // -----modal edit------

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.updateMessage();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');

    this.isVisible = false;
  }



  // ---modal delete------

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteMessage(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteMessage(): void {
    this.message.success('Delete successfully', {
      nzDuration: 10000
    });
  }


  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }



  // ---submit forms------

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submitForm(): void {

  }





  // eslint-disable-next-line @typescript-eslint/member-ordering
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




}
