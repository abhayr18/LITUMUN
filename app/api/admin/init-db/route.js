import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminToken = process.env.ADMIN_SECRET || "litumun-admin-2026";

    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await initDatabase();

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    });
  } catch (error) {
    console.error("DB init error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to initialize database", error: error.message },
      { status: 500 }
    );
  }
}
