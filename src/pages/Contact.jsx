import { useState } from 'react'
import { contactService } from '../services/contact'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setErrorMessage('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      await contactService.submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message || 'Failed to send message. Please try again later.')
      console.error('Contact form error:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="section bg-slate-100 space-y-12 container-wide">
      <h2 className="text-3xl font-bold text-brandBlue mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="card max-w-xl space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-blue-100">
            Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="w-full rounded-xl bg-neutral-100 border border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue" placeholder="Your full name" required disabled={loading}/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-100">
            Email <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-neutral-100 border border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue" placeholder="your.email@example.com" required disabled={loading}/>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 text-blue-100">
            Phone <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-xl bg-neutral-100 border border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue" placeholder="+1 (555) 123-4567" disabled={loading}/>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1 text-blue-100">
            Subject <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full rounded-xl bg-neutral-100 border border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue" placeholder="What is this about?" disabled={loading}/>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-blue-100">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl bg-neutral-100 border border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandBlue" rows="6" placeholder="Tell us more..." required disabled={loading}></textarea>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
        {status === 'success' && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ Message sent successfully!
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ✕ {errorMessage}
          </div>
        )}
        <div className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
          By sending information, you agree to our
          <a href="/terms" className="text-primary hover:underline mx-1">
            <span className="text-brandBlue dark:text-brandGold">Terms & Conditions</span>
          </a>
          and
          <a href="/privacy" className="text-primary hover:underline mx-1">
            <span className="text-brandBlue dark:text-brandGold">Privacy Policy</span>
          </a>
          .
        </div> 
      </form>
    </section>
  )
}
