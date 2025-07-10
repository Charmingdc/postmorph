const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full flex flex-col gap-8 bg-card text-card-foregorund py-4 px-6 rounded-lg mb-8'>
      {children}
    </section>
  );
};

export default SectionWrapper;
