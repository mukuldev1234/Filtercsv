interface Props {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({
  title,
  onClick,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-lg w-full"
    >
      {title}
    </button>
  );
};

export default Button;