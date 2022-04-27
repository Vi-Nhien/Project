
import vi from '@angular/common/locales/vi';
import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'
import { registerLocaleData } from '@angular/common';
import { NotifyService } from '@main-project/notify/data-access/services'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit,  OnDestroy {

  selectedValue = null;
  thongBaosList: any = [];
  nguoiDungXemThongBaoList: any = [];
  chooseIdThongBao = new Set<string>();
  listChooseThongBaos: string[] = [];
  arrayIdDanhDau: string[] = []
  btnStar?: boolean;
  thongBaosPagination?: number;
  pageNumbers: number = 1;
  totalPages?: number;
  flagStar = new Set<string>();
  flagIdThongBao: string[] = [];
  subscription: Subscription | undefined;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
    private router: Router) {
      this.subscription = this.notifyService.getFilter().subscribe(data => {
        console.log("list: ",data.filterThongBao);
        this.notifyService.filterThongBaos(data.filterThongBao).subscribe(
          (res: any) =>{
              this.thongBaosList = res.result.items;
              console.log(this.thongBaosList);
          })
      });
  }
  ngOnInit(): void {
    this.getThongBaos();
    registerLocaleData(vi);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getThongBaos() {
    let ThongBaos: any = [];
    this.notifyService.getAllThongBaos(this.pageNumbers, 20).subscribe(
      res => {
        ThongBaos = res;
        this.thongBaosPagination = ThongBaos.result.pagingInfo.totalItems;
        this.thongBaosList = ThongBaos.result.items;
        this.getTotalPage()
      });
  }
  nextPage() {
    this.pageNumbers = this.pageNumbers + 1;
    let ThongBaos: any = [];
    this.notifyService.getAllThongBaos(this.pageNumbers, 20).subscribe(
      res => {
        ThongBaos = res;
        this.thongBaosList = ThongBaos.result.items;
      }
    );
  }
  prevPage() {
    this.pageNumbers = this.pageNumbers - 1;
    let ThongBaos: any = [];
    this.notifyService.getAllThongBaos(this.pageNumbers, 20).subscribe(
      res => {
        ThongBaos = res;
        this.thongBaosList = ThongBaos.result.items;
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
  getThongBaoByID(id: string) {
    this.notifyService.getThongBaoById(id).subscribe(
      res => {
        console.log('sucess')
      });
  }
  getNguoiDungXemThongBaoList() {
    let NguoiDungXemThongBao: any = [];
    this.notifyService.getNguoiDungXemThongBao().subscribe(
      (res: any = []) => {
        NguoiDungXemThongBao = res;
        this.nguoiDungXemThongBaoList = NguoiDungXemThongBao.result.items;
        console.log(this.nguoiDungXemThongBaoList)
      });
  }
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
    this.getNguoiDungXemThongBaoList();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  showDeleteConfirm(id: string): void {
    if (id) {
      this.chooseIdThongBao.add(id);
      this.modal.confirm({
        nzTitle: 'Are you sure delete this task?',
        nzContent: '<b style="color: red;">Some descriptions</b>',
        nzAutofocus: null,
        nzBodyStyle: { padding: '20px', outline: 'none' },
        nzMaskClosable: true,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteThongBaos(),
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    }
  }
  deleteMessage(): void {
    this.message.success('Delete successfully',{
      nzDuration: 3000
    });
  }
  updateComponentModal(thongBao: any ){
    if(thongBao){
      this.modal.create({
        nzContent: NotifyModalComponent,
        nzComponentParams: {
          item: thongBao
        },
        nzClosable: true,
        nzAutofocus: null,
        nzWidth: '700px',
        nzFooter: null,
      });
      this.modal.afterAllClose.subscribe(() => this.getThongBaos());
    }
  }
  updateMessage(): void {
    this.message.success('Update successfully', {
      nzDuration: 3000
    });
  }

  notifyDetail(data: any) {
    if (data) {
      this.router.navigate(['/notify/page', data.idGuid])
    }
  }

  deleteThongBaos() {
    this.listChooseThongBaos = Array.from(this.chooseIdThongBao);
    this.notifyService.deleteThongBaos(this.listChooseThongBaos).subscribe(
      () => {
        this.deleteMessage();
        this.getThongBaos();
      });
  }

  danhDauChuaDoc(){
    this.listChooseThongBaos = Array.from(this.chooseIdThongBao);
    this.notifyService.updateViewed(this.listChooseThongBaos, 1).subscribe(
      () => {
        this.getThongBaos();
      });
  }

  showComfirmDelete(){
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzAutofocus: null,
      nzBodyStyle: { padding: '20px', outline: 'none' },
      nzMaskClosable: true,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteThongBaos(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  chooseAll(event: any) {
    const checkedAll = event.target.checked;
    if (checkedAll) {
      for (let i = 0; i < this.thongBaosList.length; i++) {
        this.chooseIdThongBao.add(this.thongBaosList[i].idGuid);
      }
    }
    else {
      for (let i = 0; i < this.thongBaosList.length; i++) {
        this.chooseIdThongBao.delete(this.thongBaosList[i].idGuid);
      }
    }
  }

  chooseSingle(event: any, id: string) {
    const check = event.target.checked;
    if (check) {
      this.chooseIdThongBao.add(id);
      console.log(this.chooseIdThongBao);
    }
    else {
      this.chooseIdThongBao.delete(id);
      console.log(this.chooseIdThongBao);

    }
  }

  changeflag(flag: number, id: string) {
    if (flag === 1) {
      this.arrayIdDanhDau.push(id);
      this.notifyService.flagThongBao(this.arrayIdDanhDau, 2).subscribe(
        () => {
          this.arrayIdDanhDau.pop();
          this.getThongBaos();
        });
    }
    else {
      this.arrayIdDanhDau.push(id);
      this.notifyService.flagThongBao(this.arrayIdDanhDau, 1).subscribe(
        () => {
          this.arrayIdDanhDau.pop();
          this.getThongBaos();
        });

    }
  }

  flagAllThongBao(flag: any) {
    if (flag.target.checked == true) {
      // for (let i = 0; i < this.thongBaosList.length; i++) {
      //   this.flagStar.add(this.thongBaosList[i].idsGuidThongBao);
      //   this.flagIdThongBao = Array.from(this.flagStar);
      //   this.notifyService.flagThongBao(this.arrayIdDanhDau, 1).subscribe(
      //     () => {
      //       console.log("win")
      //       this.getThongBaos();
      //     });
      // }
      console.log("true")

    }
    else{
      // for (let i = 0; i < this.thongBaosList.length; i++) {
      //   this.flagStar.delete(this.thongBaosList[i].idsGuidThongBao);
      //   this.flagIdThongBao = Array.from(this.flagStar);
      //   this.notifyService.flagThongBao(this.arrayIdDanhDau, 2).subscribe(
      //     () => {
      //       console.log("win+ 1")
      //       this.getThongBaos();
      //     });
      // }
      console.log("false")
    }
  }
}


