import { NextResponse } from "next/server";
import { auth } from "@/utils/auth";
import { db } from "@/lib/db/drizzle/connection";
import { admins } from "@/lib/db/drizzle/schema";
import { Pool } from "pg";

// One-time setup endpoint — DELETE THIS FILE AFTER FIRST USE
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { secret } = await request.json();

  if (secret !== process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    // 1. Clean up existing user (wrong hash)
    await client.query(
      `DELETE FROM "user" WHERE email = 'ahmeddarhous@gmail.com'`
    );
    await client.query(
      `DELETE FROM admins WHERE email = 'ahmeddarhous@gmail.com'`
    );

    // 2. Create via Better Auth (correct scrypt hash)
    const res = await auth.api.signUpEmail({
      body: {
        name: "darhous",
        email: "ahmeddarhous@gmail.com",
        password: "01030002331",
      },
    });

    if (!res?.user?.id) {
      return NextResponse.json({ error: "No user returned" }, { status: 500 });
    }

    // 3. Create admin record
    await db.insert(admins).values({
      auth_user_id: res.user.id,
      name: "darhous",
      email: "ahmeddarhous@gmail.com",
      role: "owner",
      is_active: true,
    });

    return NextResponse.json({ ok: true, userId: res.user.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    client.release();
    await pool.end();
  }
}
