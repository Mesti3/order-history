import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from './table-row.component';
import { ComponentRef } from '@angular/core';

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;
  let componentRef: ComponentRef<TableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TableRowComponent],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('status', 'Pending');
    componentRef.setInput('orderNumber', '123456');
    componentRef.setInput('productLine', 'Cement');
    componentRef.setInput('product', 'Product XYZ');
    componentRef.setInput('quantity', '5');
    componentRef.setInput('dateRequested', new Date());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getColor', () => {
    it('should return orange for status "Pending"', () => {
      const result = component.getColor('Pending');
      expect(result).toBe('orange');
    });

    it('should return blue for status "In Progress"', () => {
      const result = component.getColor('In Progress');
      expect(result).toBe('blue');
    });

    it('should return green for status "Completed"', () => {
      const result = component.getColor('Completed');
      expect(result).toBe('green');
    });

    it('should return "none" for unknown status', () => {
      const result = component.getColor('Unknown Status');
      expect(result).toBe('none');
    });
  });
});
