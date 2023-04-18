import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptServiceComponent } from './transcript-service.component';

describe('TranscriptServiceComponent', () => {
  let component: TranscriptServiceComponent;
  let fixture: ComponentFixture<TranscriptServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
