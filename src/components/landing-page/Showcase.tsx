import Image from "next/image";

const Showcase = () => {
  return (
    <section
      id="showcase"
      className="w-full md:w-[95%] py-4 px-2 md:p-6 md:border-x md:border-[0.5px] border-y-0 border-border overflow-x-hidden"
    >
      <Image
        src="/landing/postmorph-interface.png"
        className="w-4/5 h-auto mx-auto md:w-full md:h-full rounded-xl"
        width={1920}
        height={1280}
        alt="Postmorph repurpose page interface"
      />
    </section>
  );
};

export default Showcase;
