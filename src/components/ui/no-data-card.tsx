type NoDataCardProps = {
  title: string;
  message: string;
};

const NoDataCard = ({ title, message }: NoDataCardProps) => {
  return (
    <div className='w-full min-h-56 flex flex-col items-center justify-center gap-4 bg-card border-2 rounded-xl p-8 text-center'>
      <h2 className='text-2xl font-bold text-card-primary capitalize'>
        {title}
      </h2>
      <p className='text-gray-400'> {message} </p>
    </div>
  );
};

export default NoDataCard;
