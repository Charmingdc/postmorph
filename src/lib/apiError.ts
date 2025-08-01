import { NextResponse } from "next/server";

export function apiError(message: string, status: number) {
  return NextResponse.json({ type: "error", message }, { status });
}
