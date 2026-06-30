import nodemailer from 'nodemailer';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try{
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing fields' });
    const host = process.env.SMTP_HOST, port = parseInt(process.env.SMTP_PORT||'587',10),
          user = process.env.SMTP_USER, pass = process.env.SMTP_PASS,
          to = process.env.CONTACT_TO, from = process.env.CONTACT_FROM || user;
    if (!host || !user || !pass || !to) return res.status(500).json({ ok: false, error: 'Email not configured' });
    const transporter = nodemailer.createTransport({ host, port, secure: port===465, auth:{ user, pass } });
    const info = await transporter.sendMail({
      from, to, subject:`New message from ${name} — IfyWigatechz Site`,
      replyTo: email, text: message, html:`<p><b>From:</b> ${name} &lt;${email}&gt;</p><p>${(message||'').replace(/\n/g,'<br/>')}</p>`
    });
    return res.status(200).json({ ok:true, id: info.messageId });
  }catch(e){ return res.status(500).json({ ok:false, error: e.message||'Email failed' }) }
}
