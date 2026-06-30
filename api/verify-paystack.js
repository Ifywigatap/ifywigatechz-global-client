export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok:false, error:'Method not allowed' });
  try{
    const { reference } = req.query || {};
    if (!reference) return res.status(400).json({ ok:false, error:'Missing reference' });
    const sk = process.env.PAYSTACK_SECRET_KEY;
    if (!sk) return res.status(500).json({ ok:false, error:'Missing PAYSTACK_SECRET_KEY' });
    const r = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization:`Bearer ${sk}` } });
    const data = await r.json();
    return res.status(200).json({ ok:true, data });
  }catch(e){ return res.status(500).json({ ok:false, error:e.message||'Verify failed' }) }
}
