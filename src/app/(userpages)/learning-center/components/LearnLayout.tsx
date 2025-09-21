import { Dispatch, SetStateAction, useState } from "react";
import OutlinePanel from "./OutlinePanel";
import LessonContent from "./LessonContent";
import sections from "../sections";
import type { Lesson } from "../types";

type PageProps = {
  isOutlineOpened: boolean;
  setIsOutlineOpened: Dispatch<SetStateAction<boolean>>;
};

const LearnLayout = ({ isOutlineOpened, setIsOutlineOpened }: PageProps) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(
    sections[0].lessons[0]
  );

  return (
    <div
      className={`w-full h-[64vh] grid ${
        isOutlineOpened ? "grid-cols-[14rem,1fr]" : "grid-cols-[0rem,1fr]"
      } transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Outline */}
      <div
        className={`bg-sidebar p-4 border-r border-sidebar-border rounded-tl-lg rounded-bl-lg overflow-y-auto ${
          isOutlineOpened ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <OutlinePanel
          sections={sections}
          selectedLesson={selectedLesson}
          onSelectLesson={setSelectedLesson}
          setIsOutlineOpened={setIsOutlineOpened}
        />
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto">
        <LessonContent lesson={selectedLesson} />
      </div>
    </div>
  );
};

export default LearnLayout;
