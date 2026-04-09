import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      company,
      service,
      budget,
      source,
    } = body;

    // 🔥 basic validation
    if (!name || !phone || !service) {
      return NextResponse.json({ success: false, message: "Missing required fields" });
    }

    const { error } = await supabase.from("leads").insert([
      {
        name,
        phone,
        email,
        company,
        service,
        budget,
        source,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ success: false });
  }
}