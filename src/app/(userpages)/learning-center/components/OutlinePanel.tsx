"use client";

import { Dispatch, SetStateAction } from "react";
import type { Section, Lesson } from "../types";

type OutlineProps = {
  sections: Section[];
  selectedLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  setIsOutlineOpened: Dispatch<SetStateAction<boolean>>;
};

const OutlinePanel = ({
  sections,
  selectedLesson,
  onSelectLesson,
  setIsOutlineOpened
}: OutlineProps) => {
  const handleLessonClick = (lesson: Lesson) => {
    onSelectLesson(lesson);
    setIsOutlineOpened(false);
  };

  return (
    <aside className="w-full">
      <ul>
        {sections.map((section, idx) => (
          <li key={idx} className="mb-4">
            <h1 className="text-lg font-bold text-sidebar-foreground mb-2">
              {section.title}
            </h1>
            <ul className="pl-4 text-sm text-muted-foreground space-y-1">
              {section.lessons.map((lesson, lidx) => {
                const isActive = selectedLesson.title === lesson.title;
                return (
                  <li
                    key={lidx}
                    onClick={() => handleLessonClick(lesson)}
                    className={`cursor-pointer rounded-md px-2 py-1 transition-colors
                      ${
                        isActive
                          ? "text-primary font-semibold"
                          : "hover:text-gray-400"
                      }`}
                  >
                    • {lesson.title}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default OutlinePanel;
