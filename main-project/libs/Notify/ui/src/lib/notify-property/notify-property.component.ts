import { PropertyAddModalComponent } from './../property-add-modal/property-add-modal.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { PropertyModalComponent } from '../property-modal/property-modal.component';
import { NotifyService } from '@main-project/notify/data-access/services'
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'main-project-notify-property',
  templateUrl: './notify-property.component.html',
  styleUrls: ['./notify-property.component.scss']
})
export class NotifyPropertyComponent implements OnInit {

  check = false;
  setOfCheckedId = new Set<number>();
  idn : number[] = [];

  form?: FormGroup;
  thongBaoTinhChatsList: any;
  thongBaoTinhChatArray: any = [];
  selectThongBaoTinhChats: any;

  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getThongBaoTinhChats();
  }


  onItemChecked( id: number, event: any){
    const checked = event.target.checked
    if(checked){
      this.setOfCheckedId.add(id);
      // this.refreshCheckedStatus();
      // let checkItem = [... new Set(this.ids)];
      this.idn = Array.from(this.setOfCheckedId);
      console.log("array add id", this.idn);


      // console.log(checkItem)
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
      for (let i = 0; i < this.thongBaoTinhChatArray.length; i++) {
        this.setOfCheckedId.add(this.thongBaoTinhChatArray[i].id);
        // this.check = true;
      }
      console.log("array add all: ", this.setOfCheckedId);
    }
    else{
      for (let i = 0; i < this.thongBaoTinhChatArray.length; i++) {
          this.setOfCheckedId.delete(this.thongBaoTinhChatArray[i].id);
          // this.check = false;
      }
      console.log("array delete all: ", this.setOfCheckedId);
    }

  }



  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      (res: any[]) => {
        this.thongBaoTinhChatsList = res;
        this.thongBaoTinhChatArray = this.thongBaoTinhChatsList.result.items
        console.log(this.thongBaoTinhChatArray)
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
      }
    )
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
