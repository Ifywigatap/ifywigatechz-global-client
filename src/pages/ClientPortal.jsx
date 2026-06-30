export default function ClientPortal() {
  const cards = ["Projects", "Messages", "Invoices", "Files", "Timeline"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-10">Client Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c} className="p-6 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
            <h2 className="text-xl font-semibold">{c}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}