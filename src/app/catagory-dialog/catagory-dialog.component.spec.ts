import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryDialogComponent } from './catagory-dialog.component';

describe('CatagoryDialogComponent', () => {
  let component: CatagoryDialogComponent;
  let fixture: ComponentFixture<CatagoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
