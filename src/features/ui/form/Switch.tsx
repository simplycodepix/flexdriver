import { useController, useFormContext } from "react-hook-form";
import {
  Switch as HuiSwitch,
  type SwitchProps as HuiSwitchProps,
} from "@headlessui/react";

export type SwitchProps = HuiSwitchProps<"button">;

export function Switch(props: SwitchProps) {
  const { checked } = props;

  return (
    <HuiSwitch
      className={`${
        checked ? "bg-blue-600" : "bg-slate-600"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
      {...props}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HuiSwitch>
  );
}

export function FormSwitch(
  props: SwitchProps & {
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

  const handleOnChange = (value: boolean) => {
    controlOnChange(value);
  };

  return (
    <Switch
      onChange={handleOnChange}
      checked={!!field.value}
      {...restField}
      {...rest}
    />
  );
}
