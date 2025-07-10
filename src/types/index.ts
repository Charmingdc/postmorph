type ActionState = {
  type: "string" | "error" | "";
  message: string;
};

type Profile = {
  user_id: string;
  full_name: string;
  created_at: string | Date;
  avatar_url: string | null;
  email: string;
  plan: string;
  total_credits: number;
  used_credits: number;
};

type DraftType = {
  id: string;
  type: "thread" | "tweet" | "linkedln post" | "reddit post";
  content: string;
  createdAt: string;
};

export type { ActionState, Profile, DraftType };
