import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EarningsChart({ data }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="mb-6 font-semibold">Earnings Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}