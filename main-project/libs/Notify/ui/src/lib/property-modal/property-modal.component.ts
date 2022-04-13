import { NotifyService, ThongBaoTinhChat } from 'libs/Notify/data-access/services/src/lib/notify.service';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
  selector: 'main-project-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.scss']
})
export class PropertyModalComponent implements OnInit {

  @Input() item!: ThongBaoTinhChat;
  thongBaoTinhChatsList: ThongBaoTinhChat[] | undefined;
  formUpdateThongBaoTinhChat?: FormGroup;
  constructor(
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.formUpdateThongBaoTinhChat = this.fb.group({
      id: this.item.id,
      maTinhChat: this.item.maTinhChat,
      tenTinhChat: this.item.tenTinhChat,
      maMau: this.item.maMau,
      ghiChu: this.item.ghiChu,
      soThuTu: this.item.soThuTu,
      isVisible: this.item.isVisible
    });
    this.getThongBaoTinhChatDetail(this.item.id);
  }

  getThongBaoTinhChatDetail(id: string): void {
    this.notifyService.getThongBaoThinhChatById(id)
      .subscribe({
        next: (data) => {
          this.item = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
    console.log(this.formUpdateThongBaoTinhChat)
    this.notifyService.updateThongBaoTinhChat(this.formUpdateThongBaoTinhChat?.value).subscribe(
      response => {
        console.log(response);
        this.message.success('Cập nhật thành công !!!');
        this.modalRef.close();
        this.cancel();
        window.location.reload()
      }
    )
  }

  cancel() {
    this.modalRef.destroy()
  }

}
