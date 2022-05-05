
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CatalogService, QuanHuyen, QuanHuyenList, TinhThanh, TinhThanhList } from '@main-project/catalog/data-access/services';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddTinhThanhComponent } from './add-tinh-thanh/add-tinh-thanh.component';



@Component({
  selector: 'app-tinh-thanh-list',
  templateUrl: './tinh-thanh-list.component.html',
  styleUrls: ['./tinh-thanh-list.component.scss']
})
export class TinhThanhListComponent implements OnInit {

  ListTinhThanh: TinhThanh[] = [];
  ListQuanHuyen: QuanHuyen[] = [];
  expandSet = new Set<number>();
  listIds = new Set<number>();
  constructor(
    private catalogService: CatalogService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.danhSachTinhThanh();
  }

  danhSachTinhThanh() {
    let listTinhthanh: TinhThanhList = {
      idQuocGia: 1001,
      keyword: "",
      pageNumber: 1,
      pageSize: 50,
      sortASC: false,
      sortName: "id",
    }
    this.catalogService.getTinhThanhList(listTinhthanh).subscribe(
      (res: any) => {
        this.ListTinhThanh = res.result.items
        console.log(this.ListTinhThanh);
      }
    )
  }

  onExpandChange(id: number, checked: boolean): void {
    console.log(id);
    if (checked) {
      this.expandSet.add(id);
      let listQuanHuyen: QuanHuyenList = {
        pageSize: 50,
        pageNumber: 1,
        sortName: "id",
        sortASC: true,
        keyword: "",
        idTinhThanh: id
      }
      this.catalogService.getQuanhuyenList(listQuanHuyen).subscribe(
        (res: any) => {
          this.ListQuanHuyen = res.result.items;
          console.log(this.ListQuanHuyen)
        }
      )
    } else {
      this.expandSet.delete(id);
    }
  }
  addTinhThanh() {
    this.modal.create({
      nzTitle: 'Thêm mới tỉnh thành',
      nzContent: AddTinhThanhComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '600px',
    });
    this.modal.afterAllClose.subscribe(
      () => { this.danhSachTinhThanh(); }
    )
  }
  deleteConfirm(id: number) {
    if (id) {
      this.modal.confirm({
        nzTitle: 'Are you sure delete this task?',
        nzContent: '<b style="color: red;">Some descriptions</b>',
        nzOkText: 'Có, Xóa dữ liệu',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => console.log('OK'),
        nzCancelText: 'không',
        nzOnCancel: () => console.log('Cancel')
      })
    }
  }
}
