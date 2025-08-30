async function startCheckout(){
  const { API_BASE } = window.DATA_CLEANUP_CONFIG || {};
  if(!API_BASE) return alert("Missing API_BASE in config.js");

  try{
    const res = await fetch(`${API_BASE}/billing/create-checkout-session`, { method:"POST" });
    if(!res.ok) throw new Error("Checkout init failed");
    const data = await res.json();
    if(!data || !data.sessionId || !data.publishableKey) throw new Error("Invalid response from API");
    const stripe = Stripe(data.publishableKey);
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  }catch(err){
    console.error(err);
    alert("Unable to start checkout. Please try again later.");
  }
}
window.startCheckout = startCheckout;
