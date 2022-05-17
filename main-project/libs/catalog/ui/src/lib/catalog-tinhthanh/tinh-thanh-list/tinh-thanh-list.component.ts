
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CatalogService, QuanHuyen, QuanHuyenList, TinhThanh, TinhThanhList } from '@main-project/catalog/data-access/services';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddQuanHuyenComponent } from './add-tinh-thanh/add-quan-huyen/add-quan-huyen.component';
import { AddTinhThanhComponent } from './add-tinh-thanh/add-tinh-thanh.component';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-tinh-thanh-list',
  templateUrl: './tinh-thanh-list.component.html',
  styleUrls: ['./tinh-thanh-list.component.scss']
})
export class TinhThanhListComponent implements OnInit {

  countCheckBox  = 0;
  ListTinhThanh: TinhThanh[] = [];
  ListQuanHuyen: QuanHuyen[] = [];
  expandSet = new Set<number>();
  listIds = new Set<number>();
  allChecked = true;
  isVisible = false;
  constructor(
    private catalogService: CatalogService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.danhSachTinhThanh();
  }

  danhSachTinhThanh() {
    const listTinhthanh: TinhThanhList = {
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
      }
    )
  }

  onExpandChange(id: number, checked: boolean): void {
    console.log(id);
    if (checked) {
      this.expandSet.add(id);
      const listQuanHuyen: QuanHuyenList = {
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
      nzMaskClosable: true,
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
  boChon(){
    this.listIds  = new Set<number>();
  }
  showConfrimTrash(): void{
    this.modal.confirm({
      nzTitle: 'Xóa quốc gia?',
      nzContent: 'Bạn muốn xóa các mục đã chọn',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  checkBoxValue(id: number, event: any){

    if(event.target.checked == true){
      this.listIds.add(id);
    }
    else{
      this.listIds.delete(id);
    }
    console.log(this.listIds)
  }
  themQuanHuyen(dataTinhThanh: any){
    if(dataTinhThanh){
      this.modal.create({
        nzTitle: 'Thêm mới Quận/Huyện',
        nzContent: AddQuanHuyenComponent,
        nzComponentParams: {
          itemTinhThanh : dataTinhThanh
        },
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: '900px',
      });
      this.modal.afterAllClose.subscribe(
        () => { this.danhSachTinhThanh(); }
      )
    }
  }

}
