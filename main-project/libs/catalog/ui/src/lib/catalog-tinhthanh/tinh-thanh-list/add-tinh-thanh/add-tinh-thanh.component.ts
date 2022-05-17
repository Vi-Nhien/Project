import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, List, QuocGia } from '@main-project/catalog/data-access/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {  NzModalRef,  NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-tinh-thanh',
  templateUrl: './add-tinh-thanh.component.html',
  styleUrls: ['./add-tinh-thanh.component.scss']
})
export class AddTinhThanhComponent implements OnInit {
  quocGias?: QuocGia[];
  form ?: FormGroup;
  selectedQuocGia ?: number;
  submitted = false;
  constructor(
    private catalogService : CatalogService,
    private formBuilder : FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private modelRef: NzModalRef
    ) { }

  ngOnInit() {
    this.getListQuocGias();
    this.form = this.formBuilder.group({
      idQuocGia: [this.selectedQuocGia, Validators.required],
      maTinhThanh: ['', Validators.required],
      tenTinhThanh: ['', Validators.required],
      soThuTu: 0,
      isVisible: true,
      ghiChu: ['']
    });
  }
  getListQuocGias() {
    const list: List = {
      pageSize: 0,
      pageNumber: 0,
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
  onSubmit(){
    this.submitted = true;
    if(this.form!.invalid){return}
    this.catalogService.createTinhThanh(this.form?.value).subscribe(
      () =>{
        this.notification.success('Thêm mới', 'Thêm tỉnh thành mới thành công');
        this.modelRef.destroy();
      }
    )
  }
  onCancel(){
    this.modelRef.destroy();
  }
  get f() { return this.form!.controls; }
}
