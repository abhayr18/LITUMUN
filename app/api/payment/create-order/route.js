import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { query } from "@/lib/db";


export async function POST(request) {
  try {
    const { registrationId, amount } = await request.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn("Razorpay keys are missing from environment variables.");
    }
    
    let razorpay;
    try {
      razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "dummy_key",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
      });
    } catch (err) {
      console.error("Failed to initialize Razorpay:", err);
    }

    if (!registrationId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing registration ID or amount" },
        { status: 400 }
      );
    }

    // Verify registration exists
    const registrations = await query(
      "SELECT * FROM registrations WHERE registration_id = ? AND payment_status = 'pending'",
      [registrationId]
    );

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, message: "Registration not found or already paid" },
        { status: 404 }
      );
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: registrationId,
      notes: {
        registrationId,
        name: registrations[0].name,
        event: registrations[0].event_name,
      },
    });

    // Update order_id in database
    await query(
      "UPDATE registrations SET order_id = ? WHERE registration_id = ?",
      [order.id, registrationId]
    );

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
