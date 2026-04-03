import { NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return NextResponse.json(
        { success: false, message: "Missing payment verification data" },
        { status: 400 }
      );
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Mark as failed
      await query(
        "UPDATE registrations SET payment_status = 'failed' WHERE registration_id = ?",
        [registrationId]
      );

      return NextResponse.json(
        { success: false, message: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // Update payment status
    await query(
      "UPDATE registrations SET payment_status = 'paid', payment_id = ? WHERE registration_id = ?",
      [razorpay_payment_id, registrationId]
    );

    // Fetch registration for email
    const registrations = await query(
      "SELECT * FROM registrations WHERE registration_id = ?",
      [registrationId]
    );

    if (registrations.length > 0) {
      const reg = registrations[0];
      // Send confirmation email (non-blocking)
      sendConfirmationEmail({
        name: reg.name,
        email: reg.email,
        registrationId: reg.registration_id,
        eventName: reg.event_name,
        amount: reg.amount,
        paymentId: razorpay_payment_id,
      }).catch((err) => console.error("Email sending failed:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      registrationId,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
