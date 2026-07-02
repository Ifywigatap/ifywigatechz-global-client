import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";

const payouts = [
  {
    id: 1,
    amount: "$200",
    date: "2026-03-01",
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 2,
    amount: "$150",
    date: "2026-03-10",
    method: "Crypto (USDT)",
    status: "Pending",
  },
  {
    id: 3,
    amount: "$320",
    date: "2026-03-15",
    method: "Bank Transfer",
    status: "Completed",
  },
];

export default function Payout() {
  return (
    <div className="space-y-8">
      
      {/* TOP SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
        >
          <p className="text-gray-400 text-sm">Total Paid</p>
          <h2 className="text-2xl font-bold mt-2">$670</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
        >
          <p className="text-gray-400 text-sm">Pending</p>
          <h2 className="text-2xl font-bold mt-2">$150</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
        >
          <p className="text-gray-400 text-sm">Next Payout</p>
          <h2 className="text-2xl font-bold mt-2">Apr 05</h2>
        </motion.div>
      </div>

      {/* PAYOUT TABLE */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Payout History</h3>

          <button className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700">
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="py-3">Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {payouts.map((p) => (
                <motion.tr
                  key={p.id}
                  whileHover={{ backgroundColor: "#111827" }}
                  className="border-b border-gray-800"
                >
                  <td className="py-3">{p.date}</td>
                  <td className="font-medium">{p.amount}</td>
                  <td>{p.method}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${
                        p.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td>
                    <button className="text-gray-400 hover:text-white">
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}