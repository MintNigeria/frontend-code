import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';

@Component({
  selector: 'app-view-failed-data',
  templateUrl: './view-failed-data.component.html',
  styleUrls: ['./view-failed-data.component.scss']
})
export class ViewFailedDataComponent implements OnInit {
  failedData: any;
  id: any;
  page: number = 1;
  totalCount: any;
  pageIndex = 1;
  pageSize = 10;
  filter = {
   
      pageSize: 10,
      pageIndex: 1,
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graduateService: GraduatesService,
    

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getAllFailedRecord(this.id, this.filter)
  }
  
  getAllFailedRecord(id: any, params: any ) {
    this.graduateService.getFailedGraduateInABatch(id, params).subscribe((res: any) => {
      this.failedData = res.payload;
      this.totalCount = res.totalCount;
  
    })

  }
  goBack() {
    window.history.back()
  }

  
  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.filter = filter
    this.getAllFailedRecord(this.id, this.filter)
  }
  
  selectRecordCount(event: any) {
    this.pageSize = event.value
    const filter = {...this.filter, ['pageSize'] : event.value}
    this.filter = filter
    this.getAllFailedRecord(this.id, this.filter)

  }

}
