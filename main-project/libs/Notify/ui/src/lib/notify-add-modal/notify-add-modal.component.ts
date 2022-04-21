import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
// import { NotifyService, ThongBaoTinhChat } from 'libs/Notify/data-access/services/src/lib/notify.service';
import { NotifyService  } from '@main-project/notify/data-access/services'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef  } from 'ng-zorro-antd/modal';


@Component({
  selector: 'main-project-notify-add-modal',
  templateUrl: './notify-add-modal.component.html',
  styleUrls: ['./notify-add-modal.component.scss']
})
export class NotifyAddModalComponent implements OnInit {



  selectValue = [];
  radioValue = 1
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
      tieuDe : new FormControl('', Validators.required),
      loaiThongBao: new FormControl(''),
      maTraCuu:new FormControl(''),
      noiDung:new FormControl(''),
      ngayHetHan:new FormControl(''),
      idTinhChat:new FormControl(''),
      idsCoSo:new FormControl([]),
      idsPhongBan:new FormControl([]),
      fileAttaches:new FormControl('')
    })
  }

  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res => {
        this.thongBaoTinhChatsList = res;
        console.log(this.thongBaoTinhChatsList)
      },
      (err) => {
        console.log(err)
      });
  }

  getPhongBanList() {
    this.notifyService.getAllPhongBan().subscribe(
      (res: any[]) => {
        this.phongBanList = res;
        console.log(this.phongBanList.result.items);
      });
  }

  getCoSoList() {
    this.notifyService.getAllCoSo().subscribe(
      (res: any[]) => {
        this.coSoList = res;
        console.log(this.coSoList.result.items);
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

  }
  cancel() {
    this.modalRef.destroy()
  }
}
