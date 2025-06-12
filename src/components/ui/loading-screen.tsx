import Spinner from "@/components/ui/spinner";

const LoadingScreen = () => {
  return (
    <main
      className='fixed inset-0 z-50 flex flex-col items-center
    justify-center bg-black/30 backdrop-blur-md p-0 m-0'
    >
      <h1 className='font-bold text-3xl text-white drop-shadow-md mb-8'>
        Postmorph
      </h1>

      {/* Spinner pinned to bottom */}
      <div className='absolute bottom-14'>
        <Spinner />
      </div>
    </main>
  );
};

export { LoadingScreen };
