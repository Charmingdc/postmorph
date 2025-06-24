import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const getUser = async () => {
  const router = useRouter();
  const supabase = await createClient();

  const {
    data: { authenticatedUser }
  } = await supabase.auth.getUser();

  if (authenticatedUser) {
    const {
      data: { user },
      error: { userError }
    } = await supabase.from("Profiles").select("*").eq("userId", user.id);
  } else if (!authenticatedUser) {
    router.push("/auth/signin");
  }

  return user;
};

export default getUser;
