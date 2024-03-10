import React from "react";
import clsx from "classnames";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonColor = "primary" | "secondary" | "warning" | "danger";

export type ButtonProps = {
  className?: string;
  type?: "button" | "submit";
  id?: string;
  to?: string;
  disabled?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  startAdornment?: React.ReactNode | string | null;
  endAdornment?: React.ReactNode | string | null;
  children: React.ReactNode | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      size = "md",
      className,
      startAdornment,
      endAdornment,
      disabled,
      color = "primary",
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        className={clsx(
          `inline-flex items-center justify-center rounded-md border text-white transition focus:outline-none`,
          {
            ["px-3 py-1.5 text-xs"]: size === "sm",
            ["h-10 px-4 py-2 text-sm"]: size === "md",
            ["px-4 py-2.5 text-base"]: size === "lg",
            ["focus:ring-2"]: !disabled,
            ["border-blue-700 bg-blue-700 hover:border-blue-800 hover:bg-blue-800"]:
              !disabled && color === "primary",
            ["border-gray-600 bg-gray-600 hover:border-blue-700 hover:bg-blue-700"]:
              !disabled && color === "secondary",
            ["border-red-800 bg-red-800 hover:border-red-900 hover:bg-red-900"]:
              !disabled && color === "danger",
            ["bg-gray-200"]: disabled,
          },
          className,
        )}
        type="button"
        {...rest}
      >
        <div className={"flex items-center"}>
          {startAdornment && (
            <span className="-ml-1 mr-1.5">{startAdornment}</span>
          )}
          <span>{children}</span>
          {endAdornment && <span className="-mr-1 ml-1.5">{endAdornment}</span>}
        </div>
      </button>
    );
  },
);
Button.displayName = "Button";
