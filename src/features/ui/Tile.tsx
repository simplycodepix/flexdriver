import clsx from "classnames";

export function Tile(props: {
  startAdornment?: React.ReactNode;
  startAdornmentStyles?: string;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyStyles?: string;
}) {
  return (
    <div
      className={clsx(
        "flex w-full items-center rounded bg-slate-800 px-4 py-3",
        props.className,
      )}
    >
      {props.startAdornment ? (
        <div className={clsx("mr-4", props.startAdornmentStyles)}>
          {props.startAdornment}
        </div>
      ) : null}

      <div className={clsx("grow text-sm", props.bodyStyles)}>
        {props.children}
      </div>

      {props.endAdornment ? (
        <div className="ml-2 grow text-right text-sm">{props.endAdornment}</div>
      ) : null}
    </div>
  );
}
