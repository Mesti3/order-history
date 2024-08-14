import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'table-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
})
export class TableRowComponent {
  status = input.required<string>();
  orderNumber = input.required<number>();
  productLine = input.required<string>();
  product = input.required<string>();
  quantity = input.required<string>();
  dateRequested = input.required<Date>();

  getColor(status: string): string {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'In Progress':
        return 'blue';
      case 'Completed':
        return 'green';
      default:
        return 'none';
    }
  }
}
