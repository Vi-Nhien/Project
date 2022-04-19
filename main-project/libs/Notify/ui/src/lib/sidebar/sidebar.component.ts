
import { NotifyService } from '@main-project/notify/data-access/services'
import { NotifyAddModalComponent } from './../notify-add-modal/notify-add-modal.component';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'main-project-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  thongBaoTinhChatsList  : any;

  ThongBaoTinhChatArray: any =  [];

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private notifyService: NotifyService) { }
  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: NotifyAddModalComponent,
      nzWidth: '700px',
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),

    });
  }

  ngOnInit(): void {
    this.getThongBaoTinhChats();
  }


  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res=> {
        this.thongBaoTinhChatsList = res;
        this.ThongBaoTinhChatArray = this.thongBaoTinhChatsList.result.items      }
    )
  }


}
