import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDownloadComponent } from './document-download.component';

describe('DocumentDownloadComponent', () => {
  let component: DocumentDownloadComponent;
  let fixture: ComponentFixture<DocumentDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
