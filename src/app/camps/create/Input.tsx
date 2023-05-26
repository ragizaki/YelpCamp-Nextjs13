interface Props {
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  pattern?: string;
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
    <div className="w-full">
      <label
        className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full text-gray-800 placeholder:text-gray-400 border-2 border-blue-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
