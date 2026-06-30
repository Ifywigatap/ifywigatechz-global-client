import crypto from 'crypto';
export const config = { api: { bodyParser: false } };
function rawBody(req){return new Promise((res,rej)=>{let d='';req.on('data',c=>d+=c);req.on('end',()=>res(d));req.on('error',rej)})}
export default async function handler(req, res){
  if (req.method!=='POST') return res.status(405).json({ ok:false, error:'Method not allowed' });
  try{
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const raw = await rawBody(req);
    const hash = crypto.createHmac('sha512', secret).update(raw).digest('hex');
    const sig = req.headers['x-paystack-signature'];
    if (!sig || sig !== hash) return res.status(401).json({ ok:false, error:'Invalid signature' });
    const event = JSON.parse(raw);
    // TODO: handle event - e.g., store in DB, send email, etc.
    return res.status(200).json({ ok:true });
  }catch(e){ return res.status(500).json({ ok:false, error:e.message||'Webhook error' }) }
}
