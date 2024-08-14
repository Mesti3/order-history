# Order History Management App

# Overview

The Order History Management Angular App is a web application built with Angular that allows users to view and manage order history. The application displays a list of orders with details such as status, order number, product line, product, quantity, and date requested. Users can filter the list of orders based on various criteria and view detailed information in a structured format.

# Features

## View Order History: Displays a table of orders with columns for status, order number, product line, product, quantity, and date requested.
## Filter Orders: Allows users to filter the orders based on status and product line.
## Responsive Design: Adapts the layout for different screen sizes using media queries.

# Application structure

The project is organized into the following main components:

## app.component.ts: The root component of the application.
## order-history.component.ts: Manages the display and filtering of the order history.
## table-row.component.ts: Represents a single row in the order history table.
## table-menu.component.ts: Provides menu options for filtering and managing the order history.
## order.interface.ts: Defines the structure of an order object.

# Usage

## Development server

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` or `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
