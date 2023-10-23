export function Tile(props: {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center rounded bg-slate-800 px-4 py-3">
      {props.startAdornment ? (
        <div className="mr-4">{props.startAdornment}</div>
      ) : null}

      <div className="text-sm">{props.children}</div>

      {props.endAdornment ? (
        <div className="ml-2 grow text-right text-sm">{props.endAdornment}</div>
      ) : null}
    </div>
  );
}
