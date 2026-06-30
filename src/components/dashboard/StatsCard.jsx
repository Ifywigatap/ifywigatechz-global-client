export default function StatsCard({ label, value }) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}