import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  readDB();

  const body = await request.json();
  const { username, password } = body;

  const users = DB.users.find(
    (users) => users.username === username && users.password === password
  );

  if (!users) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or Password is incorrect",
      },
      { status: 400 }
    );
  }

  const token = jwt.sign(
    {
      username,
      role: users.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return NextResponse.json({ ok: true, token });
};
