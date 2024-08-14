import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryComponent } from './order-history.component';
import { TableMenuComponent } from '../../components/table-menu/table-menu.component';
import { TableRowComponent } from '../../components/table-row/table-row.component';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ChangeDetectorRef } from '@angular/core';
import { EventObject } from '../../interfaces/order.interface';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryComponent, TableMenuComponent, TableRowComponent, CommonModule, NzIconModule],
      providers: [ChangeDetectorRef]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onStatusChecked', () => {
    it('should add status if not present', () => {
      const event: EventObject = { type: 'status', value: 'Pending' };
      (component as any).onStatusChecked(event);  // Type assertion to access protected method
      expect((component as any).checkedStatus.has('Pending')).toBeTrue();
    });

    it('should remove status if already present', () => {
      (component as any).checkedStatus.add('Pending');
      const event: EventObject = { type: 'status', value: 'Pending' };
      (component as any).onStatusChecked(event);
      expect((component as any).checkedStatus.has('Pending')).toBeFalse();
    });

    it('should call filterList after status change', () => {
      spyOn((component as any), 'filterList');
      const event: EventObject = { type: 'status', value: 'Pending' };
      (component as any).onStatusChecked(event);
      expect((component as any).filterList).toHaveBeenCalled();
    });
  });

  describe('onProductLineChosen', () => {
    it('should update productLineChosen and call filterList', () => {
      spyOn((component as any), 'filterList');
      const event: EventObject = { type: 'productLine', value: 'Cement' };
      (component as any).onProductLineChosen(event);
      expect((component as any).productLineChosen).toBe('Cement');
      expect((component as any).filterList).toHaveBeenCalled();
    });
  });

  describe('onDateSelected', () => {
    it('should update dateFromPicked when dateFrom is provided', () => {
      const event: EventObject = { type: 'dateFrom', value: '2023-10-01T00:00:00.000Z' };
      (component as any).onDateSelected(event);
      expect((component as any).dateFromPicked.toISOString()).toBe('2023-10-01T00:00:00.000Z');
    });

    it('should update dateToPicked when dateTo is provided', () => {
      const event: EventObject = { type: 'dateTo', value: '2023-10-31T00:00:00.000Z' };
      (component as any).onDateSelected(event);
      expect((component as any).dateToPicked.toISOString()).toBe('2023-10-31T00:00:00.000Z');
    });

    it('should call filterList after date change', () => {
      spyOn((component as any), 'filterList');
      const event: EventObject = { type: 'dateFrom', value: '2023-10-01T00:00:00.000Z' };
      (component as any).onDateSelected(event);
      expect((component as any).filterList).toHaveBeenCalled();
    });
  });

  describe('onSearchActivated', () => {
    it('should update searchActivated and call filterList', () => {
      spyOn((component as any), 'filterList');
      const event: EventObject = { type: 'search', value: 'Fiona' };
      (component as any).onSearchActivated(event);
      expect((component as any).searchActivated).toBe('Fiona');
      expect((component as any).filterList).toHaveBeenCalled();
    });
  });

    it('should filter rowList based on product line', () => {
      (component as any).productLineChosen = 'Cement';
      (component as any).filterList();
      expect((component as any).rowListFiltered.length).toBeGreaterThan(0);
      expect((component as any).rowListFiltered.every((row: { productLine: string; }) => row.productLine === 'Cement')).toBeTrue();
    });

    it('should filter rowList based on date range', () => {
      (component as any).dateFromPicked = new Date('2023-10-01');
      (component as any).dateToPicked = new Date('2023-10-31');
      (component as any).filterList();
      expect((component as any).rowListFiltered.length).toBeGreaterThan(0);
      expect((component as any).rowListFiltered.every((row: { dateRequested: number; }) => row.dateRequested >= (component as any).dateFromPicked && row.dateRequested <= (component as any).dateToPicked)).toBeTrue();
    });

    it('should handle cases with no filters applied', () => {
      (component as any).checkedStatus.clear();
      (component as any).productLineChosen = 'All Product Lines';
      (component as any).dateFromPicked = new Date('1970-01-01');
      (component as any).dateToPicked = new Date('9999-12-31');
      (component as any).searchActivated = '';
      (component as any).filterList();
      expect((component as any).rowListFiltered).toEqual((component as any).rowList);
    });
  });
