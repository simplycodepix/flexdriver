export function FormGroup(props: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div className={props.className}>
      <label className="mb-2 block text-base font-semibold text-gray-300">
        {props.label}
      </label>
      {props.children}
    </div>
  );
}
