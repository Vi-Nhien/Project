import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CatalogService, QuanHuyen, QuanHuyenList, TinhThanh, TinhThanhList } from '@main-project/catalog/data-access/services';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddTinhThanhComponent } from './tinh-thanh-list/add-tinh-thanh/add-tinh-thanh.component';

@Component({
  selector: 'app-catalog-tinhthanh',
  templateUrl: './catalog-tinhthanh.component.html',
  styleUrls: ['./catalog-tinhthanh.component.scss']
})
export class CatalogTinhthanhComponent implements OnInit {


  ListTinhThanh : TinhThanh[] = [];
  ListQuanHuyen : QuanHuyen[] = [];
  expandSet = new Set<number>();


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
      let listQuanHuyen : QuanHuyenList = {
        pageSize: 50,
        pageNumber: 1,
        sortName: "id",
        sortASC: true,
        keyword: "",
        idTinhThanh: id
      }
      this.catalogService.getQuanhuyenList(listQuanHuyen).subscribe(
        (res: any) =>{
          this.ListQuanHuyen = res.result.items;
          console.log(this.ListQuanHuyen)
        }
      )
    } else {
      this.expandSet.delete(id);
    }
  }
  addTinhThanh(){
    this.modal.create({
      nzTitle: 'Thêm mới tỉnh thành',
      nzContent: AddTinhThanhComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '600px',
    });
    this.modal.afterAllClose.subscribe(
      ()=>{this.danhSachTinhThanh();}
    )
  }
}
