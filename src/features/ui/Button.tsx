import React from "react";
import clsx from "classnames";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonColor = "default" | "success" | "warning" | "danger";

export type ButtonProps = {
  className?: string;
  type?: "button" | "submit";
  id?: string;
  to?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
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
            ["border-primary bg-primary hover:border-blue-700 hover:bg-blue-700 focus:ring-2"]:
              !disabled,
            ["bg-gray-200"]: disabled,
          },
          className,
        )}
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
