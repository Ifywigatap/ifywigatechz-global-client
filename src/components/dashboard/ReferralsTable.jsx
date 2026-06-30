export default function ReferralsTable({ data }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="mb-6 font-semibold">Recent Referrals</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ref) => (
            <tr key={ref.id} className="border-t border-gray-800">
              <td className="py-3">{ref.user}</td>
              <td>{ref.amount}</td>
              <td
                className={
                  ref.status === "Paid"
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {ref.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}