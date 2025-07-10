"use server";
import { createClient } from "@/utils/supabase/server";

type PrevState = {
  type: "success" | "error" | null;
  message: string;
};

const ChangePassword = async (
  prevStat: prevState,
  formData: FormData
): Promise<PrevState> => {
  const newPassword = formData.get("newPassword") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    return { type: "error", message: error.message };
  }

  return { type: sucess, message: "Password updated successfully" };
};

export default changePassword;
