import { PropertyAddModalComponent } from './../property-add-modal/property-add-modal.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { PropertyModalComponent } from '../property-modal/property-modal.component';
import { NotifyService  } from '@main-project/notify/data-access/services'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'main-project-notify-property',
  templateUrl: './notify-property.component.html',
  styleUrls: ['./notify-property.component.scss']
})
export class NotifyPropertyComponent implements OnInit {

  allChecked = false;
  indeterminate = true;
  form?: FormGroup;
  thongBaoTinhChatsList : any;
  selectThongBaoTinhChats: any;
  arrayIds : any;
  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
    this.getThongBaoTinhChats();
  }
  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      (res : any[]) => {
        this.thongBaoTinhChatsList = res;
        console.log(this.thongBaoTinhChatsList)
      }
    )
  }
  updateThongBaoTinhChat(thongBaoTinhChat: any) {
    if (thongBaoTinhChat) {
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
      this.modal.afterAllClose.subscribe(()=> this.getThongBaoTinhChats())
    }
  }
  propertyAddModal() {
    this.modal.create({
      nzContent: PropertyAddModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      nzFooter: null,
    });
    this.modal.afterAllClose.subscribe(()=> this.getThongBaoTinhChats())

  }


  deleteThongBaoTinhChat(thongBaoTinhChat: any, tplContent: TemplateRef<{}>) {
    if (thongBaoTinhChat) {
      this.modal.confirm({
        nzTitle: 'Bạn có muốn xóa không ???',
        nzContent: tplContent,
        nzComponentParams: {
          item: thongBaoTinhChat.tenTinhChat
        },
        nzAutofocus: null,
        nzBodyStyle: { padding: '20px', outline: 'none' },
        nzMaskClosable: true,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteThongBaoTinhChatByIds(thongBaoTinhChat),
        nzCancelText: 'Cancel',
        nzOnCancel: () => console.log('Cancel'),
      });
    }
  }


  deleteThongBaoTinhChatByIds(thongBaoTinhChat:any){
    this.notifyService.deleteThongBaoTinhChat(thongBaoTinhChat).subscribe(
      res => {
        this.message.success('Delete successfully', { nzDuration: 3000 });
        console.log('complete');
      }
    )
  }


  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.thongBaoTinhChatsList = this.thongBaoTinhChatsList?.map((item: any) => ({
        ...item,
        checked: true
      }));
    } else {
      this.thongBaoTinhChatsList = this.thongBaoTinhChatsList?.map((item: any) => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.thongBaoTinhChatsList?.every((item: { checked: any; }) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.thongBaoTinhChatsList?.every((item: { checked: any; }) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }


  deleteAll_confirm(): void {
    this.modal.confirm({
      nzTitle: 'Bạn muốn xóa tất cả ? ',
      nzContent: 'Xác nhận xóa',
      nzOkText: 'Có, xóa dữ liệu',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteThongBaoTinhChatSelect(),
      nzCancelText: 'trở lại',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  deleteThongBaoTinhChatSelect() {
    this.selectThongBaoTinhChats = this.thongBaoTinhChatsList?.filter((s: { checked: any; }) => s.checked);
    for (const selectItem in this.selectThongBaoTinhChats) {
      this.notifyService.deleteThongBaoTinhChat(this.selectThongBaoTinhChats[selectItem as unknown as number].id).subscribe(
        res => {
          this.getThongBaoTinhChats();
          console.log(res);
          this.message.success('Xóa dữ liệu thành công!!!')
        }
      )
    }
  }
}
