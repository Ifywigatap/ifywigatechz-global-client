function TermsSection({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-brandBlue dark:text-blue-400 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-brandBlue dark:text-blue-400 mb-2">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Last updated: {new Date().getFullYear()}</p>
        </header>

        <div className="prose prose-sm max-w-none space-y-6">
          <TermsSection title="Fair Use & Content Policy">
            <p>
              By using this site or enrolling in our services, you agree to fair use of content and no 
              unauthorized redistribution. All materials provided remain the intellectual property of ifywigatechz.
            </p>
          </TermsSection>

          <TermsSection title="Pricing & Payments">
            <p>
              Project timelines and pricing are agreed upon in writing. Payments are processed through Paystack 
              and are subject to their terms and conditions. All payment information is handled securely.
            </p>
          </TermsSection>

          <TermsSection title="Rescheduling & Cancellations">
            <p>
              If a session needs rescheduling, please contact us at least 24 hours in advance. Late notice 
              may affect availability.
            </p>
          </TermsSection>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Questions about these terms? Please contact our support team for clarification.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
