"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const signup = async (
  prevState: { message: string },
  formData: FormData
): Promise<{message: string}> => {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
};

export default signup;
