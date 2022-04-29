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
  thongBaosPagination?: number;
  pageNumbers: number = 1;
  totalPages?: number;
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
    this.notifyService.getAllThongBaoTinhChats(this.pageNumbers , 20).subscribe(
      (res:any) => {
        this.thongBaosPagination = res.result.pagingInfo.totalItems;
        this.thongBaoTinhChatsList = res.result.items;
        this.getTotalPage()
      });
  }
  nextPage() {
    this.pageNumbers = this.pageNumbers + 1;
    this.notifyService.getAllThongBaos(this.pageNumbers, 20).subscribe(
      (res: any) => {
        this.thongBaoTinhChatsList = res.result.items;
      });
  }
  prevPage() {
    this.pageNumbers = this.pageNumbers - 1;
    let ThongBaos: any = [];
    this.notifyService.getAllThongBaos(this.pageNumbers, 20).subscribe(
      (res) => {
        ThongBaos = res;
        this.thongBaoTinhChatsList = ThongBaos.result.items;
      }
    );
  }
  getTotalPage() {
    let num = this.thongBaosPagination
    this.totalPages = num! / 20;
    if (num! % 20 == 0) {
    }
    else {
      this.totalPages = Math.floor(this.totalPages) + 1;
    }
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
