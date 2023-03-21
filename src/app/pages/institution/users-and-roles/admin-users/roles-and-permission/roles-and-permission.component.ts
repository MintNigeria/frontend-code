import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-roles-and-permission',
  templateUrl: './roles-and-permission.component.html',
  styleUrls: ['./roles-and-permission.component.scss']
})
export class RolesAndPermissionComponent implements OnInit {

  changesConfirmed = "changesConfirmed";

  selectedOption: string = "All";
  selectedInstitution : string = "All";
  gradYear : string = "All";
  superAdminFilter: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All'};
  filterSector = { gradYear: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {facultyFilter: 'All'};


  editForm: FormGroup;

  superAdmin: boolean = true ;
  records: boolean = false;
  functionalAdmin: boolean = false;
  audit: boolean = false;
  management: boolean = false;
  newAdmin: boolean = false;
  

  superAdminEdit: boolean = false;
  setupToggle:boolean = true;
  editToggle:boolean = false;
  editToggleType:boolean = false;
  editToggleName: boolean = false;
  editToggleSector: boolean = false;
  
  rolesList = [
    {
      email: 'olivia@unilag.com',
      identity: 'You',
      superadmin: 'University of Lagos'
    }
  ]

  superAdminList = [
    { 
      id: 1,
      superAdmin: 'Art',
      departmentCount: '1',
      department: 'Accounting',
      functionalAdmin: 'Phoenix Baker',
      functionalEmail: 'phoenix@unilag.com',
      remove: 'Remove',
      edit: 'Edit',
    },
    {
      id: 2,
      superAdmin: 'Education',
      departmentCount: '0',
      department: 'Banking and Finance ',
      functionalAdmin: 'Lana Steiner',
      functionalEmail: 'lana@unilag.com',
      remove: 'Remove',
      edit: 'Edit',
    },
    {
      id: 3,
      superAdmin: 'Management Sciences',
      departmentCount: '2',
      department: 'History and International Study'
    }

  ]

  constructor(private readonly formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      superAdminName: ['', Validators.required],
      departmentName: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
  }

  ngOnInit(): void {
  }

  activatesuperAdmin(){
    this.superAdmin = true;
    this.audit = false
    this.records = false;
    this.functionalAdmin = false;
    this.management = false;
    this.newAdmin = false;

  }

  activatedegreeType(){
    this.superAdmin = false;
    this.audit = false;
    this.records = true;
    this.functionalAdmin = false;
    this.management = false;
    this.newAdmin = false;

  }

  activateDepartment(){
    this.superAdmin = false;
    this.audit = false;
    this.records = false;
    this.functionalAdmin = true;
    this.management = false;
    this.newAdmin = false;

  }

  activateAudit(){
    this.superAdmin = false;
    this.audit = true;
    this.records = false;
    this.functionalAdmin = false;
    this.management = false;
    this.newAdmin = false;

  }

  activateManagement(){
    this.superAdmin = false;
    this.audit = false;
    this.records = false;
    this.functionalAdmin = false;
    this.management = true;
    this.newAdmin = false;

  }

  activateNewAdmin(){
    this.superAdmin = false;
    this.audit = false;
    this.records = false;
    this.functionalAdmin = false;
    this.management = false;
    this.newAdmin = true;

  }

  activateEditsuperAdmin(){
    this.editToggle= true;
    this.setupToggle=false
  }

  activateEditDepartment(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = true;
    this.editToggleName = false;
    this.editToggleSector = false;
  }

  activateEditInstName(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = false;
    this.editToggleName = true;
    this.editToggleSector = false;
  }

  activateEditInstSector(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = false;
    this.editToggleName = false;
    this.editToggleSector = true;
  }

  goBack() {
  window.history.back();
}

  addFilter() {
    if (this.status !== 'All') {
      this.filterStatus['status'] = this.status;
    }
    if (this.selectedOption !== 'All Time') {
      this.filterOption['selectedOption'] = this.selectedOption;
    }
    if (this.gradYear !== 'All') {
      this.filterSector['gradYear'] = this.gradYear;
    }
    if (this.selectedInstitution !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    }
    if (this.superAdminFilter !== 'All') {
      this.filterDocument['facultyFilter'] = this.superAdminFilter;
    }
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

  removeUser(user: any) {
  const index = this.superAdminList.indexOf(user);
  if (index !== -1) {
    this.superAdminList.splice(index, 1);
  }
}

}
