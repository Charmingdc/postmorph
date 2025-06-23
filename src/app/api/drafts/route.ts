import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const from = parseInt(searchParams.get("from") || "0");
  const to = parseInt(searchParams.get("to") || "9");

  if (!userId) {
    return NextResponse.json({ drafts: [] }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json(
      { drafts: [], error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ drafts: data });
}
