const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className='w-full flex flex-col gap-3 bg-card text-card-foregorund py-4 px-6 rounded-lg mb-6'
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
