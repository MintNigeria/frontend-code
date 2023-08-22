import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  filter = {
  institutionId: '',
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    status: 1,
}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graduateService: GraduatesService,
    
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.graduateService.getGraduateInABatch(id).subscribe((res: any) => {
      console.log(res)
    })
  }

}
