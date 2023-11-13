import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import React from "react";
import clsx from "classnames";
import { useController, useFormContext } from "react-hook-form";
import type { Noop } from "react-hook-form";

type Size = "sm" | "md" | "lg";
type Color =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "transparent";

export type Props = {
  name: string;
  value?: string;
  size?: Size;
  optional?: boolean;
  color?: Color;
  error?: boolean | string;
  border?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  inputStyles?: string;
  fullWidth?: boolean;
  type?: HTMLInputTypeAttribute;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  onValue?: (value: string) => void;
  onBlur?: Noop;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const Input = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    name,
    placeholder,
    disabled,
    error,
    className,
    border = true,
    inputStyles,
    value = "",
    color = "primary",
    size = "md",
    type,
    inputRef,
    onValue,
    onBlur,
    onKeyDown,
    ...rest
  } = props;

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      typeof onValue === "function" && onValue(e.currentTarget.value);
    },
    [onValue],
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm",
        {
          border: border,
          "border-0 outline-none": !border,
          "border-red-400": error,
          "cursor-not-allowed border-gray-200": disabled,
          "bg-transparent": color === "transparent",
          "bg-white": color === "primary",
        },
        className,
      )}
    >
      <input
        ref={inputRef}
        type={type}
        value={value}
        disabled={disabled}
        className={clsx(
          "w-full rounded-lg border-none py-2 pl-3 pr-3 text-sm leading-5 text-gray-600 focus:outline-none focus:ring-0",
          inputStyles,
        )}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...rest}
      />
    </div>
  );
});
Input.displayName = "Input";

export const FormInput = (props: { name: string } & Props) => {
  const { name, ...rest } = props;

  const { control } = useFormContext();

  const { field } = useController({
    control,
    name,
  });

  const {
    onChange: controlOnChange,
    onBlur: controlOnBlur,
    ...restField
  } = field;

  const handleOnChange = (value: string) => {
    controlOnChange(value);
  };

  return (
    <Input
      onValue={handleOnChange}
      onBlur={controlOnBlur}
      {...restField}
      {...rest}
    />
  );
};
