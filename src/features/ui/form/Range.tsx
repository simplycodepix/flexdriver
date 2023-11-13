import clsx from "classnames";
import { useController, useFormContext } from "react-hook-form";

export type RangeProps = {
  id?: string;
  value?: string;
  className?: string;
  onValue?: (value: string) => void;
};

export function Range(props: RangeProps) {
  return (
    <input
      id={props.id ?? "default-range"}
      type="range"
      value={props.value ?? "0"}
      className={clsx(
        "h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700",
        props.className,
      )}
      onChange={(e) => {
        props.onValue?.(e.target.value);
      }}
    />
  );
}

export function FormRange(
  props: RangeProps & {
    name: string;
  },
) {
  const { name, ...rest } = props;

  const { control } = useFormContext();

  const { field } = useController({
    control,
    name,
  });
  const { onChange: controlOnChange, ...restField } = field;

  const handleOnChange = (value: string) => {
    controlOnChange(value);
  };

  return <Range onValue={handleOnChange} {...restField} {...rest} />;
}
