import { NavLink } from 'react-router-dom'

export default function PricingCard({
  title,
  price,
  originalPrice,
  duration,
  features = [],
  highlighted = false,
}) {
  const phone = '2348113722088'

  const displayPrice = typeof price === 'number' ? `₦${price.toLocaleString()}` : price;

  const message = encodeURIComponent(
    `Hello IFYWIGATECHZ 👋\n\nI am interested in the *${title}* plan.\n\nPrice: ${displayPrice}/${duration}\n\nPlease share the next steps.`
  )

  const whatsappLink = `https://wa.me/${phone}?text=${message}`

  const hasDiscount = originalPrice && originalPrice !== price;

  return (
    <div
      className={`rounded-2xl border p-6 space-y-4 transition
        ${
          highlighted
            ? 'border-blue-500 bg-blue-500/10 lg:scale-105'
            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40'
        }`}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-blue-500">
        {title}
      </h3>

      {/* Price */}
      <div className="flex flex-col">
        {hasDiscount && (
          <span className="text-sm line-through text-slate-400 dark:text-slate-500 font-medium">
            ₦{originalPrice.toLocaleString()}
          </span>
        )}
        <div className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 flex items-baseline">
          {displayPrice}
          <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">
            /{duration}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 text-sm text-gray-600 dark:text-orange-100">
        {features.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-blue-500">✔</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA Buttons */}
      <div className="space-y-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className={`block text-center py-2 rounded-lg font-semibold transition
            ${
              highlighted
                ? 'bg-green-500 hover:bg-green-400 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
        >
          Order via WhatsApp
        </a>

        <NavLink
          to="/contact"
          className="block text-center py-2 rounded-lg font-medium text-sm
                     text-neutral-700 dark:text-neutral-300
                     hover:underline"
        >
          Or contact us →
        </NavLink>
      </div>
    </div>
  )
}
