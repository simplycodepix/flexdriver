export function FormGroup(props: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <label className="mb-2 block text-base font-semibold text-gray-300">
        {props.label}
      </label>
      {props.children}
    </div>
  );
}
