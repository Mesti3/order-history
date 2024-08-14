import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EventObject } from '../../interfaces/order.interface';

@Component({
  selector: 'table-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerComponent,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './table-menu.component.html',
  styleUrl: './table-menu.component.scss',
})
export class TableMenuComponent implements OnInit {
  /**
   * statusList contains list of possible states of the product purchased by customer
   */
  protected statusList: string[];
  /**
   * dateFrom defines start date for filtering
   */
  protected dateFrom: Date;
  /**
   * dateTo defines end date for filtering
   */
  protected dateTo: Date;
  /**
   * statusEvent sends active status for filtering
   */
  @Output() statusEvent: EventEmitter<EventObject>;
  /**
   * productLineEvent sends selected Product line for filtering
   */
  @Output() productLineEvent: EventEmitter<EventObject>;
  /**
   * dateFromEvent sends start date for filtering
   */
  @Output() dateFromEvent: EventEmitter<EventObject>;
  /**
   * dateToEvent sends end date for filtering
   */
  @Output() dateToEvent: EventEmitter<EventObject>;
  /**
   * searchEvent sends data to filter by name of the product
   */
  @Output() searchEvent: EventEmitter<EventObject>;

  constructor() {
    this.statusList = ['Pending', 'In Progress', 'Completed'];
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.statusEvent =
      this.productLineEvent =
      this.dateFromEvent =
      this.dateToEvent =
      this.searchEvent =
        new EventEmitter<EventObject>();
  }

  ngOnInit(): void {
    let dateFrom: EventObject = {
      type: 'dateFrom',
      value: this.dateFrom.toISOString(),
    };
    this.dateFromEvent.emit(dateFrom);
    let dateTo = { type: 'dateTo', value: this.dateTo.toISOString() };
    this.dateToEvent.emit(dateTo);
  }

  /**
   * onChangeStatus emits activated status
   * @param event
   */
  onChangeStatus(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value: EventObject = { type: 'status', value: target.value };
    this.statusEvent.emit(value);
  }
  /**
   * onChangeProductLine emits selected product line
   * @param event
   */
  onChangeProductLine(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value: EventObject = { type: 'productLine', value: target.value };
    this.productLineEvent.emit(value);
  }
  /**
   * onChangeDateFrom emits start date
   * @param date
   */
  onChangeDateFrom(date: Date): void {
    let value: EventObject = { type: 'dateFrom', value: date.toISOString() };
    this.dateFromEvent.emit(value);
  }
  /**
   * onChangeDateTo emits end date
   * @param date
   */
  onChangeDateTo(date: Date): void {
    let value: EventObject = { type: 'dateTo', value: date.toISOString() };
    this.dateToEvent.emit(value);
  }
  /**
   * onChangeSearch emits searching phrase
   * @param event
   */
  onChangeSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value: EventObject = { type: 'search', value: target.value };
    this.searchEvent.emit(value);
  }
}
