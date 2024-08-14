import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TableMenuComponent, TableRowComponent } from '../../components/index';
import { CommonModule } from '@angular/common';
import { OrderRow, EventObject } from '../../interfaces/order.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [TableMenuComponent, TableRowComponent, CommonModule, NzIconModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryComponent {
  /**
   * rowList sets original list for all products
   */
  protected rowList: OrderRow[];
  /**
   * rowListFiltered sets filtered list displayed to user
   */
  protected rowListFiltered: OrderRow[];
  /**
   * CheckedStatus contains check statuses which will be shown in list grid
   * Using set for better performance
   */
  protected checkedStatus: Set<string>;
  /**
   * productLineChosen represents chosen product line defined by user
   */
  protected productLineChosen: string;
  /**
   * dateFromPicked represents start date defined by user
   */
  protected dateFromPicked: Date;
  /**
   * dateToPicked represents end date defined by user
   */
  protected dateToPicked: Date;
  /**
   * searchActivated represents value for searching
   */
  protected searchActivated: string;

  constructor(private changeRef: ChangeDetectorRef) {
    this.rowList = this.rowListFiltered = [
      {
        status: 'In Progress',
        orderNumber: 212215,
        productLine: 'Cement',
        product: '1-53-53-15-531',
        quantity: '2 TN',
        dateRequested: new Date(),
      },
      {
        status: 'Pending',
        orderNumber: 21521,
        productLine: 'Aggregates',
        product: 'Arena',
        quantity: '',
        dateRequested: new Date(),
      },
      {
        status: 'Completed',
        orderNumber: 215215,
        productLine: 'Ready-Mix',
        product: 'Fiona',
        quantity: '10 m3',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'In Progress',
        orderNumber: 512512,
        productLine: 'Aggregates',
        product: 'Arena',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Pending',
        orderNumber: 6868466,
        productLine: 'Cement',
        product: '1-53-53-15-531',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Completed',
        orderNumber: 8757,
        productLine: 'Ready-Mix',
        product: 'Fiona',
        quantity: '10 m3',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'In Progress',
        orderNumber: 385434,
        productLine: 'Cement',
        product: '1-53-53-15-531',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Pending',
        orderNumber: 3554434,
        productLine: 'Aggregates',
        product: 'Arena',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Completed',
        orderNumber: 54343,
        productLine: 'Ready-Mix',
        product: 'Fiona',
        quantity: '10 m3',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'In Progress',
        orderNumber: 4535,
        productLine: 'Cement',
        product: '1-53-53-15-531',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Pending',
        orderNumber: 13513,
        productLine: 'Aggregates',
        product: 'Arena',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
      {
        status: 'Pending',
        orderNumber: 137513,
        productLine: 'Aggregates',
        product: 'Arena Triturada Caliza Malla 4',
        quantity: '2 TN',
        dateRequested: new Date('2023-10-20'),
      },
    ];
    this.checkedStatus = new Set<string>();
    this.productLineChosen = 'All Product Lines';
    this.dateFromPicked = this.dateToPicked = new Date();
    this.searchActivated = '';
  }

  /**
   * onStatusChecked accepts status checked by user for filtering
   * @param value
   * @returns
   */
  onStatusChecked(value: EventObject): void {
    if (value.type !== 'status') return;
    if (this.checkedStatus.has(value.value)) {
      this.checkedStatus.delete(value.value);
    } else {
      this.checkedStatus.add(value.value);
    }
    this.filterList();
  }
  /**
   * onProductLineChosen accepts product line selected for filtering
   * @param value
   * @returns
   */
  onProductLineChosen(value: EventObject): void {
    if (value.type !== 'productLine') return;
    this.productLineChosen = value.value;
    this.filterList();
  }
  /**
   * onDateSelected accepts start and end date for filtering
   * @param value
   * @returns
   */
  onDateSelected(value: EventObject): void {
    if (value.type !== 'dateFrom' && value.type !== 'dateTo') return;
    if (value.type === 'dateFrom') {
      this.dateFromPicked = new Date(value.value);
    } else {
      this.dateToPicked = new Date(value.value);
    }
    this.filterList();
  }
  /**
   * onSearchActivated accepts string for filtering
   * @param value
   * @returns
   */
  onSearchActivated(value: EventObject): void {
    if (value.type !== 'search') return;
    this.searchActivated = value.value;
    this.filterList();
  }
  /**
   * filterList filters original list and seves it to filtered list accoridng to parameters accepted from child components
   * @param
   * @returns
   */
  filterList(): void {
    if (this.searchActivated.length === 0) {
      if (this.productLineChosen === 'All Product Lines') {
        if (this.checkedStatus.size === 0) {
          this.rowListFiltered = [...this.rowList];
        } else {
          this.rowListFiltered = [];
          this.rowListFiltered = this.rowList.filter((row) =>
            this.checkedStatus.has(row.status)
          );
        }
      } else {
        this.rowListFiltered = [];
        if (this.checkedStatus.size === 0) {
          this.rowListFiltered = this.rowList.filter(
            (row) => row.productLine === this.productLineChosen
          );
        } else {
          this.rowListFiltered = this.rowList.filter(
            (row) =>
              this.checkedStatus.has(row.status) &&
              row.productLine === this.productLineChosen
          );
        }
      }
      this.rowListFiltered = this.rowListFiltered.filter(
        (row) =>
          this.dateFromPicked <= row.dateRequested &&
          this.dateToPicked >= row.dateRequested
      );
    } else {
      this.rowListFiltered = this.rowList.filter((row) =>
        row.orderNumber.toString().includes(this.searchActivated)
      );
    }
    this.changeRef.detectChanges();
  }
}
