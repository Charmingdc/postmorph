import Spinner from "@/components/ui/spinner";

const Loading = () => {
  return (
    <main
      className='w-screen h-[100vh] fixed top-0 bottom-0 bg-card flex flex-col items-center
    justify-center overflow-hidden p-0 m-0'
    >
      <h1 className='font-bold text-card-foreground text-3xl -mt-24'>
        Postmorph
      </h1>

      <div className='absolute bottom-[6rem]'>
        <Spinner />
      </div>
    </main>
  );
};

export default Loading;
