import { useState } from "react";

import { SelectValue } from "@radix-ui/react-select";
import type { ColumnFiltersState } from "@tanstack/react-table";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/shared/components/ui/select";

import type { FilterProps } from "./datatable.interface";

import { Eraser, Filter as FilterIcon, PlusCircle } from "lucide-react";
import {
  Modal,
  ModalClose,
  ModalFooter,
  ModalTrigger,
  ModalWrapper,
} from "../modal";
import { useDatatableContext } from "./Datatable";

const Filter = ({
  options,
  selectedColumn = { columnId: "", filter: "" },
  onOptionSelected,
  onOptionDropped,
  isDropable = false,
  ...rest
}: FilterProps) => {
  const [selectedCol, setSelectedCol] = useState(selectedColumn);

  const onValueChange = (value: string) => {
    setSelectedCol({ columnId: value, filter: "" });
    onOptionSelected({
      oldColumnId: selectedCol.columnId,
      newColumnId: value,
      filter: "",
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCol({ ...selectedCol, filter: e.target.value });
    onOptionSelected({
      oldColumnId: selectedCol.columnId,
      newColumnId: selectedCol.columnId,
      filter: e.target.value,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <Select
        {...rest}
        onValueChange={onValueChange}
        value={selectedCol.columnId}
      >
        <SelectTrigger
          className="w-[150px]"
          children={<SelectValue placeholder="Seleccione una columna" />}
        />
        <SelectContent>
          <SelectGroup>
            {options.map((optCol, i) => (
              <SelectItem value={optCol} key={i} children={optCol} />
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        value={selectedCol.filter as string}
        onChange={onChange}
        placeholder="Valor a buscar"
        className="flex-1"
      />

      {isDropable && (
        <Button
          className="cursor-pointer p-1"
          onClick={() => {
            onOptionDropped(selectedCol.columnId);
          }}
          variant="link"
          children={<Eraser />}
        />
      )}
    </div>
  );
};

export const FilterTableModal = <TData,>() => {
  const { table, columnFilters, setColumnFilters } =
    useDatatableContext<TData>();

  const [filterDesired, setFilterDesired] =
    useState<ColumnFiltersState>(columnFilters);

  const handleConfirm = () => {
    setColumnFilters(filterDesired);
  };
  const nonFilteredColumns = table
    .getAllColumns()
    .filter((col) => !filterDesired.map((col) => col.id).includes(col.id));

  const addFilter = () => {
    setFilterDesired([
      ...filterDesired,
      { id: nonFilteredColumns[0].id, value: null },
    ]);
  };

  const onOptionSelected = (option: {
    oldColumnId: string;
    newColumnId: string;
    filter: unknown;
  }) => {
    setFilterDesired(
      filterDesired.map((filtCol) =>
        filtCol.id === option.oldColumnId
          ? { id: option.newColumnId, value: option.filter }
          : filtCol
      )
    );
  };

  return (
    <Modal
      onOpenChange={(open) => {
        if (!open) setFilterDesired(columnFilters);
      }}
    >
      <Tooltip>
        <ModalTrigger
          asChild
          children={
            <TooltipTrigger
              asChild
              children={
                <Button
                  children={<FilterIcon />}
                  variant={"link"}
                  className="cursor-pointer text-zinc-500 hover:text-black hover:bg-gray-100 rounded-none"
                />
              }
            />
          }
        />
        <TooltipContent children={"Filtrar"} />
      </Tooltip>

      <ModalWrapper
        title="Filtrar Tabla"
        description="Agregue campos y establezca valores, luego haga click en Aceptar."
      >
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {filterDesired.map((filteredColumn) => {
            return (
              <Filter
                key={filteredColumn.id}
                options={[filteredColumn, ...nonFilteredColumns].map(
                  (opt) => opt.id
                )}
                selectedColumn={{
                  columnId: filteredColumn.id,
                  filter: filteredColumn.value,
                }}
                onOptionSelected={onOptionSelected}
                onOptionDropped={(optionId) => {
                  setFilterDesired(
                    filterDesired.filter((filtCol) => filtCol.id !== optionId)
                  );
                }}
                isDropable={filterDesired.length > 0}
              />
            );
          })}

          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full sm:w-auto"
            onClick={() => addFilter()}
            disabled={table.getAllColumns().length === filterDesired.length}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir filtro
          </Button>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant={"ghost"} className="cursor-pointer">
              Cancelar
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button
              children="Aceptar"
              onClick={handleConfirm}
              className="cursor-pointer"
            />
          </ModalClose>
        </ModalFooter>
      </ModalWrapper>
    </Modal>
  );
};
