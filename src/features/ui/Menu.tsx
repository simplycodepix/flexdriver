import clsx from "classnames";

export type MenuProps = {
  children: React.ReactNode;
};

export function Menu(props: MenuProps) {
  return <div className="flex w-full flex-col gap-4">{props.children}</div>;
}

export type MenuButtonProps = {
  className?: string;
  children: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onClick?: () => void;
};

export function MenuButton(props: MenuButtonProps) {
  const { children, startAdornment, endAdornment, className, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex w-full items-center rounded-md px-4 py-2 font-medium text-slate-50",
        className,
      )}
    >
      {startAdornment && (
        <div className="mr-3 flex items-center text-lg">{startAdornment}</div>
      )}
      <span>{children}</span>
      {endAdornment && (
        <div className="ml-3 flex grow items-center justify-end text-lg">
          {endAdornment}
        </div>
      )}
    </button>
  );
}
