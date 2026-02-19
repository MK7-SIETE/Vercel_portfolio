/**
 * api/contact.js — Vercel Serverless Function
 *
 * Sends two emails via EmailJS REST API:
 *   1. Notification → you (Betsaleel)
 *   2. Auto-reply   → the visitor
 *
 * ── SETUP (one-time, ~5 minutes) ──────────────────────────────────────────
 *
 *  1. Sign up free at https://emailjs.com
 *
 *  2. Add Email Service:
 *     Dashboard → Email Services → Add New Service → Gmail
 *     Copy "Service ID"
 *
 *  3. Create Template 1 — Notification (email TO YOU):
 *     Dashboard → Email Templates → Create New
 *     To Email  : mukuba950@gmail.com
 *     Subject   : New Website Message: {{subject}}
 *     Body:
 *       Name:    {{from_name}}
 *       Email:   {{from_email}}
 *       Subject: {{subject}}
 *       Message: {{message}}
 *     Copy "Template ID" → set as EMAILJS_NOTIFICATION_TEMPLATE_ID in Vercel env
 *
 *  4. Create Template 2 — Auto-Reply (email TO VISITOR):
 *     Dashboard → Email Templates → Create New
 *     To Email  : {{reply_to}}
 *     Reply-To  : mukuba950@gmail.com
 *     Subject   : Thanks for reaching out, {{from_name}}!
 *     Body (HTML): paste the HTML string from the buildAutoReplyHtml() function below
 *     Copy "Template ID" → set as EMAILJS_AUTOREPLY_TEMPLATE_ID in Vercel env
 *
 *  5. Get Public + Private Keys:
 *     Dashboard → Account → General
 *     Copy Public Key  → EMAILJS_PUBLIC_KEY  (Vercel env)
 *     Copy Private Key → EMAILJS_PRIVATE_KEY (Vercel env)
 *
 *  6. Add env vars in Vercel:
 *     Project → Settings → Environment Variables → add all five below
 *
 * ── VERCEL ENV VARIABLES NEEDED ───────────────────────────────────────────
 *   EMAILJS_SERVICE_ID
 *   EMAILJS_NOTIFICATION_TEMPLATE_ID
 *   EMAILJS_AUTOREPLY_TEMPLATE_ID
 *   EMAILJS_PUBLIC_KEY
 *   EMAILJS_PRIVATE_KEY
 * ──────────────────────────────────────────────────────────────────────────
 */

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_NOTIFICATION_TEMPLATE_ID,
    EMAILJS_AUTOREPLY_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY,
  } = process.env;

  try {
    // ── 1. Send notification email to Betsaleel ──────────────────────────
    await sendEmail({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_NOTIFICATION_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: subject || '(No subject)',
        message,
      },
    });

    // ── 2. Send auto-reply to visitor ─────────────────────────────────────
    await sendEmail({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_AUTOREPLY_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        from_name: name,
        reply_to: email,
        subject: subject || 'your message',
        auto_reply_html: buildAutoReplyHtml(name, subject),
      },
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('EmailJS error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};

// ── EmailJS REST API caller ────────────────────────────────────────────────
async function sendEmail(payload) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`EmailJS responded with ${response.status}: ${text}`);
  }
  return response;
}

