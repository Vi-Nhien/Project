import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CatalogService, QuocGia, List } from '@main-project/catalog/data-access/services'
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-quocgia',
  templateUrl: './catalog-quocgia.component.html',
  styleUrls: ['./catalog-quocgia.component.scss']
})
export class CatalogQuocgiaComponent implements OnInit, OnDestroy {

  quocGias?: QuocGia[];
  subscription: Subscription | undefined;
  ModalAdd = false;
  isVisibleModalUpdate = false;
  ids: number[] = [];
  listCheckBox = new Set<number>();
  formAdd ?: FormGroup;
  formUpdate ?: FormGroup;

  constructor(
    private catalogService: CatalogService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private fbr : FormBuilder
  ) {
    this.searchInput
  }

  ngOnInit() {
    this.getListQuocGias();
    this.formAdd = this.fb.group({
      maQuocGia: ['', Validators.required],
      tenQuocGia: ['', Validators.required],
      soThuTu: [''],
      isVisible: true,
      ghiChu: ['']
    });
    this.formUpdate =this.fbr.group({
      id: [''],
      maQuocGia: ['', Validators.required],
      tenQuocGia: ['', Validators.required],
      soThuTu: [''],
      isVisible: true,
      ghiChu: ['']
    })
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  get f() { return this.formAdd!.controls; }
  get g() { return this.formUpdate!.controls; }
  getListQuocGias() {
    const list: List = {
      pageSize: 20,
      pageNumber: 1,
      sortName: "id",
      sortASC: false,
      keyword: '',
      isVisible: true
    }
    this.catalogService.getListQuocGia(list).subscribe(
      (res: any) => {
        this.quocGias = res.result.items;
        console.log(this.quocGias);
      });
  }
  searchInput(event: any) {
    const search: any = {
      pageSize: 10,
      pageNumber: 1,
      sortName: "id",
      sortASC: true,
      keyword: event.target.value,
    }
    console.log(search)
    this.catalogService.getListQuocGia(search).subscribe(
      (res: any) => {
        this.quocGias = res.result.items;
        console.log("after filter: ",this.quocGias);
        event.target.value = '';
      });
  }
  updateModal(id: number): void {
    this.isVisibleModalUpdate = true;
    this.catalogService.getQuocGiaById(id).subscribe(
      (res: any)=>{
        this.formUpdate?.patchValue(res.result);
      });
  }
  handleUpdateOk(): void {
    this.catalogService.updateQuocGia(this.formUpdate?.value).subscribe(
      ()=>{
        this.getListQuocGias();
        this.isVisibleModalUpdate = false;
        this.notification.success('Thông báo !!!', 'Cập nhật thành công!!!');
      },
      (err)=>{
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      });
  }
  handleUpdateCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModalUpdate = false;
  }
  addModal() {
    this.ModalAdd = true;
  }
  handleAddOk(): void {
    console.log(this.formAdd?.value);
    this.catalogService.createQuocGia(this.formAdd?.value).subscribe(
      (res) => {
        this.getListQuocGias();
        this.ModalAdd = false;
        this.notification.success('Thông báo !!!', 'Thêm mới thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      });
  }
  handleAddCancel(): void {
    console.log('Button cancel clicked!');
    this.ModalAdd = false;
  }
  showDeleteConfirm(itemQuoscGia: string, id: number, tplContent: TemplateRef<{}>) {
    if (id) {
      this.modal.confirm({
        nzTitle: 'Xóa quốc gia?',
        nzContent: tplContent,
        nzComponentParams: {
          value: itemQuoscGia
        },
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteQuocGias(id),
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    }
  }
  deleteQuocGias(id: number) {
    this.ids.push(id);
    console.log(this.ids)
    this.catalogService.deleteQuocGias(this.ids).subscribe(
      (res) => {
        this.getListQuocGias();
        this.notification.success('Thông báo !!!', 'Xóa thành công!!!');
      },
      (err) => {
        this.notification.error('Thông báo !!!', 'Xảy ra lõi vui lòng thử lại!!!');
      }
    )
  }
  deleteListQuocGias() {
    this.ids  = Array.from(this.listCheckBox);
    this.catalogService.deleteQuocGias(this.ids).subscribe(
      (res) => {
        this.getListQuocGias();
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
      for (let i = 0; i < this.quocGias!.length; i++ ) {
        this.listCheckBox.add(this.quocGias![i].id);
      }
    }
    else {
      for (let i = 0; i < this.quocGias!.length; i++) {
        this.listCheckBox.delete(this.quocGias![i].id);

      }
    }
    console.log(this.listCheckBox);
  }
  checkBoxValue(id: number, event: any){

    if(event.target.checked == true){
      this.listCheckBox.add(id);
    }
    else{
      this.listCheckBox.delete(id);
    }
    console.log(this.listCheckBox)
  }
  showConfrimTrash(): void{
    this.modal.confirm({
      nzTitle: 'Xóa quốc gia?',
      nzContent: 'Bạn muốn xóa các mục đã chọn',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteListQuocGias(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  boChon(){
    this.listCheckBox  = new Set<number>();
  }
}


