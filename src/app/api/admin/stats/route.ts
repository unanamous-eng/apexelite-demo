import { NextResponse } from "next/server";
import { db } from "@/db";
import { trialSignups, contactSubmissions } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [trialCountResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(trialSignups);

    const [contactCountResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(contactSubmissions);

    const recentTrials = await db
      .select()
      .from(trialSignups)
      .orderBy(desc(trialSignups.createdAt))
      .limit(10);

    const recentContacts = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(10);

    // Mock plan interest data for luxury gym
    const planStats = [
      { plan: "Monthly", count: 34 },
      { plan: "Yearly", count: 89 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        totalTrials: trialCountResult.count,
        totalContacts: contactCountResult.count,
        planStats,
        recentTrials,
        recentContacts,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
