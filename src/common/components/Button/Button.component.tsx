interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: string;
}

const Button = ({ onClick, disabled = false, children }: ButtonProps) => {
  return (
    <button className="btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
