import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '@main-project/notify/data-access/services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-notify-detail',
  templateUrl: './notify-detail.component.html',
  styleUrls: ['./notify-detail.component.scss']
})
export class NotifyDetailComponent implements OnInit {

  form ?: FormGroup;

  thongBaoClickView ?: any;
  listDeleteThongBao : string[] = [];
  xacNhanChuaXem : string[] =[];
  constructor(
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getThongBaoView(this.route.snapshot.params["id"]);
  }

  getThongBaoView(id: string): void {
  let thongBaoClick :any;
  this.notifyService.getThongBaoClickViews(id)
    .subscribe(
      (data: any) => {
        thongBaoClick = data;
        this.thongBaoClickView = thongBaoClick.result
        console.log(this.thongBaoClickView);
      }
    );
  }

  xacNhanXoa(id: string){
    if(id){
      this.listDeleteThongBao.push(id);
      this.modal.confirm({
        nzTitle: 'Bạn muốn xóa thông báo này?',
        nzContent: '<b style="color: red;">Xác nhận xóa</b>',
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteThongBao(this.listDeleteThongBao),
        nzCancelText: 'No',
        nzOnCancel: () => this.listDeleteThongBao.pop()
      });
    }
  }

  deleteThongBao(listDeleteThongBao: string[]){
    this.notifyService.deleteThongBaos(listDeleteThongBao).subscribe(
      res => {
        this.message.success('Xóa thành công!!!', { nzDuration: 3000 })
        console.log('complete');
        this.router.navigate(['/notify/page'])
      }
      )

  }

  danhDauChuaDoc(id: string){
    this.xacNhanChuaXem.push(id);
    this.notifyService.updateViewed(this.xacNhanChuaXem, 0).subscribe(
      res=>{
        console.log(res);
      }
    )

  }



}
