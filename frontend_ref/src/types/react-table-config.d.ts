// import {
//   UseColumnOrderInstanceProps,
//   UseColumnOrderState,
//   UseExpandedHooks,
//   UseExpandedInstanceProps,
//   UseExpandedOptions,
//   UseExpandedRowProps,
//   UseExpandedState,

//   UseGroupByCellProps,
//   UseGroupByColumnOptions,
//   UseGroupByColumnProps,
//   UseGroupByHooks,
//   UseGroupByInstanceProps,
//   UseGroupByOptions,
//   UseGroupByRowProps,
//   UseGroupByState,

//   UseResizeColumnsColumnOptions,
//   UseResizeColumnsColumnProps,
//   UseResizeColumnsOptions,
//   UseResizeColumnsState,
//   UseRowSelectHooks,
//   UseRowSelectInstanceProps,
//   UseRowSelectOptions,
//   UseRowSelectRowProps,
//   UseRowSelectState,
//   UseRowStateCellProps,
//   UseRowStateInstanceProps,
//   UseRowStateOptions,
//   UseRowStateRowProps,
//   UseRowStateState,
//   UseSortByColumnOptions,
//   UseSortByColumnProps,
//   UseSortByHooks,
//   UseSortByInstanceProps,
//   UseSortByOptions,
//   UseSortByState,
// } from "react-table";

// declare module "react-table" {
//   // take this file as-is, or comment out the sections that don't apply to your plugin configuration

//   export interface TableOptions<
//     D extends Record<string, unknown>
//   > extends UseExpandedOptions<D>,
//
//       UseGroupByOptions<D>,
//       UsePaginationOptions<D>,
//       UseResizeColumnsOptions<D>,
//       UseRowSelectOptions<D>,
//       UseRowStateOptions<D>,
//       UseSortByOptions<D>,
//       // note that having Record here allows you to add anything to the options, this matches the spirit of the
//       // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
//       // feature set, this is a safe default.
//       Record<string, any> {}

//   export interface Hooks<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends UseExpandedHooks<D>,
//       UseGroupByHooks<D>,
//       UseRowSelectHooks<D>,
//       UseSortByHooks<D> {}

//   export interface TableInstance<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends UseColumnOrderInstanceProps<D>,
//       UseExpandedInstanceProps<D>,
//
//       UseGroupByInstanceProps<D>,
//       UsePaginationInstanceProps<D>,
//       UseRowSelectInstanceProps<D>,
//       UseRowStateInstanceProps<D>,
//       UseSortByInstanceProps<D> {}

//   export interface TableState<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends UseColumnOrderState<D>,
//       UseExpandedState<D>,
//
//       UseGroupByState<D>,
//       UsePaginationState<D>,
//       UseResizeColumnsState<D>,
//       UseRowSelectState<D>,
//       UseRowStateState<D>,
//       UseSortByState<D> {}

//   export interface ColumnInterface<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends
//
//       UseGroupByColumnOptions<D>,
//       UseResizeColumnsColumnOptions<D>,
//       UseSortByColumnOptions<D> {}

//   export interface ColumnInstance<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends
//       UseGroupByColumnProps<D>,
//       UseResizeColumnsColumnProps<D>,
//       UseSortByColumnProps<D> {}

//   export interface Cell<
//     D extends Record<string, unknown> = Record<string, unknown>,
//     V = any
//   > extends UseGroupByCellProps<D>,
//       UseRowStateCellProps<D> {}

//   export interface Row<
//     D extends Record<string, unknown> = Record<string, unknown>
//   > extends UseExpandedRowProps<D>,
//       UseGroupByRowProps<D>,
//       UseRowSelectRowProps<D>,
//       UseRowStateRowProps<D> {}
// }
import {
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
} from "react-table";

declare module "react-table" {
  export interface TableOptions<
    D extends Record<string, unknown>
  > extends UseSortByOptions<D>,
      UseFiltersOptions<D>,
      UsePaginationOptions<D>,
      UseGlobalFiltersOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseFiltersInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByState<D>,UsePaginationState<D>,
      UseGlobalFiltersState<D>,
      UseFiltersState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseFiltersColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnProps<D>,
      UseFiltersColumnProps<D> {}
}
