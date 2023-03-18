import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUploadsComponent } from './confirm-uploads.component';

describe('ConfirmUploadsComponent', () => {
  let component: ConfirmUploadsComponent;
  let fixture: ComponentFixture<ConfirmUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
