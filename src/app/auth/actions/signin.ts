"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { createClient } from "@/utils/supabase/server";

const FormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
});

const signin = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const supabase = await createClient();

  const formFields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const result = FormSchema.safeParse(formFields);
  if (!result.success) {
    return { message: fromZodError(result.error).message };
  }

  const validFields = result.data;
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: validFields.email,
    password: validFields.password
  });

  if (signInError) {
    return { message: signInError.message };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
  return { message: "Signed in successfully" };
};

export default signin;
