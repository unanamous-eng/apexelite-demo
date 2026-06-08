import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { trialSignups } from "@/db/schema";
import { trialFormSchema, formatZodErrors } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = trialFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: formatZodErrors(result.error) 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, trialDays } = result.data;

    await db.insert(trialSignups).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      trialDays,
    });

    return NextResponse.json(
      { success: true, message: `Your ${trialDays}-day free trial has been activated! We'll contact you shortly.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trial signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
