import type { ReactElement } from 'react';
import type { UseFormReturn, Path } from 'react-hook-form';

import { Textarea } from '../ui/textarea';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form"

interface Props<T extends Record<string, any>> {
    form:UseFormReturn<T>,
    name:Path<T>,
    label:ReactElement|string,
    placeholder?:string,
    description?:string,
    className?:string
}

export const TextareaInput = <T extends Record<string, any>> ({
    form,
    label,
    name,
    placeholder,
    description,
    className
}: Props<T>) => {
  return (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
        <FormItem>
            <FormLabel> {label} </FormLabel>
            
            <FormControl>
                <Textarea placeholder={placeholder} {...field} className={className} />
            </FormControl>

            { description && <FormDescription> {description} </FormDescription> }
            
            <FormMessage />
        </FormItem>
        )}
    />
  )
}
