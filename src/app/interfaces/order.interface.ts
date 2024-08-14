/**
 * Represents a single order entry in the system.
 */
export interface OrderRow {
  /**
   * The status of the order (e.g., 'Pending', 'In Progress', 'Completed').
   */
  status: string;

  /**
   * The unique identifier for the order.
   */
  orderNumber: number;

  /**
   * The product line to which the order belongs (e.g., 'Ready-Mix', 'Cement', 'Aggregates').
   */
  productLine: string;

  /**
   * The specific product identifier or name.
   */
  product: string;

  /**
   * The quantity of the product ordered.
   */
  quantity: string;

  /**
   * The date when the order was requested.
   */
  dateRequested: Date;
}

/**
 * Represents an event object containing a value and a type for use in event emission and handling.
 */
export interface EventObject {
  /**
   * The value associated with the event. It could be a string representing various types of data such as status, product line, or search term.
   */
  value: string;

  /**
   * The type of the event, indicating what kind of data the value represents. For example, it could be 'status', 'productLine', 'dateFrom', 'dateTo', or 'search'.
   */
  type: string;
}
