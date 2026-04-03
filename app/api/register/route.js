import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { generateRegistrationId, validateRegistration, sanitizeInput } from "@/lib/utils";
import { EVENTS } from "@/lib/data";

export async function POST(request) {
  try {
    const body = await request.json();

    // Sanitize inputs
    const data = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email)?.toLowerCase(),
      phone: sanitizeInput(body.phone),
      college: sanitizeInput(body.college),
      eventId: sanitizeInput(body.eventId),
    };

    // Validate
    const validation = validateRegistration(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Find event
    const event = EVENTS.find((e) => e.id === data.eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Invalid event selected" },
        { status: 400 }
      );
    }

    // Check for duplicate registration
    const existing = await query(
      "SELECT id FROM registrations WHERE email = ? AND event_id = ? AND payment_status != 'failed'",
      [data.email, data.eventId]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "You have already registered for this event with this email." },
        { status: 409 }
      );
    }

    // Generate registration ID
    const registrationId = generateRegistrationId();

    // Insert into database
    await query(
      `INSERT INTO registrations (registration_id, name, email, phone, college, event_id, event_name, amount, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [registrationId, data.name, data.email, data.phone, data.college, data.eventId, event.name, event.fee]
    );

    return NextResponse.json({
      success: true,
      registrationId,
      eventName: event.name,
      amount: event.fee,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
