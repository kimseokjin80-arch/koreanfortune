const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body;
  const payment_status = body.payment_status;
  const payer_email = body.payer_email;
  const first_name = body.first_name || '';
  const last_name = body.last_name || '';
  const amount = body.mc_gross || '14.99';
  const custom = body.custom || '';

  let customerName = (first_name + ' ' + last_name).trim();
  if (custom) {
    const parts = custom.split('|');
    if (parts[0]) customerName = parts[0] || customerName;
  }
  if (!customerName) customerName = 'Valued Customer';

  if (payment_status === 'Completed') {
    try {
      await resend.emails.send({
        from: 'Korean Fortune <noreply@koreanfortunesaju.com>',
        to: payer_email,
        subject: '✦ Your Premium SAJU Reading is Ready',
        html: `
          <div style="background:#0a0a0f;color:#f5f0e8;padding:48px 32px;font-family:Georgia,serif;max-width:600px;margin:0 auto;">

            <div style="text-align:center;margin-bottom:36px;">
              <div style="font-size:26px;color:#c9a84c;letter-spacing:.1em;font-weight:bold;">✦ KOREAN FORTUNE</div>
              <div style="font-size:11px;color:#b8ccc8;letter-spacing:.3em;margin-top:6px;">사주팔자 · PREMIUM READING</div>
            </div>

            <p style="font-size:17px;margin-bottom:8px;color:#f5f0e8;">Dear ${customerName},</p>
            <p style="font-size:15px;line-height:1.9;color:#d4cfc7;margin-bottom:28px;">
              Thank you for your purchase! Your Premium SAJU Reading — all 12 chapters — has been prepared and is ready for you.
            </p>

            <div style="background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.25);border-radius:4px;padding:20px 24px;margin-bottom:28px;">
              <div style="font-size:11px;letter-spacing:.2em;color:#c9a84c;margin-bottom:14px;">✦ YOUR READING INCLUDES</div>
              <div style="font-size:13px;color:#b8ccc8;line-height:2.2;">
                ✦ Chapter 1 · Four Pillars Chart<br>
                ✦ Chapter 2 · Day Master Analysis<br>
                ✦ Chapter 3 · Ten Stars Analysis<br>
                ✦ Chapter 4 · Twelve Phases<br>
                ✦ Chapter 5 · Special Stars<br>
                ✦ Chapter 7 · Wealth Fortune<br>
                ✦ Chapter 8 · Love &amp; Marriage<br>
                ✦ Chapter 9 · Career Fortune<br>
                ✦ Chapter 10 · Health Fortune<br>
                ✦ Chapter 11 · Grand Fortune Cycles<br>
                ✦ Chapter 12 · Next 5 Years Fortune
              </div>
            </div>

            <div style="background:rgba(201,168,76,.05);border:1px solid rgba(201,168,76,.2);border-radius:4px;padding:16px 20px;margin-bottom:28px;font-size:14px;color:#d4cfc7;line-height:1.8;">
              <strong style="color:#c9a84c;">How to access your reading:</strong><br>
              Visit the site below and enter the same birth information you used when purchasing. Your full 12-chapter Premium reading will be generated instantly.
            </div>

            <div style="text-align:center;margin:32px 0;">
              <a href="https://koreanfortunesaju.com"
                 style="background:linear-gradient(135deg,#c9a84c,#a07830);color:#0a0a0f;padding:16px 40px;text-decoration:none;font-size:14px;letter-spacing:.15em;border-radius:2px;font-weight:bold;display:inline-block;">
                ✦ GO TO KOREAN FORTUNE
              </a>
            </div>

            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent);margin:28px 0;"></div>

            <p style="font-size:11px;color:#555;text-align:center;line-height:1.8;">
              Questions? <a href="mailto:sohex7@gmail.com" style="color:#c9a84c;">sohex7@gmail.com</a><br>
              Korean Fortune © 2026 · For entertainment purposes only<br>
              Amount paid: $${amount} via PayPal
            </p>

          </div>
        `
      });
      console.log('✅ Email sent to:', payer_email);
    } catch (err) {
      console.error('❌ Email error:', err);
    }
  }

  res.status(200).send('OK');
};
