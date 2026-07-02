import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ClicksConversionsChart({ data }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="mb-6 font-semibold">Clicks vs Conversions</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" strokeWidth={3} />
          <Line type="monotone" dataKey="conversions" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}