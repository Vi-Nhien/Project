import { PropertyAddModalComponent } from './../property-add-modal/property-add-modal.component';
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { PropertyModalComponent } from '../property-modal/property-modal.component';
import { NotifyService, ThongBaoTinhChat } from 'libs/Notify/data-access/services/src/lib/notify.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'main-project-notify-property',
  templateUrl: './notify-property.component.html',
  styleUrls: ['./notify-property.component.scss']
})
export class NotifyPropertyComponent implements OnInit {

  form?: FormGroup;
  thongBaoTinhChatsList: ThongBaoTinhChat[] | undefined;

  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
    ) { }

  ngOnInit(): void {
    this.getThongBaoTinhChats();
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
  updateThongBaoTinhChat(thongBaoTinhChat: ThongBaoTinhChat){
    if(thongBaoTinhChat){
      this.modal.create({
        nzContent: PropertyModalComponent,
        nzComponentParams: {
          item: thongBaoTinhChat
        },
        nzClosable: true,
        nzAutofocus: null,
        nzWidth: '700px',
        nzFooter: null
      });
    }
  }
  propertyAddModal() {
    this.modal.create({
      nzContent: PropertyAddModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      nzFooter: null
    });
  }
  deleteMessage(): void {
    this.message.success('Delete successfully', {
      nzDuration: 3000
    });
  }

  deleteThongBaoTinhChat(thongBaoTinhChat: ThongBaoTinhChat, tplContent: TemplateRef<{}>) {
    if (thongBaoTinhChat) {
      this.modal.confirm({
        nzTitle: 'Bạn có muốn xóa không ???',
        nzContent: tplContent,
        nzComponentParams: {
          item: thongBaoTinhChat.tenTinhChat
        },
        nzAutofocus: null,
        nzBodyStyle: { padding: '20px', outline: 'none'},
        nzMaskClosable: true,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.notifyService.deleteThongBaoTinhChat(thongBaoTinhChat.id).subscribe(
          res => {
            this.deleteMessage()
            console.log('complete');
            window.location.reload();
            const index = this.thongBaoTinhChatsList?.findIndex(m => m.id === thongBaoTinhChat.id) || -1;
            if (index >= 0) {
              this.thongBaoTinhChatsList?.splice(index, 1);
            }
          }
        ),
        nzCancelText: 'Cancel',
        nzOnCancel: () => console.log('Cancel'),
      });
    }
  }
}
