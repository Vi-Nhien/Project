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
  formGroup ?: FormGroup;
  selectedQuocGia ?: number;
  constructor(
    private catalogService : CatalogService,
    private formBuilder : FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private modelRef: NzModalRef
    ) { }

  ngOnInit() {
    this.getListQuocGias();
    this.formGroup = this.formBuilder.group({
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
    // console.log(this.formGroup?.value);
    this.catalogService.createTinhThanh(this.formGroup?.value).subscribe(
      () =>{
        this.notification.success('Thêm mới', 'Thêm tỉnh thành mới thành công');
        this.modelRef.destroy();
      }
    )
  }

}
