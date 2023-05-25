interface Props {
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  pattern?: string;
  halfWidth: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  id,
  label,
  pattern,
}: Props) {
  return (
    <div className="w-full px-3">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full text-gray-700 border focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={id}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
