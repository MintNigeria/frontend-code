import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptServicesComponent } from './transcript-services.component';

describe('TranscriptServicesComponent', () => {
  let component: TranscriptServicesComponent;
  let fixture: ComponentFixture<TranscriptServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
