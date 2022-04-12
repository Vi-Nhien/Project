import { NotifyService } from 'libs/Notify/data-access/services/src/lib/notify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'main-project-property-add-modal',
  templateUrl: './property-add-modal.component.html',
  styleUrls: ['./property-add-modal.component.scss']
})
export class PropertyAddModalComponent implements OnInit {

  newThongBaoTinhChat ?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notifyService : NotifyService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.newThongBaoTinhChat = this.fb.group({

      maTinhChat: ['', Validators.required],
      tenTinhChat: ['', Validators.required],
      maMau: ['', Validators.required],
      ghiChu: ['' ],
      soThuTu: [''],
      isVisible: false
    })
  }

  completeMessage(): void {
    this.message.success('tạo thành công!!!');
  }
  errorMessage(): void {
    this.message.error('tạo không thành công!!!');
  }

  onSubmit(){
    console.log(this.newThongBaoTinhChat);
    this.notifyService. createThongBaoTinhChat(this.newThongBaoTinhChat?.value).subscribe(
      Response =>{
        console.log(Response);
        this.completeMessage();
      },
      error =>{
        this.errorMessage();
      }
    )
  }

}
