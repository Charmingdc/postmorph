type ErrorBoxProps = {
  message?: string;
  className?: string;
};

const ErrorBox = ({
  message = "Something went wrong.",
  className = ""
}: ErrorBoxProps) => {
  return (
    <div
      className={`w-full p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm ${className}`}>
      ⚠️ {message}
    </div>
  );
};

export default ErrorBox;
