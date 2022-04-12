import { PropertyAddModalComponent } from './../property-add-modal/property-add-modal.component';
import { Component, OnInit } from '@angular/core';
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

  form ?: FormGroup;
  thongBaoTinhChatsList: ThongBaoTinhChat[] | undefined ;

  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private notifyService : NotifyService) { }

    ngOnInit(): void {
      this.getThongBaoTinhChats();
    }


  getThongBaoTinhChats(){
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res =>{
        this.thongBaoTinhChatsList = res;
        console.log(this.thongBaoTinhChatsList)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  // ---modal delete------

  // showDeleteConfirm( thongBaoTinhChat : ThongBaoTinhChat): void {
  //   this.modal.confirm({
  //     nzTitle: 'Are you sure delete this task?',
  //     nzContent: '<b style="color: red;">Some descriptions</b>',
  //     nzAutofocus: null,
  //     nzBodyStyle: { padding: '20px', outline:'none' },
  //     nzMaskClosable: true,
  //     nzOkText: 'Yes',
  //     nzOkType: 'primary',
  //     nzOkDanger: true,
  //     nzOnOk: () => this.deleteMessage(),
  //     nzCancelText: 'No',
  //     nzOnCancel: () => console.log('Cancel')
  //   });
  // }

  deleteMessage(): void {
    this.message.success('Delete successfully', {
      nzDuration: 3000
    });
  }

  updateComponentModal(): void {
    this.modal.create({
      nzContent: PropertyModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      nzOkText: 'Save',
      nzOnOk: () =>this.updateMessage(),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });

  }



  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }


  propertyAddModal(){
    this.modal.create({
      nzContent: PropertyAddModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      // nzOkText: 'Save',
      // nzOnOk: () =>this.onSubmit(),
      // nzCancelText: 'Cancel',
      // nzOnCancel: () => console.log('Cancel'),
      nzFooter: null
    });
  }

  deleteThongBaoTinhChat(thongBaoTinhChat: ThongBaoTinhChat) {
    if (thongBaoTinhChat) {
      this.notifyService.deleteThongBaoTinhChat(thongBaoTinhChat.id).subscribe(
        res => {
          this.deleteMessage()
          console.log('complete');
          const index = this.thongBaoTinhChatsList?.findIndex(m => m.id === thongBaoTinhChat.id) || -1;
          if (index >= 0) {
            this.thongBaoTinhChatsList?.splice(index, 1);
          }

        }
      )
    }
  }

}
