import { Input } from "@/shared/components/ui/input";
import { useDatatableContext } from "./Datatable";

/**
 * Props para el componente DatatableSearch.
 *
 * @property columnID - Debe ser el ID de una columna existente definida en el arreglo de columnas del DataTable. Si el ID no coincide con una columna definida, el filtro no tendrá efecto.
 */
interface DatatableSearchProps {
  columnID: string;
  placeholder?: string;
}

/**
 * Componente de búsqueda para el DataTable.
 *
 * Permite filtrar los datos de una columna específica.
 *
 * @param columnID - El ID de la columna a filtrar. Debe ser un ID válido y existente en la definición de columnas del DataTable.
 */
export const DatatableSearch = <TData,>({ columnID, placeholder }: DatatableSearchProps) => {
  const { setColumnFilters } = useDatatableContext<TData>();
  return (
    <Input
      placeholder={`Filtrar por ${placeholder ?? columnID}...`}
      className="max-w-sm rounded-2xl"
      onChange={(e) => {
        setColumnFilters([{ id: columnID, value: e.target.value }]);
      }}
    />
  );
}