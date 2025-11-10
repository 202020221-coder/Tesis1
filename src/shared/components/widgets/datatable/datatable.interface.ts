import type { SelectProps } from "@radix-ui/react-select";

import type {
  ColumnFiltersState,
  ColumnDef,
  Table as ITable,
  PaginationState,
} from "@tanstack/react-table";

export interface DatatableContextProps<T> {
  table: ITable<T>;
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

/**
 * Propiedades para el componente Datatable.
 *
 * @template TData - El tipo de los elementos de datos en la tabla.
 * @template TValue - El tipo de los valores en las columnas de la tabla.
 *
 * @property {ColumnDef<TData, TValue>[]} columns - Arreglo que define las columnas que se usarán en la tabla.
 * @property {TData[]} data - Datos que se mostrarán en la tabla.
 * @property {string} [subject] - Nombre del objeto fuente para la tabla, especificado en plural. Ejemplo: _Personas_, _Pagos_, etc.
 * @property {IClassName} [className] - Objeto que almacena los classnames para cada elemento hijo del Datatable.
 */
export interface DatatableProps<TData, TValue> {
  /*children: (args:DatatableContextProps<TData>) => JSX.Element;*/
  children: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  //data: TData[]; //lo quite
  dataState: [TData[], React.Dispatch<React.SetStateAction<TData[]>>]; //reemplaze el de arriba por el estado entero
  subject?: string;
  className?: string;
}

// export interface FilterTableModalProps<TData> {
//   table: ITable<TData>;
//   filterState: ColumnFiltersState;
//   setFilterState: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
// }

export interface FilterProps
  extends Omit<React.ComponentProps<React.FC<SelectProps>>, "defaultValue"> {
  options: string[];
  selectedColumn?: { columnId: string; filter: unknown };
  isDropable?: boolean;
  onOptionSelected: (option: {
    oldColumnId: string;
    newColumnId: string;
    filter: unknown;
  }) => void;
  onOptionDropped: (optionId: string) => void;
}

export interface PageNavigatorProps<TData> {
  table: ITable<TData>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export interface PageControlsProps<TData> {
  table: ITable<TData>;
}

export interface RowSetterProps {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export interface DatatablePaginationProps<TData> {
  table: ITable<TData>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export interface FilterTableModalProps<TData> {
  table: ITable<TData>;
  filterState: ColumnFiltersState;
  setFilterState: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}
