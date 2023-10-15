type ButtonProps = {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className: string;
  type?: "button" | "submit" | "reset";
};

function Button({ label, onClick, disabled, className, type }: ButtonProps) {
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${disabledClass}`}
    >
      {label}
    </button>
  );
}

export default Button;
