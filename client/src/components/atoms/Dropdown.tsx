type DropdownProps = {
  label?: string;
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  classNames?: string;
};

function Dropdown({
  label,
  classNames,
  options,
  selectedOption,
  onOptionSelect,
}: DropdownProps) {
  return (
    <div className="flex flex-row items-center mb-4 ml-2">
      {label && <label className="w-32 text-left mr-4">{label}</label>}
      <select
        value={selectedOption}
        onChange={(e) => onOptionSelect(e.target.value)}
        className={`${classNames || "p-2 border rounded"}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
