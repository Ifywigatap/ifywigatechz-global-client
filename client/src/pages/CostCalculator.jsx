import { useState } from "react";

export default function CostCalculator() {
  const [type, setType] = useState("website");
  const [features, setFeatures] = useState([]);

  const prices = {
    website: 100000,
    ecommerce: 200000,
    webapp: 300000,
  };

  const featureList = [
    { name: "Authentication", price: 50000 },
    { name: "Payment Integration", price: 80000 },
    { name: "Admin Dashboard", price: 70000 },
  ];

  const toggleFeature = (f) => {
    setFeatures((prev) =>
      prev.includes(f)
        ? prev.filter((x) => x !== f)
        : [...prev, f]
    );
  };

  const total =
    prices[type] +
    features.reduce((sum, f) => sum + f.price, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-center">
          Project Cost Calculator
        </h1>

        <div className="grid sm:grid-cols-3 gap-4">
          {Object.keys(prices).map((key) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`p-4 rounded-xl border ${
                type === key
                  ? "bg-blue-600"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {key.toUpperCase()}
              <div className="text-sm">₦{prices[key]}</div>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {featureList.map((f) => (
            <button
              key={f.name}
              onClick={() => toggleFeature(f)}
              className={`p-4 rounded-xl border ${
                features.includes(f)
                  ? "bg-purple-600"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {f.name}
              <div className="text-sm">+₦{f.price}</div>
            </button>
          ))}
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
          <h2 className="text-3xl font-bold">₦{total.toLocaleString()}</h2>
        </div>

      </div>
    </div>
  );
}