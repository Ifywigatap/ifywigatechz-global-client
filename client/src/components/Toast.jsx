import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

const theme = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-blue-500 text-white',
};

export default function Toast({ toast, removeToast, message, show, type = 'success', duration = 3000 }) {
  // This component is being used in two ways:
  // 1. By a ToastProvider, which passes a `toast` object and `removeToast` function.
  // 2. Directly on a page, which passes `message` and `show` props.
  // This logic handles both cases to prevent crashes.

  // Case 1: Used by a ToastProvider
  if (toast && removeToast) {
    const { id, message: toastMessage, type: toastType, duration: toastDuration } = toast;

    useEffect(() => {
      const timer = setTimeout(() => {
        removeToast(id);
      }, toastDuration);

      return () => clearTimeout(timer);
    }, [id, toastDuration, removeToast]);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${theme[toastType]}`}
      >
        {icons[toastType]}
        <p className="text-sm font-medium">{toastMessage}</p>
      </motion.div>
    );
  }

  // Case 2: Used directly on a page (e.g., ProductDetails.jsx)
  if (!show) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.3 }}
      className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${theme[type]}`}
    >
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  );
}