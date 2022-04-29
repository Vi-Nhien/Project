
import { NotifyService } from '@main-project/notify/data-access/services'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'main-project-property-add-modal',
  templateUrl: './property-add-modal.component.html',
  styleUrls: ['./property-add-modal.component.scss']
})
export class PropertyAddModalComponent implements OnInit {

  newThongBaoTinhChat !: FormGroup;
  thongBaoTinhChatsList: any;
  submitted : boolean = false;
  constructor(
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.newThongBaoTinhChat = this.fb.group({
      maTinhChat: ['', Validators.required],
      tenTinhChat: ['', Validators.required],
      maMau: [''],
      ghiChu: [''],
      soThuTu: null,
      isVisible: false
    });
  }
  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats(1, 20).subscribe(
      res => {
        this.thongBaoTinhChatsList = res;
        console.log(this.thongBaoTinhChatsList)
      },
      (err) => {
        console.log(err)
      });
  }
  onSubmit() {
    this.submitted = true;
    if(this.newThongBaoTinhChat.invalid){return}
    console.log(this.newThongBaoTinhChat);
    this.notifyService.createThongBaoTinhChat(this.newThongBaoTinhChat?.value).subscribe(
      Response => {
        console.log(Response);
        this.message.success('tạo thành công !!!');
        this.modalRef.close();
        this.cancel();
      });
  }
  get a() {
    return this.newThongBaoTinhChat.controls;
  }
  cancel() {
    this.modalRef.destroy()
  }
}
