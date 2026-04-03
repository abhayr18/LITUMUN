import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminToken = process.env.ADMIN_SECRET || "litumun-admin-2026";

    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const event = searchParams.get("event");

    let whereClause = "WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      whereClause += " AND payment_status = ?";
      params.push(status);
    }

    if (event && event !== "all") {
      whereClause += " AND event_id = ?";
      params.push(event);
    }

    const registrations = await query(
      `SELECT registration_id, name, email, phone, college, event_name, payment_status, payment_id, amount, created_at 
       FROM registrations ${whereClause} ORDER BY created_at DESC`,
      params
    );

    // Build CSV
    const headers = [
      "Registration ID", "Name", "Email", "Phone", "College",
      "Event", "Payment Status", "Payment ID", "Amount", "Date"
    ];

    let csv = headers.join(",") + "\n";
    for (const reg of registrations) {
      csv += [
        reg.registration_id,
        `"${reg.name}"`,
        reg.email,
        reg.phone,
        `"${reg.college}"`,
        `"${reg.event_name}"`,
        reg.payment_status,
        reg.payment_id || "",
        reg.amount,
        new Date(reg.created_at).toISOString(),
      ].join(",") + "\n";
    }

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=litumun-registrations-${Date.now()}.csv`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to export data" },
      { status: 500 }
    );
  }
}
