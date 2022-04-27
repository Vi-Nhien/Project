import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifyService } from '@main-project/notify/data-access/services';
import { ThongBaoList } from '@main-project/notify/data-access/services';
import vi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'main-project-notify-header',
  templateUrl: './notify-header.component.html',
  styleUrls: ['./notify-header.component.css']
})
export class NotifyHeaderComponent implements OnInit {

  selectedValue = null;
  visible = false;
  ThongBaoTinhChatList: any[] = [];
  filterForm?: FormGroup;
  filterList ?: ThongBaoList;
  selectThongBaoTinhChat = null;
  selectTrangThaiHetHan = null;
  selectTrangThaiXem = null;
  filterBy : any;
  constructor(
    private notifyService: NotifyService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    registerLocaleData(vi);
    this.getThongBaoTinhChat();
    this.filterForm = this.fb.group({
      pageNumber: 1,
      pageSize: 20,
      maTraCuu: null,
      ngayTaoTu: null,
      ngayTaoDen: null,
      ngayHetHanTu: null,
      ngayHetHanDen: null,
      trangThaiHetHan: this.selectTrangThaiHetHan,
      trangThaiXem : this.selectTrangThaiXem,
      idTinhChat: this.selectThongBaoTinhChat,
    });
  }
  getThongBaoTinhChat() {
    let thongBaoTinhChat: any;
    this.notifyService.getAllThongBaoTinhChats().subscribe(
      res => {
        thongBaoTinhChat = res;
        this.ThongBaoTinhChatList = thongBaoTinhChat.result.items;
      });
  }
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
  searchSubmit() {
    this.notifyService.filterThongBao(this.filterForm?.value)
    this.visible = false;
  }
}
