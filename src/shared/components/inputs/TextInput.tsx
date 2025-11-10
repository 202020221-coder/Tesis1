import type { UseFormReturn, Path } from 'react-hook-form';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import { Input } from '../ui/input';
import type { ReactElement } from 'react';

interface Props<T extends Record<string, any>> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
    type?:'text'|'email'|'password'|'date'|'month'|'number'|'file',
    form:UseFormReturn<T>,
    name:Path<T>,
    label:ReactElement|string,
    placeholder?:string,
    description?:string,
    className?:string,
    disabled?: boolean,
}

export const TextInput = <T extends Record<string, any>> ({ 
    type = 'text',
    form,
    label,
    name,
    placeholder,
    description,
    className,
    disabled = false,
    ...rest
}:Props<T>) => {
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel> {label} </FormLabel>
            
            <FormControl>
                <Input type={type} placeholder={placeholder} disabled={ disabled } {...field} {...rest} className={className} />
            </FormControl>

            { description && <FormDescription> {description} </FormDescription> }
            
            <FormMessage />
        </FormItem>
    )}/>
  )
}