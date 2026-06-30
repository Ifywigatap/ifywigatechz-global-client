export default function Toast({ message, show }) {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {message}
    </div>
  );
}