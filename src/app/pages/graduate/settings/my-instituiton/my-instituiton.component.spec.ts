import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInstituitonComponent } from './my-instituiton.component';

describe('MyInstituitonComponent', () => {
  let component: MyInstituitonComponent;
  let fixture: ComponentFixture<MyInstituitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInstituitonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInstituitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
