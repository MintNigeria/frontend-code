import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessUploadsComponent } from './success-uploads.component';

describe('SuccessUploadsComponent', () => {
  let component: SuccessUploadsComponent;
  let fixture: ComponentFixture<SuccessUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessUploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
