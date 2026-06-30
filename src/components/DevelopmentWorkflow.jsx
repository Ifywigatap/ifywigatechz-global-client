import React from 'react';

export default function DevelopmentWorkflow({ workflow }) {
  return (
    <div className="bg-brandBlue text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Lifecycle</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">From idea to global scale, our agile workflow ensures high-quality software delivery.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {workflow.map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4 pointer-events-none">0{step.step}</div>
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}