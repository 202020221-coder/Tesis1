import type{ ReactNode } from "react";

import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

import { Form } from "@/shared/components/ui/form";

interface Props<TFieldValues extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode[] | ReactNode;
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  noValidate?: boolean;
}

export const FormWrapper = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  noValidate = false,
  className,
  ...rest
}: Props<TFieldValues>) => {
  return (
    <Form {...form}>
      <form
        noValidate={noValidate}
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full px-2 ${className}`}
        {...rest}
      />
    </Form>
  );
};
