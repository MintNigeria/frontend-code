import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graduate-talent-search',
  templateUrl: './graduate-talent-search.component.html',
  styleUrls: ['./graduate-talent-search.component.scss']
})
export class GraduateTalentSearchComponent implements OnInit {
  years: Array<any> = [];
  degreeType: any;

  constructor() { }

  ngOnInit(): void {
    let currentYear = new Date().getFullYear();
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)
      // this.years.reverse()


    }
  }

}
