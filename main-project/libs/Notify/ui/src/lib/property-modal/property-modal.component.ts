
import { NotifyService } from '@main-project/notify/data-access/services'
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
  selector: 'main-project-property-modal',
  templateUrl: './property-modal.component.html',
    styleUrls: ['./property-modal.component.scss']
  })
export class PropertyModalComponent implements OnInit {

  @Input() item : any;
  thongBaoTinhChatsList: any[] | undefined;
  formUpdateThongBaoTinhChat?: FormGroup;
  submitted : boolean = false;
  pageNumbers: number = 1;
  constructor(
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.formUpdateThongBaoTinhChat = this.fb.group({
      id: this.item.id,
      maTinhChat: [this.item.maTinhChat, Validators.required],
      tenTinhChat: [this.item.tenTinhChat, Validators.required],
      maMau: this.item.maMau,
      ghiChu: this.item.ghiChu,
      soThuTu: this.item.soThuTu,
      isVisible: this.item.isVisible
    });
    this.getThongBaoTinhChatDetail(this.item.id);
  }

  getThongBaoTinhChatDetail(id: string): void {
    this.notifyService.getThongBaoThinhChatById(id)
      .subscribe(
        res  =>{
          this.item = res;
          console.log(res);
        });
  }

  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats(this.pageNumbers, 20).subscribe(
      res => {
        this.thongBaoTinhChatsList = res;
      });
  }

  onSubmit() {
    this.submitted = true;
    if(this.formUpdateThongBaoTinhChat?.invalid){return}
    console.log(this.formUpdateThongBaoTinhChat)
    this.notifyService.updateThongBaoTinhChat(this.formUpdateThongBaoTinhChat?.value).subscribe(
      response => {
        console.log(response);
        this.message.success('Cập nhật thành công !!!');
        this.modalRef.close();
        this.cancel();
      });
  }
  get a() {
    return this.formUpdateThongBaoTinhChat!.controls;
  }
  cancel() {
    this.modalRef.destroy()
  }
}
