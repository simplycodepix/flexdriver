import React from "react";
import { useController, useFormContext } from "react-hook-form";
import type { ChangeEvent } from "react";

export type CheckboxProps = {
  id?: string;
  name: string;
  label?: string;
  description?: string;
  checked?: boolean;
  onValue?: (checked: boolean) => void;
};

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  (props, ref) => {
    const { id, name, label, description, checked, onValue } = props;

    const handleChange = React.useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        typeof onValue === "function" && onValue(e.currentTarget.checked);
      },
      [onValue],
    );

    return (
      <div className="inline-flex w-auto items-start" ref={ref}>
        <div className="flex h-5 items-center">
          <input
            checked={checked}
            id={id}
            name={name}
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <label htmlFor={id} className="ml-3 space-y-2">
          {label && (
            <span className="block text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {description && (
            <small className="block text-sm  text-gray-500">
              {description}
            </small>
          )}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export const FormCheckbox = (props: CheckboxProps) => {
  const { name, ...rest } = props;

  const { control } = useFormContext();

  const { field } = useController({
    control,
    name,
  });
  const { onChange: controlOnChange, ...restField } = field;

  const handleOnChange = (value: boolean) => {
    controlOnChange(value);
  };

  return (
    <Checkbox
      onValue={handleOnChange}
      checked={!!field.value || false}
      {...restField}
      {...rest}
    />
  );
};
