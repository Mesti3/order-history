import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableMenuComponent } from './table-menu.component';

describe('TableMenuComponent', () => {
  let component: TableMenuComponent;
  let fixture: ComponentFixture<TableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NzDatePickerModule,
        NzInputModule,
        NzIconModule,
        TableMenuComponent,
      ],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit statusEvent when onChangeStatus is called', () => {
    spyOn(component.statusEvent, 'emit');
    const mockEvent = { target: { value: 'Pending' } } as unknown as Event;
    component.onChangeStatus(mockEvent);
    expect(component.statusEvent.emit).toHaveBeenCalledWith({
      type: 'status',
      value: 'Pending',
    });
  });

  it('should emit productLineEvent when onChangeProductLine is called', () => {
    spyOn(component.productLineEvent, 'emit');
    const mockEvent = { target: { value: 'Cement' } } as unknown as Event;
    component.onChangeProductLine(mockEvent);
    expect(component.productLineEvent.emit).toHaveBeenCalledWith({
      type: 'productLine',
      value: 'Cement',
    });
  });

  it('should emit dateFromEvent when onChangeDateFrom is called', () => {
    spyOn(component.dateFromEvent, 'emit');
    const mockDate = new Date(2023, 7, 14);
    (component as any).dateFrom = mockDate;
    component.onChangeDateFrom(mockDate);
    expect(component.dateFromEvent.emit).toHaveBeenCalledWith({
      type: 'dateFrom',
      value: mockDate.toISOString(),
    });
  });

  it('should emit dateToEvent when onChangeDateTo is called', () => {
    spyOn(component.dateToEvent, 'emit');
    const mockDate = new Date(2023, 7, 20);
    (component as any).dateTo = mockDate;
    component.onChangeDateTo(mockDate);
    expect(component.dateToEvent.emit).toHaveBeenCalledWith({
      type: 'dateTo',
      value: mockDate.toISOString(),
    });
  });

  it('should emit searchEvent when onChangeSearch is called', () => {
    spyOn(component.searchEvent, 'emit');
    const mockEvent = { target: { value: 'Product A' } } as unknown as Event;
    component.onChangeSearch(mockEvent);
    expect(component.searchEvent.emit).toHaveBeenCalledWith({
      type: 'search',
      value: 'Product A',
    });
  });
});
