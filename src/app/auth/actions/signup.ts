"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { createClient } from "@/utils/supabase/server";

const FormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required"
    })
    .min(4, "Username must be at least 4 characters long"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .email("Invalid email format"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .min(6, "Password must be at least 6 characters long")
});

const signup = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const supabase = await createClient();

  const formFields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const result = FormSchema.safeParse(formFields);
  if (!result.success) {
    return { message: fromZodError(result.error).message };
  }

  const validFields = result.data;
  const { data, error } = await supabase.auth.signUp({
    email: validFields.email,
    password: validFields.password,
    options: {
      emailRedirectTo: "auth/signin"
    },
    data: {
      full_name: username,
      avatar_url: null
    }
  });

  if (data?.user) {
    const { id, email } = data.user;

    await supabase.from("Profiles").upsert({
      user_id: id,
      full_name: validFields.username,
      email
    });
  }

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/auth/signin");
};

export default signup;
