const GridRails = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden md:block z-0"
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-y-0 left-[2.5%] w-px bg-border" />
        <div className="absolute inset-y-0 right-[2.5%] w-px bg-border" />
      </div>
    </div>
  );
};

export default GridRails;
