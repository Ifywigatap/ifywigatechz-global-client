import { useState, useEffect } from 'react';

export default function PaystackButton({ 
  email = '', 
  amount = 0, 
  reference = '', 
  metadata = {}, 
  onSuccess,
  onClose, // Add onClose callback prop
  onError, // Add onError callback prop
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
      const errorMsg = "Paystack is loading. Please try again in a moment.";
      if (onError) onError(errorMsg); else alert(errorMsg);
      return;
    }

    if (!window.PaystackPop) {
      const errorMsg = "Paystack script not loaded correctly. Please refresh the page.";
      console.error('PaystackPop not found on window');
      if (onError) onError(errorMsg); else alert(errorMsg);
      return;
    }

    if (!email) {
      const errorMsg = "Please provide a valid email address.";
      if (onError) onError(errorMsg); else alert(errorMsg);
      return;
    }

    if (!amount || amount <= 0) {
      const errorMsg = "Invalid amount. Please select a valid item.";
      if (onError) onError(errorMsg); else alert(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!paystackKey) {
        console.error("Missing VITE_PAYSTACK_PUBLIC_KEY environment variable.");
        const errorMsg = "Payment gateway is not configured properly. Please contact support.";
        if (onError) onError(errorMsg); else alert(errorMsg);
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
          console.log('Payment window closed by user.');
          if (onClose) onClose(); // Use the callback
          setIsLoading(false);
        },
        callback: function (response) {
          console.log('Payment successful:', response);
          // alert("✅ Payment successful! Ref: " + response.reference); // Let parent handle success message

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
      const errorMsg = "Error processing payment. Please try again.";
      if (onError) onError(errorMsg); else alert(errorMsg);
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
