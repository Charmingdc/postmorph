// Define the block types
type ParagraphBlock = {
  type: "paragraph";
  value: string;
};

type VideoBlock = {
  type: "video";
  src: string;
};

type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

// Union of all block types
type Block = ParagraphBlock | VideoBlock | ImageBlock;

// A lesson contains a title and an array of blocks
type Lesson = {
  title: string;
  blocks: Block[];
};

// A section contains a title and lessons
type Section = {
  title: string;
  lessons: Lesson[];
};

export type { Block, Lesson, Section };
