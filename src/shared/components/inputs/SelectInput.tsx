import type { UseFormReturn, Path, FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

type Option = { header: React.ReactNode; value: string };

interface Props<T extends FieldValues> {
  label: React.ReactNode;
  placeholder?: React.ReactNode;
  className?: string;
  options: Option[];
  description?: React.ReactNode;
  name: Path<T>;
  form?: UseFormReturn<T>;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

/**
 * Un componente genérico `SelectInput` para renderizar un campo de selección
 * desplegable dentro de un formulario. Este componente se integra con un sistema
 * de control de formularios (por ejemplo, React Hook Form) y soporta opciones
 * dinámicas y descripciones.
 *
 * @template T - Un tipo genérico que extiende `Record<string, any>`. Este tipo
 * representa la estructura del esquema para el campo del formulario. Permite que
 * el componente sea fuertemente tipado basado en el modelo de datos del formulario.
 *
 * @param {Props<T>} props - Las propiedades para el componente `SelectInput`.
 * @param {string} props.label - La etiqueta mostrada encima del campo de selección.
 * @param {string} props.placeholder - El texto de marcador de posición mostrado en el campo de selección.
 * @param {string} props.className - ClassName para el input Select.
 * @param {Array<{ value: string; header: string }>} props.options - Un arreglo de opciones
 * para el campo de selección. Cada opción tiene un `value` (usado como el valor de la opción)
 * y un `header` (mostrado como la etiqueta de la opción).
 * @param {string} [props.description] - Una descripción opcional mostrada debajo del campo de selección.
 * @param {string} props.name - El nombre del campo del formulario, usado para enlazar el input con el esquema del formulario.
 * @param {any} props.form - El objeto del formulario, que incluye el control para manejar el estado del formulario.
 *
 * @returns {JSX.Element} Un elemento JSX que representa el campo de selección.
 *
 * @example
 * ```tsx
 * const form = useForm(); // Instancia de React Hook Form
 * const options = [
 *   { value: 'option1', header: 'Opción 1' },
 *   { value: 'option2', header: 'Opción 2' },
 * ];
 *
 * <SelectInput
 *   label="Selecciona una opción"
 *   placeholder="Elige una opción"
 *   options={options}
 *   name="selectedOption"
 *   form={form}
 * />
 * ```
 */
export const SelectInput = <T extends FieldValues>({
  label,
  placeholder,
  options,
  description,
  name,
  form,
  onValueChange,
  className = "",
  disabled = false,
}: Props<T>) => {
  return (
    <FormField
      name={name}
      control={form?.control} //volvi opcional para probar
      render={({ field }) => (
        <FormItem>
          <FormLabel children={label} />

          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) onValueChange(value);
            }}
            defaultValue={field.value}
            value={options.find((o) => o.value === field.value)?.value || ""}
            disabled={disabled}
          >
            <FormControl className="w-full">
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent
              children={options.map((opt, i) => (
                <SelectItem value={opt.value} children={opt.header} key={i} />
              ))}
              className="max-h-[210px]"
            />
          </Select>

          {description && <FormDescription children={description} />}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
