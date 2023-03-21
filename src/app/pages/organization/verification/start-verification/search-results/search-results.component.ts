import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchResults = [
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    },
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    },
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
