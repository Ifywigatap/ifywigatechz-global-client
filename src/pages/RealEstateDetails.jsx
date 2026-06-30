import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { realEstateData } from "../data/realestateData";

export default function PropertyDetails() {
  const { id } = useParams();

  // GET DATA
  const userPosts = JSON.parse(localStorage.getItem("userProperties")) || [];
  const allProperties = [...realEstateData, ...userPosts];

  const property = allProperties.find((p) => p.id === Number(id));

  const [current, setCurrent] = useState(0);
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState(10);

  if (!property) {
    return <div className="p-6 text-center">Property not found</div>;
  }

  // UNIFIED IMAGE STRUCTURE
  const images = property.images?.length
    ? property.images
    : property.image
    ? [property.image]
    : ["/placeholder.jpg"];

  // PRICE FORMAT
  const formatPrice = (price) =>
    `₦${Number(price).toLocaleString()}`;

  // MORTGAGE CALC
  const monthly = amount
    ? ((amount * 0.1) / 12) /
      (1 - Math.pow(1 + 0.1 / 12, -years * 12))
    : 0;

  // SIMILAR PROPERTIES
  const similar = allProperties.filter(
    (p) => p.category === property.category && p.id !== property.id
  );

  return (
    <section className="container-wide space-y-10 py-12 text-slate-900 dark:text-white transition-colors duration-300">

      {/* IMAGE SECTION */}
      <div className="space-y-3">
        <img
          src={images[current]}
          className="w-full h-64 sm:h-96 md:h-[400px] object-cover rounded-xl shadow"
          alt={property.title}
        />

        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setCurrent(i)}
              className={`h-16 w-16 sm:h-20 sm:w-20 object-cover cursor-pointer rounded-lg border transition-colors duration-300 ${
                current === i ? "border-blue-500" : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{property.title}</h1>

        <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
          {formatPrice(property.price)}
        </p>

        <p className="text-slate-500 dark:text-neutral-400">{property.location}</p>

        <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">
          {property.description || "No description provided."}
        </p>
      </div>

      {/* WHATSAPP CONTACT (🔥 PRO FEATURE) */}
      <a
        href={`https://wa.me/234XXXXXXXXXX?text=Hello, I'm interested in ${property.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
      >
        Contact Agent on WhatsApp
      </a>

      {/* MAP (OPTIONAL SAFE) */}
      {property.lat && property.lng && (
        <iframe
          title="map"
          width="100%"
          height="300"
          loading="lazy"
          className="rounded-xl"
          src={`https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`}
        />
      )}

      {/* MORTGAGE */}
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 rounded-xl space-y-3 shadow-sm transition-colors duration-300">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Mortgage Calculator</h2>

        <input
          type="number"
          placeholder="Loan Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />

        <input
          type="number"
          placeholder="Years"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />

        <p className="font-semibold text-blue-600 dark:text-blue-400">
          Monthly: ₦{monthly ? monthly.toFixed(0) : 0}
        </p>
      </div>

      {/* SIMILAR */}
      {similar.length > 0 && (
        <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900 dark:text-white">Similar Properties</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similar.map((p) => (
                <Link
                  to={`/real-estate/${p.id}`}
                  key={p.id}
                  className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={p.image || "/placeholder.jpg"}
                    className="h-32 sm:h-40 w-full object-cover"
                  />
                <div className="p-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}