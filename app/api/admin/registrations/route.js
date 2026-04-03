import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    // Simple auth check
    const authHeader = request.headers.get("authorization");
    const adminToken = process.env.ADMIN_SECRET || "litumun-admin-2026";

    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const status = searchParams.get("status");
    const event = searchParams.get("event");
    const search = searchParams.get("search");

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

    if (search) {
      whereClause += " AND (name LIKE ? OR email LIKE ? OR registration_id LIKE ? OR college LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Get count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM registrations ${whereClause}`,
      params
    );

    const total = countResult[0].total;
    const offset = (page - 1) * limit;

    // Get registrations
    const registrations = await query(
      `SELECT * FROM registrations ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Stats
    const stats = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) as paid,
        SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN payment_status = 'failed' THEN 1 ELSE 0 END) as failed,
        SUM(CASE WHEN payment_status = 'paid' THEN amount ELSE 0 END) as revenue
      FROM registrations
    `);

    return NextResponse.json({
      success: true,
      registrations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: stats[0],
    });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
