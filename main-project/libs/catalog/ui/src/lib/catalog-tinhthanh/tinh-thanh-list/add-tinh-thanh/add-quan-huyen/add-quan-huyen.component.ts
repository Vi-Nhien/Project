import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CatalogService, List, QuocGia } from '@main-project/catalog/data-access/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-quan-huyen',
  templateUrl: './add-quan-huyen.component.html',
  styleUrls: ['./add-quan-huyen.component.scss']
})
export class AddQuanHuyenComponent implements OnInit {

  @Input() itemTinhThanh: any;
  quocGias?: QuocGia[];
  form?: FormGroup;
  selectedQuocGia?: number;
  submitted = false;
  QuanHuyen: any = [];
  constructor(
    private catalogService: CatalogService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private modelRef: NzModalRef
  ) {
  }

  ngOnInit() {
    this.getListQuocGias();
    // this.form = this.formBuilder.group({
    //
    //   maQuanHuyen: ['', Validators.required],
    //   tenQuanHuyen: ['', Validators.required],
    //   ghiChu: ['']
    // });
    this.form = this.formBuilder.group({
      maTinhThanh: [this.itemTinhThanh.maTinhThanh, Validators.required],
      tenTinhThanh: [this.itemTinhThanh.tenTinhThanh, Validators.required],
      createQuanHuyen :  this.formBuilder.array([this.addProductFormGroup]),
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
  onSubmit() {
    this.submitted = true;
    if (this.form?.invalid) { return }
    // const creds = this.form?.controls['createQuanHuyen'] as FormArray;
    // console.log(creds)
    console.log(this.form?.value.createQuanHuyen)
  }
  onCancel() {
    this.modelRef.destroy();
  }
  get f() { return this.form?.controls; }

  delete(i: any) {
    const creds = this.form?.controls['createQuanHuyen'] as FormArray;
      creds.removeAt(i);
  }

  addNew() {
    // const creds = this.form?.controls['createQuanHuyen'] as FormArray;
    // creds.push(this.formBuilder.group({
    //   maTinhThanh: [this.itemTinhThanh.maTinhThanh, Validators.required],
    //   tenTinhThanh: [this.itemTinhThanh.tenTinhThanh, Validators.required],
    //   maQuanHuyen: ['', Validators.required],
    //   tenQuanHuyen: ['', Validators.required],
    //   ghiChu: ['']
    // }));
    (<FormArray>this.form?.get("createQuanHuyen")).push(
      this.addProductFormGroup());
  }

  addProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      maTinhThanh: [this.itemTinhThanh.maTinhThanh, Validators.required],
      tenTinhThanh: [this.itemTinhThanh.tenTinhThanh, Validators.required],
      maQuanHuyen: ['', Validators.required],
      tenQuanHuyen: ['', Validators.required],
      ghiChu: ['']
    });
  }

  getControls() {
    return (this.form?.get('createQuanHuyen') as FormArray).controls;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.QuanHuyen, event.previousIndex, event.currentIndex);
  }
}
