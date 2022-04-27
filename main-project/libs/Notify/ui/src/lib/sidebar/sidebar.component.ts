
import { NotifyService, ThongBaoList } from '@main-project/notify/data-access/services'
import { NotifyAddModalComponent } from './../notify-add-modal/notify-add-modal.component';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'main-project-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  thongBaoTinhChatsList: any;
  ThongBaoTinhChatArray: any = [];
  thongBaosList: any[] = [];
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private notifyService: NotifyService,
    public router: Router) { }
  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: NotifyAddModalComponent,
      nzWidth: '700px',
      nzViewContainerRef: this.viewContainerRef,
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null

    });
    modal.afterClose.subscribe(
      result => {
        console.log(result)
        this.getThongBaoTinhChats()
        const flagForm : any =  {
          keyword:"",
          pageNumber: 1,
          pageSize: 20,
        }
        this.notifyService.filterThongBao(flagForm)
        // this.notifyService.filterThongBao()
      });
  }
  ngOnInit(): void {
    this.getThongBaoTinhChats();
  }
  getThongBaoTinhChats() {
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res => {
        this.thongBaoTinhChatsList = res;
        this.ThongBaoTinhChatArray = this.thongBaoTinhChatsList.result.items
      });
  }
  getThongBaos() {
    let ThongBaosArray: any;
    this.notifyService.getAllThongBaos(1, 20).subscribe(
      res => {
        ThongBaosArray = res;
        this.thongBaosList = ThongBaosArray.result.items
      });
  }
  thongBaoFlag() {
    const flagForm : any =  {
      flag: 2,
      keyword:"",
      pageNumber: 1,
      pageSize: 20,
    }
    console.log(flagForm)
    this.notifyService.filterThongBao(flagForm)
  }
}
