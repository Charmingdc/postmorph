"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const signup = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const supabase = await createClient();

  const formFields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string
  };

  const { data, error } = await supabase.auth.signUp({
    email: formFields.email,
    password: formFields.password,
    options: {
      emailRedirectTo: "auth/signin"
    }
  });

  /* if (data?.user) {
    const { id, email } = data.user;

    await supabase.from("Profiles").insert({
      user_id: id,
      username: formFields.username,
      email
    });
  }*/

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export default signup;
