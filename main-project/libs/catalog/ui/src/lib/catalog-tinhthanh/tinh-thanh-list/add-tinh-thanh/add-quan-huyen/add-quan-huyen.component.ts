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
  form!: FormGroup;
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

    this.form = this.formBuilder.group({
      maTinhThanh: [this.itemTinhThanh.maTinhThanh, Validators.required],
      tenTinhThanh: [this.itemTinhThanh.tenTinhThanh, Validators.required],
      createQuanHuyen :  this.formBuilder.array([this.addProductFormGroup()]),
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
    this.QuanHuyen = this.form?.value;
    console.log("Quận huyện add list:",this.QuanHuyen);
    console.log(this.f)
  }
  onCancel() {
    this.modelRef.destroy();
  }
  get f() { return (this.form?.get("createQuanHuyen") as FormArray); }

  delete(i: any) {
    const creds = this.form?.controls['createQuanHuyen'] as FormArray;
    creds.removeAt(i);
  }

  addNew() {
    (<FormArray>this.form?.get("createQuanHuyen")).push(
      this.addProductFormGroup());
  }

  addProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      maQuanHuyen: ['', Validators.required],
      tenQuanHuyen: ['', Validators.required],
      ghiChu: ['']
    });
  }

  getControls() {
    return (this.form?.get('createQuanHuyen') as FormArray).controls;
  }
  drop(event: CdkDragDrop<string[]>) {
    const i  = this.getControls();
    moveItemInArray(i, event.previousIndex, event.currentIndex);
  }
}
