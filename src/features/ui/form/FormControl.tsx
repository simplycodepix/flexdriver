import clsx from "classnames";

export function FormLabel(props: { label: string }) {
  return (
    <label className="mb-2 block text-xs text-gray-300">{props.label}</label>
  );
}

export function FormControl(props: {
  fullWidth?: boolean;
  error?: boolean;
  errorMsg?: string;
  label?: string;
  children: React.ReactNode;
  helperText?: string;
}) {
  const { fullWidth, children, label, helperText, error, errorMsg } = props;

  return (
    <div
      className={clsx({
        "w-full": fullWidth,
      })}
    >
      {label && <FormLabel label={label} />}

      <div>{children}</div>

      {error && errorMsg ? (
        <div className="mt-2 text-red-400">{errorMsg}</div>
      ) : null}

      {!error && helperText ? (
        <p className="mt-2 block text-xs text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
}
