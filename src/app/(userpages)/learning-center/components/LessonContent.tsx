import type { Lesson } from "../types";

const LessonContent = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{lesson.title}</h2>

      {lesson.blocks.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={idx} className="mb-4 text-base leading-relaxed">
                {block.value}
              </p>
            );
          case "image":
            return (
              <div key={idx} className="mb-4">
                <img
                  src={block.src}
                  alt={block.alt || "Lesson image"}
                  className="rounded-lg shadow-md mx-auto"
                />
              </div>
            );
          case "video":
            return (
              <div key={idx} className="mb-4">
                <video
                  src={block.src}
                  controls
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default LessonContent;
