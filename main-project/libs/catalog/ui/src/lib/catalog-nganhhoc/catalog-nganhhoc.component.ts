import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CatalogService, KhoiNganh, List, NganhHoc, NganhHocList } from '@main-project/catalog/data-access/services'
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-nganhhoc',
  templateUrl: './catalog-nganhhoc.component.html',
  styleUrls: ['./catalog-nganhhoc.component.scss']
})
export class CatalogNganhhocComponent implements OnInit {

  nganhHocs?: NganhHoc[];
  subscription: Subscription | undefined;
  ModalAdd = false;
  isVisibleModalUpdate = false;
  ids: number[] = [];
  listCheckBox = new Set<number>();
  formAdd?: FormGroup;
  formUpdate?: FormGroup;
  selectIdPhongBan?: number;
  selectIdKhoiNganh?: number;
  expandSet = new Set<number>();
  listKhoiNganh?: KhoiNganh[];
  listPhongBan?: any[];
  selectPageSize: number = 20;
  curentPageNumber: number = 1;
  total: any;
  nganhHocById!: NganhHoc;


  constructor(
    private catalogService: CatalogService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private fbr: FormBuilder
  ) {
    this.searchInput
  }

  ngOnInit() {
    this.getListNganhHocs();
    this.formAdd = this.fb.group({
      maNganh: ['', Validators.required],
      tenNganh: ['', Validators.required],
      idPhongBan: [this.selectIdPhongBan, Validators.required],
      idKhoiNganh: [this.selectIdKhoiNganh, Validators.required],
      tenVietTat: [''],
      tenTiengAnh: [''],
      maTuyenSinh: [''],
      soThuTu: [''],
      isVisible: true,
      ghiChu: ['']
    });
    this.formUpdate = this.fbr.group({
      id: [''],
      maNganh: ['', Validators.required],
      tenNganh: ['', Validators.required],
      idPhongBan: [this.selectIdPhongBan, Validators.required],
      idKhoiNganh: [this.selectIdKhoiNganh, Validators.required],
      tenVietTat: [''],
      tenTiengAnh: [''],
      maTuyenSinh: [''],
      soThuTu: [''],
      isVisible: null,
      ghiChu: ['']
    })
  }
  change() {
    const list: any = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: true,
      keyword: '',
    }
    console.log(list)
    this.catalogService.getListNganhHoc(list).subscribe(
      (res: any) => {
        this.nganhHocs = res.result.items;
        this.total = res.result.pagingInfo;
      });
  }

  changeSize() {
    const list: any = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: true,
      keyword: '',
    }
    console.log(list)
    this.catalogService.getListNganhHoc(list).subscribe(
      (res: any) => {
        this.nganhHocs = res.result.items;
        this.total = res.result.pagingInfo;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  get f() { return this.formAdd!.controls; }
  get g() { return this.formUpdate!.controls; }
  getListNganhHocs() {
    const list: any = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: true,
      keyword: '',

    }
    console.log(list)
    this.catalogService.getListNganhHoc(list).subscribe(
      (res: any) => {
        this.nganhHocs = res.result.items;
        console.log(res.result)
        this.total = res.result.pagingInfo;
      });
  }
  searchInput(event: any) {
    const search: any = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: true,
      keyword: event.target.value,
    }
    console.log(search)
    this.catalogService.getListNganhHoc(search).subscribe(
      (res: any) => {
        this.nganhHocs = res.result.items;
        event.target.value = '';
      });
  }
  updateModal(id: number): void {
    this.isVisibleModalUpdate = true;
    this.catalogService.getNganhHocById(id).subscribe(
      (res: any) => {
        this.formUpdate?.patchValue(res.result);
      });
    const list: List = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: false,
      keyword: '',
      isVisible: true
    }
    this.catalogService.getListKhoiNganh(list).subscribe(
      (res: any) => {
        this.listKhoiNganh = res.result.items;
        console.log(this.listKhoiNganh);
      });

    this.catalogService.getListPhongBans(list).subscribe(
      (res: any) => {
        this.listPhongBan = res.result.items;
        console.log(this.listPhongBan);
      });
  }
  handleUpdateOk(): void {
    console.log(this.formUpdate?.value)
    this.catalogService.updateNganhHoc(this.formUpdate?.value).subscribe(
      () => {
        this.getListNganhHocs();
        this.isVisibleModalUpdate = false;
        this.notification.success('Thông báo !!!', 'Cập nhật thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      });
  }
  handleUpdateCancel(): void {
    this.isVisibleModalUpdate = false;
  }
  addModal() {
    this.ModalAdd = true;
    const list: List = {
      pageSize: this.selectPageSize,
      pageNumber: this.curentPageNumber,
      sortName: "id",
      sortASC: false,
      keyword: '',
      isVisible: true
    }
    this.catalogService.getListKhoiNganh(list).subscribe(
      (res: any) => {
        this.listKhoiNganh = res.result.items;
        console.log(this.listKhoiNganh);
      });

    this.catalogService.getListPhongBans(list).subscribe(
      (res: any) => {
        this.listPhongBan = res.result.items;
        console.log(this.listPhongBan);
      });
  }
  handleAddOk(): void {
    console.log(this.formAdd?.value);
    this.catalogService.createNganhHoc(this.formAdd?.value).subscribe(
      (res) => {
        this.getListNganhHocs();
        this.ModalAdd = false;
        this.notification.success('Thông báo !!!', 'Thêm mới thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      });
  }
  handleAddCancel(): void {
    this.ModalAdd = false;
  }
  showDeleteConfirm(itemQuoscGia: string, id: number, tplContent: TemplateRef<{}>) {
    if (id) {
      this.modal.confirm({
        nzTitle: 'Xóa ngành học?',
        nzContent: tplContent,
        nzComponentParams: {
          value: itemQuoscGia
        },
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteNganhHocs(id),
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    }
  }
  deleteNganhHocs(id: number) {
    this.ids.push(id);
    console.log(this.ids)
    this.catalogService.deleteNganhHocs(this.ids).subscribe(
      (res) => {
        this.getListNganhHocs();
        this.notification.success('Thông báo !!!', 'Xóa thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      }
    )
  }
  deleteListNganhHocs() {
    this.ids = Array.from(this.listCheckBox);
    this.catalogService.deleteNganhHocs(this.ids).subscribe(
      (res) => {
        this.getListNganhHocs();
        this.listCheckBox = new Set<number>();
        this.notification.success('Thông báo !!!', 'Xóa thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      }
    )
  }
  checkBoxList(event: any) {
    if (event.target.checked == true) {
      for (let i = 0; i < this.nganhHocs!.length; i++) {
        this.listCheckBox.add(this.nganhHocs![i].id);
      }
    }
    else {
      for (let i = 0; i < this.nganhHocs!.length; i++) {
        this.listCheckBox.delete(this.nganhHocs![i].id);

      }
    }
  }
  checkBoxValue(id: number, event: any) {

    if (event.target.checked == true) {
      this.listCheckBox.add(id);
    }
    else {
      this.listCheckBox.delete(id);
    }
  }
  showConfrimTrash(): void {
    this.modal.confirm({
      nzTitle: 'Xóa ngành học?',
      nzContent: 'Bạn muốn xóa các mục đã chọn',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteListNganhHocs(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  boChon() {
    this.listCheckBox = new Set<number>();
  }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  NganhHocById(id: number) {
    console.log(id);
    this.catalogService.getNganhHocById(id).subscribe(
      (res: any) => {
        this.nganhHocById = res.result!;
        console.log(this.nganhHocById);
      }
    )
  }
}
