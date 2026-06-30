function PolicySection({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-brandBlue dark:text-blue-400 mb-3">{title}</h2>
      <div className="space-y-3 text-slate-700 dark:text-slate-300">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-brandBlue dark:text-blue-400 mb-2">Privacy Policy</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Last updated: {new Date().getFullYear()}</p>
        </header>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <PolicySection title="Information We Collect">
            <p>
              We collect basic contact details that you voluntarily share with us, including your name, email 
              address, and message content. This information is used solely to respond to your inquiries and 
              provide the services you request.
            </p>
          </PolicySection>

          <PolicySection title="Payment Processing">
            <p>
              Payments are securely processed through Paystack. We do not store, access, or retain your card 
              details. All payment transactions are governed by Paystack's own privacy and security policies.
            </p>
          </PolicySection>

          <PolicySection title="Analytics & Cookies">
            <p>
              We use privacy-friendly analytics with minimal cookie usage to understand how our site is used. 
              You can manage your cookie preferences through your browser settings. We are committed to maintaining 
              your privacy while improving user experience.
            </p>
          </PolicySection>

          <PolicySection title="Data Rights & Deletion">
            <p>
              You have the right to request deletion of your personal data at any time. Please visit our 
              <a href="/contact" className="text-brandBlue hover:underline font-semibold"> contact page</a> to 
              submit a data deletion request.
            </p>
          </PolicySection>

          <PolicySection title="Policy Updates">
            <p>
              We may update this privacy policy from time to time. Changes will be reflected on this page, 
              and we encourage you to review it periodically to stay informed about how we protect your information.
            </p>
          </PolicySection>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you have concerns about your privacy, please reach out to our support team through the contact page.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
