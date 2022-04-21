import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@main-project/notify/data-access/services';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-notify-detail',
  templateUrl: './notify-detail.component.html',
  styleUrls: ['./notify-detail.component.scss']
})
export class NotifyDetailComponent implements OnInit {

  thongBaoClickView : any;

  constructor(
    private notifyService: NotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params.pipe(
    //   switchMap((param) => {
    //     const id = param['id'];
    //     return this.notifyService.getThongBaoClickViews(id)
    //     ;})).subscribe(
    //   (res) => {
    //       const thongBaoClick = res;
    //         this.thongBaoClickView = thongBaoClick
    //         console.log(thongBaoClick);

    //   }
    // )
    this.getThongBaoView(this.route.snapshot.params["id"]);


  }

  getThongBaoView(id: string): void {
  let thongBaoClick :any;
  this.notifyService.getThongBaoClickViews(id)
    .subscribe({
      next: (data) => {
        thongBaoClick = data;
        console.log(thongBaoClick);
      },
      error: (e) => console.error(e)
    });
}

}
