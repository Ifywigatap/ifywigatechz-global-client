export default function ReferralLink() {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="mb-3 font-semibold">Your Referral Link</h3>

      <div className="flex">
        <input
          value="https://ifywigatechz.com/?ref=IFY123"
          readOnly
          className="flex-1 bg-transparent border border-gray-700 px-4 py-2 rounded-l-lg"
        />

        <button className="bg-green-500 px-4 rounded-r-lg">
          Copy
        </button>
      </div>
    </div>
  );
}