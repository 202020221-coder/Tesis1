import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import { useDatatableContext } from "./Datatable";

import { CircleSlash, Loader2 } from "lucide-react";

interface Props {
  classContainer?: string;
  classTable?: string;
  classRow?: string;
  classTableHead?: string;
  classHeader?: string;
  classBody?: string;
  classCell?: string;
  colSpan: number;
  loading?: boolean;
}

export const CustomTable = <IData,>({
  classContainer,
  classTable,
  classHeader,
  classRow,
  classTableHead,
  classBody,
  classCell = "border-t border-gray-200 dark:border-gray-600",
  colSpan,
  loading,
}: Props) => {
  const { table } = useDatatableContext<IData>();

  const rows =  table.getRowModel().rows;
  const columns = table.getHeaderGroups();

  if(loading) return <Loader2 className="animate-spin text-gray-200 mx-auto" size={80} strokeWidth={0.8}/>

  return (
    <div className={`rounded-md border-2 ${classContainer}`}>
      <Table className={classTable}>
        <TableHeader className={`bg-muted ${classHeader}`}>
          {
            columns.map((headerGroup) => (
              <TableRow key={headerGroup.id} className={classRow}>
                {
                  headerGroup.headers.map(({id, column, isPlaceholder, getContext}) => {
                    return (
                      <TableHead key={id} className={classTableHead}>
                        { !isPlaceholder && flexRender(column.columnDef.header, getContext())}
                      </TableHead>
                    );
                  })
                }
              </TableRow>
            ))
          }
        </TableHeader>

        <TableBody className={classBody}>
          { rows?.length ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={classRow}>
                  {
                    row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={classCell}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            ) 
            : (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <CircleSlash className="text-gray-300" size={64} strokeWidth={1.5}/>
                    <p className="text-lg font-semibold text-gray-500">
                      No hay registros disponibles
                    </p>
                    <span className="text-sm text-gray-400">
                      Intenta ajustar los filtros o agregar nuevos datos.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};
