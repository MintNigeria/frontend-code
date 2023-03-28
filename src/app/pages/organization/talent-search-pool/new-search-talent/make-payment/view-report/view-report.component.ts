import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedInstitution : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};


  filter= {
    'TimeBoundSearchVm.TimeRange': 0,
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
   }

  


  generatedList = [
  {
    id: '1',
    name:'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  },
  {
    id: '2',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  },
  {
    id: '3',
    name:'Adekunle Ciroma',
    faculty: 'Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  },
  {
    id: '4',
    name:'Adekunle Ciroma',
    faculty: 'Art',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  },
  {
    id: '5',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  },
  {
    id: '6',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2',
    gender: 'male'
  }
 ]

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addFilter() {
    if (this.status !== 'All') {
      this.filterStatus['status'] = this.status;
    }
    if (this.selectedOption !== 'All Time') {
      this.filterOption['selectedOption'] = this.selectedOption;
    }
    if (this.selectedSector !== 'All') {
      this.filterSector['selectedSector'] = this.selectedSector;
    }
    if (this.selectedInstitution !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }
    
    //console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedInstitution = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
  }

  goBack() {
  window.history.back();
  }

  changeRange(range: number, name: string) {
    this.selectedOption = name
    if (range === 5) {
      // launch calender
      const dialogRef = this.dialog.open(DateRangeComponent, {
        // width: '600px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
              const {start , end} = res; // use this start and end as fromDate and toDate on your filter
              this.selectedOption = `${start} - ${end}`
              const filter = {...this.filter, ['TimeBoundSearchVm.FromDate'] : start, ['TimeBoundSearchVm.ToDate'] : end}
              this.filter = filter;
        }
  
      })
    } else {
      const filter = {...this.filter, ['range'] : range};
      this.filter = filter;
    }
  }


}
