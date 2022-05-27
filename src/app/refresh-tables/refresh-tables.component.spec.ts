import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTablesComponent } from './refresh-tables.component';

describe('RefreshTablesComponent', () => {
  let component: RefreshTablesComponent;
  let fixture: ComponentFixture<RefreshTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
