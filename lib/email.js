import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail({ name, email, registrationId, eventName, amount, paymentId }) {
  const mailOptions = {
    from: `"LITUMUN 2026" <${process.env.SMTP_USER || "litumun@litnagpur.ac.in"}>`,
    to: email,
    subject: `✅ Registration Confirmed — ${eventName} | LITUMUN 2026`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #0a0a0a; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(139, 92, 246, 0.3); }
          .header { background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); padding: 40px 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; letter-spacing: 2px; }
          .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
          .body { padding: 30px; color: #e2e8f0; }
          .greeting { font-size: 18px; margin-bottom: 20px; }
          .details { background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #94a3b8; font-size: 14px; }
          .detail-value { color: #f1f5f9; font-weight: 600; font-size: 14px; }
          .reg-id { background: linear-gradient(135deg, #7c3aed, #2563eb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 24px; font-weight: 800; text-align: center; padding: 15px; letter-spacing: 3px; }
          .badge { display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; }
          .footer { text-align: center; padding: 20px 30px; color: #64748b; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
          .cta { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: white !important; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LITUMUN 2026</h1>
            <p>Where Diplomacy Meets Innovation</p>
          </div>
          <div class="body">
            <p class="greeting">Dear ${name},</p>
            <p>🎉 Congratulations! Your registration has been confirmed successfully.</p>
            
            <div class="reg-id">${registrationId}</div>
            <p style="text-align:center; color:#94a3b8; font-size:13px; margin-top:-5px;">Your Registration ID — Save this for reference</p>
            
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Event</span>
                <span class="detail-value">${eventName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Amount Paid</span>
                <span class="detail-value">₹${amount}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment ID</span>
                <span class="detail-value">${paymentId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status</span>
                <span class="detail-value"><span class="badge">✓ Confirmed</span></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Dates</span>
                <span class="detail-value">April 25-27, 2026</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue</span>
                <span class="detail-value">LIT Campus, Nagpur</span>
              </div>
            </div>
            
            <p>📌 <strong>Important:</strong> Please carry your Registration ID and a valid college ID to the venue for verification.</p>
            <p>If you have any questions, feel free to reach out at <a href="mailto:litumun@litnagpur.ac.in" style="color: #7c3aed;">litumun@litnagpur.ac.in</a></p>
            
            <p style="margin-top:25px;">See you at LITUMUN! 🌍</p>
          </div>
          <div class="footer">
            <p>© 2026 LITUMUN | Laxminarayan Institute of Technology, Nagpur</p>
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
}
