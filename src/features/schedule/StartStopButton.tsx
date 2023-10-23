import clsx from "classnames";

export function StartStopButton() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-center text-sm text-slate-400">
        Press button to start program
      </p>

      <button
        className={clsx(
          "h-[50vw] w-[50vw] rounded-full border-2 text-lg font-bold uppercase",
        )}
        type="button"
      >
        Start
      </button>
    </div>
  );
}
