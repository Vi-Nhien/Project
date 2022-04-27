import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NotifyService } from '@main-project/notify/data-access/services';
import { NzModalRef  } from 'ng-zorro-antd/modal';



@Component({
  selector: 'main-project-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.scss']
})
export class NotifyModalComponent implements OnInit {

  selectedValue = null;
  @Input() item: any;

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
  SelectedPhongBans: number[] = [];
  SelectedCoSos: number[] = [];
  SelectedTinhChat ?: number;
  radioValue?: number = 1
  updateForm!: FormGroup;

  phongBanList: any;
  coSoList: any;
  thongBaoTinhChatsList : any;
  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private modalRef: NzModalRef
  ) { }
  ngOnInit(): void {
    this.getThongBaoTinhChats();
    this.getPhongBanList();
    this.getCoSoList();
    this.updateForm = this.fb.group({
      idGuid: this.item.idGuid,
      loaiThongBao: this.item.loaiThongBao,
      maTraCuu: this.item.maTraCuu,
      tieuDe: this.item.tieuDe,
      noiDung: this.item.noiDung,
      ngayHetHan: this.item.ngayHetHan,
      idTinhChat: this.item.idTinhChat,
      forWeb: 0,
      idsCoSo: this.SelectedCoSos,
      idsPhongBan: this.SelectedPhongBans,
    });
  }
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
  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      (res: any) => {
        this.thongBaoTinhChatsList = res.result.items
        console.log(this.thongBaoTinhChatsList)
      });
  }
  onSubmit() {
    console.log(this.updateForm?.value)
    this.notifyService.updateThongBao(this.updateForm?.value).subscribe(
      response => {
        console.log(response);
        this.message.success('Cập nhật thành công !!!');
        this.modalRef.close();
        this.cancel();
      }
    )
  }
  cancel() {
    this.modalRef.destroy()
  }
}
