const Divider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`!w-screen !px-0 h-[0.3px] bg-border ${className}`}></div>
  );
};

export default Divider;
