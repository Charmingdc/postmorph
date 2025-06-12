type DraftType = {
  id: string;
  type: "thread" | "tweet" | "linkedln post" | "reddit post";
  content: string;
  createdAt: string;
};

export { DraftType };
