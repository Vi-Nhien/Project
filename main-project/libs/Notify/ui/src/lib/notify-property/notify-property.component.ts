import { PropertyAddModalComponent } from './../property-add-modal/property-add-modal.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { PropertyModalComponent } from '../property-modal/property-modal.component';
import { NotifyService, ThongBaoTinhChat } from '@main-project/notify/data-access/services'

@Component({
  selector: 'main-project-notify-property',
  templateUrl: './notify-property.component.html',
  styleUrls: ['./notify-property.component.scss']
})
export class NotifyPropertyComponent implements OnInit {

  check = false;
  setOfCheckedId = new Set<number>();
  idn : number[] = [];
  thongBaoTinhChatsList ?: ThongBaoTinhChat[] = [];
  selectThongBaoTinhChats: any;
  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
  ) {}
  ngOnInit(): void {
    this.getThongBaoTinhChats();
  }
  onItemChecked( id: number, event: any){
    const checked = event.target.checked
    if(checked){
      this.setOfCheckedId.add(id);
      this.idn = Array.from(this.setOfCheckedId);
      console.log("array add id", this.idn);
    }

    else{
      this.setOfCheckedId.delete(id);
      this.idn = Array.from(this.setOfCheckedId);
      console.log("array add id", this.idn);
    }
  }
  checkAllBox(event:any)
  {
    const checkedAll = event.target.checked;
    if(checkedAll){
      for (let i = 0; i < this.thongBaoTinhChatsList!.length; i++) {
        this.setOfCheckedId.add(this.thongBaoTinhChatsList![i].id);
      }
    }
    else{
      for (let i = 0; i < this.thongBaoTinhChatsList!.length; i++) {
          this.setOfCheckedId.delete(this.thongBaoTinhChatsList![i].id);
      }
    }

  }
  getThongBaoTinhChats() {
    let thongBaoTinhChatArray : any;
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res => {
        thongBaoTinhChatArray = res;
        this.thongBaoTinhChatsList = thongBaoTinhChatArray.result.items;
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
      this.modal.afterAllClose.subscribe(() => this.getThongBaoTinhChats())
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
    this.modal.afterAllClose.subscribe(() => this.getThongBaoTinhChats())

  }


  deleteThongBaoTinhChat(thongBaoTinhChat: any, id: number, tplContent: TemplateRef<{}>) {
    if(id){
      this.setOfCheckedId.add(id);
      this.idn = Array.from(this.setOfCheckedId);
      console.log("array add id", this.idn);
      if (id) {
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
          nzOnOk: () => this.deleteThongBaoTinhChatByIds(this.idn),
          nzCancelText: 'Cancel',
          nzOnCancel: () => this.cancel(),
        });
      }
    }
  }
  cancel(){
    this.setOfCheckedId.clear();
    this.idn = Array.from(this.setOfCheckedId);
  }

  deleteThongBaoTinhChatByIds(idn: number[]) {
    this.notifyService.deleteThongBaoTinhChat(idn).subscribe(
      res => {
        this.message.success('Delete successfully', { nzDuration: 3000 });
        console.log('complete');
        this.getThongBaoTinhChats();
      });
  }
  deleteAll_confirm(): void {
    this.modal.confirm({
      nzTitle: 'Bạn muốn xóa tất cả ? ',
      nzContent: 'Xác nhận xóa',
      nzOkText: 'Có, xóa dữ liệu',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteThongBaoTinhChatByIds(this.idn),
      nzCancelText: 'trở lại',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
