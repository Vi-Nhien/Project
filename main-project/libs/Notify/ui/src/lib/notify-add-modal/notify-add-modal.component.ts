import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'

import { NotifyService  } from '@main-project/notify/data-access/services'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef  } from 'ng-zorro-antd/modal';


@Component({
  selector: 'main-project-notify-add-modal',
  templateUrl: './notify-add-modal.component.html',
  styleUrls: ['./notify-add-modal.component.scss']
})
export class NotifyAddModalComponent implements OnInit {
  SelectedPhongBans : number[] = [];
  SelectedCoSos : number [] =[];
  SelectedTinhChat ?: number;
  radioValue  : number = 1;
  submitted = false;
  editorConfig: AngularEditorConfig = {
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

  thongBaoTinhChatsList: any;
  phongBanList: any;
  coSoList: any;
  form?: FormGroup;

  constructor(
    private message: NzMessageService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private modalRef: NzModalRef
    ) { }

  ngOnInit(): void {
    this.getThongBaoTinhChats();
    this.getPhongBanList();
    this.getCoSoList();
    this.form = this.fb.group({
      loaiThongBao: this.radioValue,
      maTraCuu: [''],
      tieuDe : ['', Validators.required],
      noiDung: [''],
      ngayHetHan: [''],
      idTinhChat: this.SelectedTinhChat,
      forWeb: 0,
      idsCoSo: this.SelectedCoSos,
      idsPhongBan: this.SelectedPhongBans,
      flag: 1,
    });
  }
  show(num: number){
    console.log(num)
  }
  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats(1, 50).subscribe(
      (res: any) => {
        this.thongBaoTinhChatsList = res.result.items;
        console.log(this.thongBaoTinhChatsList)
      });
  }
  getPhongBanList() {
    this.notifyService.getAllPhongBan().subscribe(
      (res) => {
        this.phongBanList = res.result.items;
      });
  }
  getCoSoList() {
    this.notifyService.getAllCoSo().subscribe(
      (res) => {
        this.coSoList = res.result.items;
      });
  }
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
  submit(){
    this.submitted = true;
    if(this.form!.invalid){return}
    this.notifyService.createThongBao(this.form?.value).subscribe(
      res => {
        console.log('sucess');
        this.modalRef.destroy();
      });
  }
  cancel() {
    this.modalRef.destroy();
  }
  get f() { return this.form!.controls; }
}
