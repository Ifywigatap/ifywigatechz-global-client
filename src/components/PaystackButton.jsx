import { useState, useEffect } from 'react';

export default function PaystackButton({ 
  email = '', 
  amount = 0, 
  reference = '', 
  metadata = {}, 
  onSuccess,
  className = '',
  label = 'Pay with Paystack'
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Paystack script on component mount
  useEffect(() => {
    if (document.querySelector('script[src*="paystack"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => console.error('Failed to load Paystack script');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!scriptLoaded) {
      alert("Paystack is loading. Please try again in a moment.");
      return;
    }

    if (!window.PaystackPop) {
      alert("Paystack script not loaded correctly. Please refresh the page.");
      console.error('PaystackPop not found on window');
      return;
    }

    if (!email) {
      alert("Please provide a valid email address.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid amount. Please select a valid course.");
      return;
    }

    setIsLoading(true);

    try {
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!paystackKey) {
        console.error("Missing VITE_PAYSTACK_PUBLIC_KEY environment variable.");
        alert("Payment gateway is not configured properly. Please contact support.");
        setIsLoading(false);
        return;
      }

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: email,
        amount: Math.round(amount) * 100, // Convert Naira → Kobo
        currency: "NGN",
        ref: reference,
        metadata: metadata,
        onClose: function () {
          console.log('Payment window closed');
          setIsLoading(false);
        },
        callback: function (response) {
          console.log('Payment successful:', response);
          alert("✅ Payment successful! Ref: " + response.reference);

          if (onSuccess) {
            try {
              onSuccess(response);
            } catch (err) {
              console.error('Error in onSuccess callback:', err);
            }
          }
          
          setIsLoading(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment error:', error);
      alert("Error processing payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePay}
      disabled={isLoading || !scriptLoaded}
      className={className || "btn btn-white w-full font-semibold py-3 px-6"}
    >
      {isLoading ? "Processing..." : label}
    </button>
  );
}
