import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, organization, inquiryType, message } = req.body;

  if (!firstName || !lastName || !email || !inquiryType || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "The Blue Duck Foundation <info@theblueduck.org>",
      to: "dj@theblueduckllc.com",
      replyTo: email,
      subject: `[${inquiryType}] New message from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; margin: 0 0 4px;">The Blue Duck Foundation</p>
            <h1 style="font-size: 24px; font-weight: 300; margin: 0;">New contact form submission</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;"><a href="mailto:${email}" style="color: #1e293b;">${email}</a></td>
            </tr>
            ${organization ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Organization</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${organization}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Inquiry type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${inquiryType}</td>
            </tr>
          </table>

          <div style="background: #f8fafc; padding: 20px; border-left: 3px solid #0f172a;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; margin: 0 0 10px;">Message</p>
            <p style="font-size: 15px; line-height: 1.8; color: #334155; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
            <a href="mailto:${email}" style="display: inline-block; background: #0f172a; color: #fff; padding: 12px 24px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;">Reply to ${firstName}</a>
          </div>

          <p style="margin-top: 32px; font-size: 11px; color: #cbd5e1;">Sent from theblueduck.org contact form · The Blue Duck Foundation · EIN 41-4361489</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}