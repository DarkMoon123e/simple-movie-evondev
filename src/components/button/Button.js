const Button = ({ className = "", children, onClick, bgColor = "primary" }) => {
  return (
    <>
      <button
        className={`py-3 px-6 rounded-lg capitalize w-full bg-${bgColor} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
