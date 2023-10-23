import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type {
  EventType,
  FieldPath,
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  DeepPartial,
  Resolver,
  ValidationMode,
  DefaultValues,
} from "react-hook-form";

type ChildrenFunc<TFormValues extends FieldValues> = (
  methods: UseFormReturn<TFormValues>,
) => React.ReactNode;

type FormProps<TFormValues extends FieldValues> = {
  form?: UseFormReturn<TFormValues>;
  id?: string;
  validationMode?: keyof ValidationMode;
  schema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit?: SubmitHandler<TFormValues>;
  onChange?: (
    values: DeepPartial<TFormValues>,
    info: {
      name?: FieldPath<FieldValues>;
      type?: EventType;
      value?: unknown;
    },
  ) => void;
  children: React.ReactNode | ChildrenFunc<TFormValues>;
  resolver?: Resolver<TFormValues, unknown>;
};

export const Form = <TFormValues extends Record<string, unknown>>({
  onSubmit,
  children,
  onChange,
  schema,
  defaultValues,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (!onChange) return;
    const subscription = methods.watch((value, info) => {
      typeof onChange === "function" && onChange(value, info);
    });
    return () => subscription.unsubscribe();
  }, [methods, onChange]);

  return (
    <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        {typeof children === "function" ? children(methods) : children}
      </FormProvider>
    </form>
  );
};
