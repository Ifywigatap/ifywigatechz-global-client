import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl sm:text-3xl font-bold text-white">{String(value).padStart(2, '0')}</span>
    <span className="text-xs uppercase tracking-widest text-neutral-400">{label}</span>
  </div>
);

export default function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).length ? (
    Object.entries(timeLeft).map(([interval, value]) => (
      <CountdownItem key={interval} value={value} label={interval} />
    ))
  ) : (
    <span className="text-white font-bold">This event has started!</span>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-6 mb-6"
    >
      <div className="flex justify-around items-center">
        {timerComponents}
      </div>
    </motion.div>
  );
}