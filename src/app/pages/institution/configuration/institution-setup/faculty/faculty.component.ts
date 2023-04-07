import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  facultyList = [
    {
      faculty: 'Art',
      departmentCount: '1',
      department: 'Accounting'
    },
    {
      faculty: 'Education',
      departmentCount: '0',
      department: 'Banking and Finance '
    },
    {
      faculty: 'Management Sciences',
      departmentCount: '2',
      department: 'History and International Study'
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

  activateEditFaculty(){
    
  }

}
