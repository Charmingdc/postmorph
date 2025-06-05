import ConfirmedButton from "../components/ui/confirmedButton";

const Page = () => {
  return (
    <main
      className='w-screen h-[100vh] fixed top-0 bottom-0 bg-card flex
    flex-col items-center justify-center text-center overflow-hidden px-8 m-0'
    >
      <h1 className='font-bold text-card-foreground text-3xl -mt-16'>
        Signup Successfull!
      </h1>

      <p className='my-2'>
        A verification link has been sent to your inbox. Kindly check your email
        to complete the process.
      </p>

      <ConfirmedButton />
    </main>
  );
};

export default Page;