// ── Auto-reply HTML email template ────────────────────────────────────────
// This is the beautiful branded email sent to your visitors.
// In EmailJS Template 2, set the body to: {{{auto_reply_html}}}  (triple braces = unescaped HTML)
function buildAutoReplyHtml(name, subject) {
  const displaySubject = subject || 'your message';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f0f4f8;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#001f3f 0%,#003d7a 60%,#0057a8 100%);padding:40px 32px;text-align:center;">
              <!-- Logo circle -->
              <div style="display:inline-block;width:64px;height:64px;background:rgba(255,255,255,0.15);border-radius:50%;line-height:64px;font-size:26px;font-weight:800;color:#ffffff;margin-bottom:18px;border:2px solid rgba(255,255,255,0.3);">BM</div>
              <h1 style="margin:0 0 6px;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">Message Received!</h1>
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:15px;">I'll be in touch with you soon, ${name}.</p>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:36px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 20px;color:#1a1a2e;font-size:16px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
              <p style="margin:0 0 20px;color:#4a5568;font-size:15px;line-height:1.7;">
                Thank you for reaching out regarding <strong style="color:#003d7a;">"${displaySubject}"</strong>.
                I've received your message and will get back to you within <strong>24–48 hours</strong>.
              </p>

              <!-- Divider -->
              <div style="border-top:2px solid #e8edf5;margin:28px 0;"></div>

              <!-- What happens next box -->
              <div style="background:#f7f9fc;border-left:4px solid #003d7a;border-radius:0 10px 10px 0;padding:20px 22px;margin-bottom:28px;">
                <p style="margin:0 0 8px;color:#003d7a;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">What happens next</p>
                <p style="margin:0;color:#4a5568;font-size:14px;line-height:1.7;">
                  I review every message personally. Expect a thoughtful reply to <strong>${name.split(' ')[0]}</strong>'s inbox shortly. If it's urgent, feel free to reach me directly on WhatsApp.
                </p>
              </div>

              <!-- CTA button -->
              <div style="text-align:center;margin-bottom:32px;">
                <a href="https://betsamukuba.vercel.app/"
                   style="display:inline-block;background:linear-gradient(135deg,#001f3f,#003d7a);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                  View My Portfolio →
                </a>
              </div>

              <!-- Divider -->
              <div style="border-top:2px solid #e8edf5;margin:28px 0;"></div>

              <!-- Connect section -->
              <p style="margin:0 0 18px;text-align:center;color:#4a5568;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Connect with me</p>

              <!-- Social icons row -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>

                        <!-- LinkedIn -->
                        <td style="padding:0 10px;">
                          <a href="https://linkedin.com/in/betsaleel-mukuba" target="_blank" style="display:inline-block;text-decoration:none;">
                            <div style="width:52px;height:52px;background:#0077b5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="26" height="26" alt="LinkedIn" style="display:block;margin:13px auto;" />
                            </div>
                            <p style="margin:0;text-align:center;color:#0077b5;font-size:11px;font-weight:600;">LinkedIn</p>
                          </a>
                        </td>

                        <!-- WhatsApp -->
                        <td style="padding:0 10px;">
                          <a href="https://wa.me/260969508654" target="_blank" style="display:inline-block;text-decoration:none;">
                            <div style="width:52px;height:52px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                              <img src="https://cdn-icons-png.flaticon.com/512/220/220236.png" width="26" height="26" alt="WhatsApp" style="display:block;margin:13px auto;" />
                            </div>
                            <p style="margin:0;text-align:center;color:#25d366;font-size:11px;font-weight:600;">WhatsApp</p>
                          </a>
                        </td>

                        <!-- Facebook -->
                        <td style="padding:0 10px;">
                          <a href="https://facebook.com/betsa.mukuba" target="_blank" style="display:inline-block;text-decoration:none;">
                            <div style="width:52px;height:52px;background:#1877f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;">
                              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="26" height="26" alt="Facebook" style="display:block;margin:13px auto;" />
                            </div>
                            <p style="margin:0;text-align:center;color:#1877f2;font-size:11px;font-weight:600;">Facebook</p>
                          </a>
                        </td>

                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f7f9fc;padding:24px 32px;text-align:center;border-top:2px solid #e8edf5;">
              <p style="margin:0 0 4px;color:#718096;font-size:13px;">Best regards,</p>
              <p style="margin:0 0 2px;color:#001f3f;font-size:18px;font-weight:700;">Betsaleel Mukuba</p>
              <p style="margin:0 0 14px;color:#718096;font-size:12px;">Frontend Developer &amp; Web Specialist · Lusaka, Zambia</p>
              <p style="margin:0;color:#a0aec0;font-size:11px;">
                © 2026 Betsaleel Mukuba · This is an automated reply — please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
