type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
};

function InputField({
  value,
  onChange,
  label,
  type,
  id,
  placeholder,
}: InputFieldProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded mr-5"
      />
    </>
  );
}

export default InputField;
