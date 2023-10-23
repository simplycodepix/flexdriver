import clsx from "classnames";

export function FormControl(props: {
  fullWidth?: boolean;
  error?: boolean;
  errorMsg?: string;
  label?: string;
  children: React.ReactNode;
}) {
  const { fullWidth, children, label, error, errorMsg } = props;

  return (
    <div
      className={clsx({
        "w-full": fullWidth,
      })}
    >
      {label && (
        <label className="mb-1 block text-sm text-white">{label}</label>
      )}

      <div>{children}</div>

      {error && errorMsg ? (
        <div className="mt-2 text-red-400">{errorMsg}</div>
      ) : null}
    </div>
  );
}
