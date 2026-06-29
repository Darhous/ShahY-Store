import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/drizzle/connection"
import { customers } from "@/lib/db/drizzle/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/utils/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session?.user?.id) return NextResponse.json({ customer: null })
    const [customer] = await db.select().from(customers)
      .where(eq(customers.auth_user_id, session.user.id)).limit(1)
    return NextResponse.json({ customer: customer ?? null })
  } catch {
    return NextResponse.json({ customer: null })
  }
}
