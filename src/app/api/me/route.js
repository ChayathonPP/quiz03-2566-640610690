import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Chayathon Punpang",
    studentId: "640610690",
  });
};
