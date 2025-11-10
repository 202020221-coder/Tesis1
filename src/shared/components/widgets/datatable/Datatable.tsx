import { createContext, useContext, useState } from 'react'

import { getCoreRowModel, useReactTable, getPaginationRowModel, type SortingState, getSortedRowModel, getFilteredRowModel, type ColumnFiltersState, type PaginationState} from '@tanstack/react-table'

import type { DatatableProps, DatatableContextProps } from './datatable.interface'

/**
 * Componente `Datatable` para albergar y mostrar datos en una tabla interactiva.
 * Este componente incluye funcionalidades avanzadas como filtrado, ordenamiento,
 * selección de filas y paginación.
 *
 * @template TData - Tipo genérico que representa la estructura de los datos de la tabla.
 * @template TValue - Tipo genérico que representa los valores de las columnas.
 *
 * @param {DatatableProps<TData, TValue>} props - Propiedades del componente.
 * @param {ColumnDef<TData, TValue>[]} props.columns - Definición de las columnas de la tabla.
 * @param {TData[]} props.data - Datos que se mostrarán en la tabla.
 * @param {Object} [props.className] - Clases CSS opcionales para personalizar el estilo del componente.
 *
 * @returns {JSX.Element} Un componente de tabla interactiva con soporte para filtrado,
 * ordenamiento, selección y paginación.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'age', header: 'Age' },
 * ];
 * const data = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 },
 * ];
 *
 * <Datatable columns={columns} data={data} />;
 * ```
 */

export function useDatatableContext<TData> () {
  const ctx = useContext(DatatableContext) as DatatableContextProps<TData> | null
  if (!ctx) throw new Error('Error: El contexto solo puede ser consumido dentro del DatatableContext.Provider')
  return ctx
}

const DatatableContext = createContext<DatatableContextProps<any> | null>(null)

export const Datatable = <TData, TValue>({
  children,
  columns,
  dataState: [data, setData], //ve llevo el estado completo
  className
}: DatatableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]) //para ordenar por columna
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0,pageSize: 10})

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // para la paginacion, implementando paginacion(10 filas x pagina por defecto),
    onSortingChange: setSorting, //implementando ordenamiento y filtrado
    getSortedRowModel: getSortedRowModel(), //para ordenar por columna
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
      pagination: pagination
    }
  })

  return (
    <DatatableContext.Provider
      value={{
        table,
        pagination,
        columnFilters,
        setColumnFilters,
        setPagination,
        setData //agregue
      }}
    >
      <div className={`w-full mx-auto flex flex-col ${className}`}>
        {children}
      </div>
    </DatatableContext.Provider>
  )
}
