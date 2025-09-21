"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LearnLayout from "./components/LearnLayout";

const LearningCenter = () => {
  const [isOutlineOpened, setIsOutlineOpened] = useState<boolean>(false);

  return (
    <main className="w-full flex flex-col overflow-y-hidden">
      <Navbar
        isOutlineOpened={isOutlineOpened}
        setIsOutlineOpened={setIsOutlineOpened}
      />

      <LearnLayout
        isOutlineOpened={isOutlineOpened}
        setIsOutlineOpened={setIsOutlineOpened}
      />
    </main>
  );
};
export default LearningCenter;
