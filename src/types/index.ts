type ActionState = {
  type: "success" | "error" | "";
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
  is_unlimited: boolean;
};

type CreditInfo = {
  is_unlimited: boolean;
  total_credits: number;
  used_credits: number;
};

type DraftType = {
  id: string;
  type: "x thread" | "tweet" | "linkedln post" | "reddit post";
  modify_count: number;
  content: string;
  createdAt: string | Date;
};

type CustomVoice = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  instruction: string;
  createdAt: string | Date;
};

type UserLog = {
  id: string;
  user_id: string;
  action_type: "repurpose" | "refine";
  credit_cost: number;
  credits_before: number;
  credits_after: number;
  status: "sucess" | "failure" | "pending";
  err_message: "string" | null;
  action_at: string | Date;
};

export type {
  ActionState,
  Profile,
  CreditInfo,
  DraftType,
  CustomVoice,
  UserLog
};
