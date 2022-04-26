
import vi from '@angular/common/locales/vi';
import { NotifyModalComponent } from './../notify-modal/notify-modal.component';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message'



import { registerLocaleData } from '@angular/common';
import { NotifyService, ThongBaoList } from '@main-project/notify/data-access/services'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'main-project-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  selectedValue = null;
  thongBaosList: any = [];
  nguoiDungXemThongBaoList: any = [];
  chooseIdThongBao = new Set<string>();
  listChooseThongBaos: string[] = [];
  arrayIdDanhDau: string[] = []
  btnStar?: boolean = false;
  thongBaosPagination?: number;
  pageNumbers: number = 1;
  totalPages?: number;
  flagStar = new Set<string>();
  flagIdThongBao: string[] = [];

  filterList?: any;



  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private notifyService: NotifyService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getThongBaos();
    registerLocaleData(vi);
  }



  // searchSubmit() {
  //   this.notifyService.filterThongBao(this.filterForm?.value).subscribe(
  //     (res: any= []) => {
  //       this.filterList = res.result.items;
  //       console.log(this.filterList);
  //     }
  //   )
  // }


  search() {
    // let params: any;
    // this.route.queryParams.subscribe(
    //   (res: any) => {
    //     this.filterList = res['idTinhChat']
    //     // this.filterList = res;
    //     console.log(this.filterList)
    //   }
    // )
    let str = this.route.snapshot.pathFromRoot
    console.log(str);

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
      }
    );
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

  // ---modal delete------

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
    this.message.success('Delete successfully', {
      nzDuration: 3000
    });
  }

  updateComponentModal(): void {
    this.modal.create({
      nzContent: NotifyModalComponent,
      nzClosable: true,
      nzAutofocus: null,
      nzWidth: '700px',
      nzOkText: 'Save',
      nzOnOk: () => this.updateMessage(),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });

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
      res => {
        this.deleteMessage();
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
      const number = 2;
      this.notifyService.flagThongBao(this.arrayIdDanhDau, number).subscribe(
        res => {
          console.log('fag = 2');
          this.arrayIdDanhDau.pop();
          this.getThongBaoByID(id);
          this.getThongBaos();
        });
    }
    else {
      this.arrayIdDanhDau.push(id);
      const number = 1;
      this.notifyService.flagThongBao(this.arrayIdDanhDau, number).subscribe(
        res => {
          console.log('fag = 1');
          this.arrayIdDanhDau.pop();
          this.getThongBaoByID(id);
          this.getThongBaos();
        });

    }
  }

  flagAllThongBao(flag: number) {
    if (flag === 1) {
      for (let i = 0; i < this.thongBaosList.length; i++) {
        this.flagStar.add(this.thongBaosList[i].idsGuidThongBao);
        this.flagIdThongBao = Array.from(this.flagStar);
        this.notifyService.flagThongBao(this.arrayIdDanhDau, 1).subscribe(
          res => {
            this.getThongBaos();
          });
      }
      for (let i = 0; i < this.thongBaosList.length; i++) {
        this.flagStar.delete(this.thongBaosList[i].idsGuidThongBao);
        this.flagIdThongBao = Array.from(this.flagStar);
        this.notifyService.flagThongBao(this.arrayIdDanhDau, 2).subscribe(
          res => {
            this.getThongBaos();
          });
      }
    }
  }
}


