import { NotifyService, ThongBaoTinhChat } from 'libs/Notify/data-access/services/src/lib/notify.service';
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
  thongBaoTinhChatsList: ThongBaoTinhChat[] | undefined;
  constructor(
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.newThongBaoTinhChat = this.fb.group({
      maTinhChat: [''],
      tenTinhChat: ['', Validators.required],
      maMau: ['', Validators.required],
      ghiChu: [''],
      soThuTu: [''],
      isVisible: false
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
      }
    )
  }
  onSubmit() {
    console.log(this.newThongBaoTinhChat);
    this.notifyService.createThongBaoTinhChat(this.newThongBaoTinhChat?.value).subscribe(
      Response => {
        console.log(Response);
        this.message.success('tạo thành công !!!');
        this.modalRef.close();
        this.cancel();
        // this.getThongBaoTinhChats()
        window.location.reload()

      },
    )
  }
  get a() {
    return this.newThongBaoTinhChat.controls;
  }
  cancel() {
    this.modalRef.destroy()
  }
}
