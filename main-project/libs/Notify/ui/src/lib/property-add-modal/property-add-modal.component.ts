import { NotifyService } from 'libs/Notify/data-access/services/src/lib/notify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'main-project-property-add-modal',
  templateUrl: './property-add-modal.component.html',
  styleUrls: ['./property-add-modal.component.scss']
})
export class PropertyAddModalComponent implements OnInit {

  form ?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notifyService : NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({

      maTinhChat: ['', Validators.required],
      tenTinhChat: ['', Validators.required],
      maMau: ['', Validators.required],
      ghiChu: ['' ],
      soThuTu: [''],
      isVisible: false
    })
  }

  onSubmit(){
    console.log(this.form);
    this.notifyService. createThongBaoTinhChat(this.form?.value).subscribe(
      Response =>{
        console.log(Response);
      }
    )
  }

}
