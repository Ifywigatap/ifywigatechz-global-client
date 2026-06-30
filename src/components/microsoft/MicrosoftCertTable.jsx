import { useState, useMemo } from 'react'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CERT_LIST, CATEGORIES } from '../../data/microsoftData.js'

export default function MicrosoftCertTable() {
  const [sortBy, setSortBy] = useState('0')
  const [sortDir, setSortDir] = useState('asc')
  const [localQuery, setLocalQuery] = useState('')
  const [localCategory, setLocalCategory] = useState('All')

  const sortedCerts = useMemo(() => {
    let filtered = CERT_LIST.filter((item) => {
      const matchesCat = localCategory === 'All' || item[1] === 'Microsoft'
      const matchesQ = localQuery === '' ||
        item[0].toLowerCase().includes(localQuery.toLowerCase()) ||
        item[3].toLowerCase().includes(localQuery.toLowerCase())
      return matchesCat && matchesQ
    })

    return filtered.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortBy === '0') return a[0].localeCompare(b[0]) * dir
      return 0
    })
  }, [sortBy, sortDir, localQuery, localCategory])

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('asc')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search certifications or providers..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/50 pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
          />
        </div>
        <select
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-white sm:w-auto"
        >
          <option>All</option>
          {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto rounded-[1.5rem] border border-slate-700/50 shadow-xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-900/70 text-sm font-semibold text-slate-200 uppercase tracking-wide">
              <th className="px-5 py-4 text-left cursor-pointer hover:text-blue-300" onClick={() => toggleSort('0')}>
                <div className="flex items-center gap-1">
                  Certification
                  <span className="text-xs">
                    {sortBy === '0' && (sortDir === 'asc' ? <ChevronUpIcon className="h-3 w-3" /> : <ChevronDownIcon className="h-3 w-3" />)}
                  </span>
                </div>
              </th>
              <th className="px-5 py-4 text-slate-300">Provider</th>
              <th className="px-5 py-4 text-slate-300">Level</th>
              <th className="px-5 py-4 text-slate-300">Included</th>
            </tr>
          </thead>
          <tbody>
            {sortedCerts.map((item, i) => (
              <tr key={`${item[0]}-${i}`} className="border-t border-slate-700/50 hover:bg-slate-800/50 transition">
                <td className="px-5 py-4 font-semibold text-white">{item[0]}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{item[1]}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{item[2]}</td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item[3] === 'Free Exam Prep' || item[3] === 'Bonus' 
                      ? 'bg-emerald-400/20 text-emerald-300' 
                      : 'bg-blue-400/20 text-blue-300'
                  }`}>
                    {item[3]}
                  </span>
                </td>
              </tr>
            ))}
            {sortedCerts.length === 0 && (
              <tr>
                <td colSpan="4" className="px-5 py-12 text-center text-sm text-slate-400">
                  No certifications match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

