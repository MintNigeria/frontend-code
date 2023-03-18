import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedUploadsComponent } from './failed-uploads.component';

describe('FailedUploadsComponent', () => {
  let component: FailedUploadsComponent;
  let fixture: ComponentFixture<FailedUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedUploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
