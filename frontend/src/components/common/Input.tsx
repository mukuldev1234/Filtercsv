interface Props {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-3 rounded-lg w-full outline-none"
    />
  );
};

export default Input;