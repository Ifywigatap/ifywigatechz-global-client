import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PaystackButton from "../components/PaystackButton";
import { pricingPlans, getFormattedPrice, slugify } from "../data/pricingPlans";
import { useAuth } from "../context/AuthContext";

export default function PricingDetail() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [billing, setBilling] = useState("yearly");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Find plan by id or slug
    const foundPlan = pricingPlans.find(p => 
      p.id === planId || slugify(p.name) === planId
    );
    setPlan(foundPlan);
    setLoading(false);
  }, [planId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-blue-900 dark:to-slate-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-slate-900 dark:text-white text-xl">Loading plan details...</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-blue-900 dark:to-slate-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center text-slate-900 dark:text-white">
          <h1 className="text-4xl font-bold mb-4">Plan Not Found</h1>
          <NavLink to="/pricing" className="bg-brandBlue text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            ← Back to Pricing
          </NavLink>
        </div>
      </div>
    );
  }

  // Extract the numeric price value to handle both simple numbers and price objects { current, original }
  const currentPriceValue = typeof plan[billing] === 'object' ? plan[billing].current : plan[billing];
  const isCustom = currentPriceValue === 'Custom';
  const amount = isCustom ? 0 : Number(currentPriceValue || 0) * 100; // Kobo

  const testimonials = [
    { quote: "Transformed our online presence overnight!", author: "Sarah O., Startup Founder" },
    { quote: "Exceeded expectations on delivery and support.", author: "Mike J., Agency Owner" },
    { quote: "Best value for professional web solutions.", author: "Aisha K., E-commerce Owner" },
  ];

  return (
    <>
      <Helmet>
        <title>{plan.name} | Pricing Details | IFYWIGATECHZ</title>
        <meta name="description" content={`Detailed information about our ${plan.name} plan. Features, pricing, and secure payment options.`} />
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-blue-900 dark:to-slate-900 transition-colors duration-300">
        {/* Breadcrumb */}
        <div className="flex justify-center text-sm text-slate-500 dark:text-neutral-400 space-x-2 px-4 py-8">
          <NavLink to="/" className="hover:text-brandBlue transition">Home</NavLink>
          <span>/</span>
          <NavLink to="/pricing" className="hover:text-brandBlue transition">Pricing</NavLink>
          <span>/</span>
          <span className="text-brandBlue font-semibold">{plan.name}</span>
        </div>

        <section className="container-wide py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 bg-white/80 dark:bg-neutral-900/60 rounded-[2rem] p-8 border border-slate-200 dark:border-brandBlue/20 shadow-xl dark:shadow-none transition-colors duration-300">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                {plan.name}
              </h1>
              <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto">
                Perfect solution for {plan.category === 'core' ? 'essential web needs' : plan.category === 'specialized' ? 'advanced business systems' : `${plan.category?.toLowerCase() || 'digital'} needs`}.
              </p>
              
              {/* Price & Billing Toggle */}
              <div className="space-y-6">
                <div className="bg-slate-200 dark:bg-neutral-800/90 rounded-full p-1 flex items-center gap-1 justify-center mx-auto max-w-md transition-colors duration-300">
                  {["monthly", "yearly", "lifetime"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBilling(mode)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex-1 ${
                        billing === mode
                          ? "bg-brandBlue text-white shadow-xl"
                          : "text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      {mode === "yearly" && <span className="ml-1 text-xs bg-brandGold text-black px-1 py-0.5 rounded-full">Save 20%</span>}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col items-center">
                  {/* Show original price if a discount is active */}
                  {typeof plan[billing] === 'object' && plan[billing].original !== plan[billing].current && (
                    <span className="text-lg line-through text-slate-400 dark:text-slate-500 mb-1">
                      ₦{Number(plan[billing].original).toLocaleString()}
                    </span>
                  )}
                  <div className="text-5xl font-black text-brandBlue">
                    {getFormattedPrice(plan, billing)}
                    {!isCustom && <span className="text-2xl font-normal text-slate-500 dark:text-neutral-400">/billing period</span>}
                  </div>
                </div>
                {plan.popular && (
                  <div className="inline-flex items-center gap-2 bg-brandGold/20 text-brandGold px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ Most Popular Choice
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Everything Included</h2>
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/80 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-brandBlue/20 shadow-sm dark:shadow-none transition-colors duration-300">
                      <span className="text-2xl text-brandBlue font-bold mt-0.5">✓</span>
                      <span className="text-slate-700 dark:text-neutral-200 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Section */}
              <div className="sticky top-12 space-y-6">
                <div className="bg-white/80 dark:bg-gradient-to-br dark:from-brandBlue/10 dark:to-brandGold/10 p-8 rounded-[2rem] border-2 border-slate-200 dark:border-brandBlue/30 shadow-xl dark:shadow-none transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">Ready to Get Started?</h3>
                  <div className="space-y-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-brandGold mb-2">
                        {getFormattedPrice(plan, billing)}
                      </div>
                      <div className="text-slate-500 dark:text-neutral-400 text-sm uppercase tracking-wide">Secure Payment</div>
                    </div>
                    {!user && !isCustom ? (
                      <button
                        onClick={() => navigate('/login', { state: { from: location } })}
                        className="w-full bg-brandGold hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-xl text-lg shadow-xl transition-all"
                      >
                        Login to Purchase
                      </button>
                    ) : isCustom ? (
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full bg-brandGold hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-xl text-lg shadow-xl transition-all"
                      >
                        Contact Sales
                      </button>
                    ) : (
                      <PaystackButton
                        email={user.email}
                        amount={amount}
                        reference={`pricing-${plan.id}-${billing}-${Date.now()}`}
                        metadata={{
                          planName: plan.name,
                          planId: plan.id,
                          billing: billing,
                          price: currentPriceValue,
                          category: plan.category,
                          userId: user.id
                        }}
                        label={`Pay ${getFormattedPrice(plan, billing)} Now`}
                        className="w-full bg-brandGold hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all"
                        onSuccess={(response) => {
                          console.log('Payment successful for', plan.name);
                          navigate('/payment-success?ref=' + response.reference);
                        }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-500 text-center">
                    🔒 Secure payment powered by Paystack • Money-back guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            {plan.popular && (
              <div className="bg-white/80 dark:bg-neutral-900/60 rounded-[2rem] p-8 border border-slate-200 dark:border-brandBlue/20 shadow-xl dark:shadow-none transition-colors duration-300">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">Loved by Customers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((t, i) => (
                    <div key={i} className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-800/50 border border-slate-200 dark:border-neutral-700 text-center shadow-sm dark:shadow-none transition-colors duration-300">
                      <p className="text-slate-700 dark:text-neutral-300 italic mb-4">"{t.quote}"</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Footer */}
            <div className="text-center space-y-4 pt-12 border-t border-slate-200 dark:border-brandBlue/20 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Still Have Questions?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brandBlue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Contact Sales Team
                </NavLink>
                <NavLink
                  to="/pricing"
                  className="inline-flex items-center gap-2 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white px-8 py-4 rounded-xl font-semibold hover:border-brandBlue dark:hover:border-brandBlue transition-all"
                >
                  ← View All Plans
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
