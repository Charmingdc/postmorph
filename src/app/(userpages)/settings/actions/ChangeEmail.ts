"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type Result = { type: "success" | "error"; message: string };

const changeEmail = async (): Promise<Result> => {
  const email = formData.get("email") as string;
  if (!email) {
    return {
      type: "error",
      message: "Email must be provided"
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { type: "error", message: "You must be logged in." };
  }
  
  revalidatePath("/settings", "layout");
};

export default changeEmail;
