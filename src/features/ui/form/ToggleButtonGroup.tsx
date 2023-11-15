import clsx from "classnames";
import { useController, useFormContext } from "react-hook-form";

type ToggleButtonGroupOption = {
  label: string;
  value: string;
};

type ChangeHandler = (value: string[]) => void;

type ToggleButtonGroupProps = {
  options: ToggleButtonGroupOption[];
  label: string;
  value?: string[];
  onChange?: ChangeHandler;
  buttonStyles?: string;
};

const isActive = (value: string, selected: string[]) => {
  return selected.includes(value);
};

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const { options, value = [], buttonStyles, onChange } = props;

  return (
    <div>
      <div className="mb-3 text-sm font-medium text-gray-500">
        {props.label}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {options.map((option) => {
          const active = isActive(option.value, value);
          return (
            <button
              type="button"
              key={option.value}
              className={clsx(
                "rounded px-2 py-2 text-xs",
                {
                  "bg-blue-600": active,
                  "bg-slate-600": !active,
                },
                buttonStyles,
              )}
              onClick={() => {
                if (onChange) {
                  onChange(
                    active
                      ? value.filter((v) => v !== option.value)
                      : [...value, option.value],
                  );
                }
              }}
            >
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FormToggleButtonGroup(
  props: ToggleButtonGroupProps & {
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

  const handleOnChange: ChangeHandler = (value) => {
    controlOnChange(value);
  };

  return (
    <ToggleButtonGroup onChange={handleOnChange} {...restField} {...rest} />
  );
}
