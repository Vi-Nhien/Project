import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CatalogService, List, TonGiao } from '@main-project/catalog/data-access/services'
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-tongiao',
  templateUrl: './catalog-tongiao.component.html',
  styleUrls: ['./catalog-tongiao.component.scss']
})
export class CatalogTongiaoComponent implements OnInit {

  tonGiaos?: TonGiao[];
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
    this.getListTonGiaos();
    this.formAdd = this.fb.group({
      maTonGiao: ['', Validators.required],
      tenTonGiao: ['', Validators.required],
      soThuTu: [''],
      isVisible: true,
      ghiChu: ['']

    });
    this.formUpdate =this.fbr.group({
      id: [''],
      maTonGiao: ['', Validators.required],
      tenTonGiao: ['', Validators.required],
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
  getListTonGiaos() {
    const list: List = {
      pageSize: 20,
      pageNumber: 1,
      sortName: "id",
      sortASC: false,
      keyword: '',
      isVisible: true
    }
    this.catalogService.getListTonGiao(list).subscribe(
      (res: any) => {
        this.tonGiaos = res.result.items;
        console.log(this.tonGiaos);
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
    this.catalogService.getListTonGiao(search).subscribe(
      (res: any) => {
        this.tonGiaos = res.result.items;
        console.log("after filter: ",this.tonGiaos);
        event.target.value = '';
      });
  }
  updateModal(id: number): void {
    this.isVisibleModalUpdate = true;
    this.catalogService.getTonGiaoById(id).subscribe(
      (res: any)=>{
        this.formUpdate?.patchValue(res.result);
      });
  }
  handleUpdateOk(): void {
    this.catalogService.updateTonGiao(this.formUpdate?.value).subscribe(
      ()=>{
        this.getListTonGiaos();
        this.isVisibleModalUpdate = false;
        this.notification.success('Th??ng b??o !!!', 'C???p nh???t th??nh c??ng!!!');
      },
      (err)=>{
        this.notification.error('Th??ng b??o !!!', 'X???y ra l??i vui l??ng th??? l???i!!!');
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
    this.catalogService.createTonGiao(this.formAdd?.value).subscribe(
      (res) => {
        this.getListTonGiaos();
        this.ModalAdd = false;
        this.notification.success('Th??ng b??o !!!', 'Th??m m???i th??nh c??ng!!!');
      },
      (err) => {
        this.notification.error('Th??ng b??o !!!', 'X???y ra l??i vui l??ng th??? l???i!!!');
      });
  }
  handleAddCancel(): void {
    console.log('Button cancel clicked!');
    this.ModalAdd = false;
  }
  showDeleteConfirm(itemQuoscGia: string, id: number, tplContent: TemplateRef<{}>) {
    if (id) {
      this.modal.confirm({
        nzTitle: 'X??a T??n Gi??o?',
        nzContent: tplContent,
        nzComponentParams: {
          value: itemQuoscGia
        },
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteTonGiaos(id),
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    }
  }
  deleteTonGiaos(id: number) {
    this.ids.push(id);
    console.log(this.ids)
    this.catalogService.deleteTonGiaos(this.ids).subscribe(
      (res) => {
        this.getListTonGiaos();
        this.notification.success('Th??ng b??o !!!', 'X??a th??nh c??ng!!!');
      },
      (err) => {
        this.notification.error('Th??ng b??o !!!', 'X???y ra l??i vui l??ng th??? l???i!!!');
      }
    )
  }
  deleteListTonGiaos() {
    this.ids  = Array.from(this.listCheckBox);
    this.catalogService.deleteTonGiaos(this.ids).subscribe(
      (res) => {
        this.getListTonGiaos();
        this.listCheckBox = new Set<number>();
        this.notification.success('Th??ng b??o !!!', 'X??a th??nh c??ng!!!');
      },
      (err) => {
        this.notification.error('Th??ng b??o !!!', 'X???y ra l??i vui l??ng th??? l???i!!!');
      }
    )
  }
  checkBoxList(event: any) {
    if (event.target.checked == true) {
      for (let i = 0; i < this.tonGiaos!.length; i++) {
        this.listCheckBox.add(this.tonGiaos![i].id);
      }
    }
    else {
      for (let i = 0; i < this.tonGiaos!.length; i++) {
        this.listCheckBox.delete(this.tonGiaos![i].id);

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
      nzTitle: 'X??a T??n Gi??o?',
      nzContent: 'B???n mu???n x??a c??c m???c ???? ch???n',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteListTonGiaos(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  boChon(){
    this.listCheckBox  = new Set<number>();
  }

}
