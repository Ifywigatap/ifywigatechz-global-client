import { useState, useMemo } from 'react'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { DRUG_LIST, CATEGORIES } from '../../data/ppmvsData.js'

export default function DrugTableAdvanced() {
  const [sortBy, setSortBy] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [localQuery, setLocalQuery] = useState('')
  const [localCategory, setLocalCategory] = useState('All')

  const sortedDrugs = useMemo(() => {
    let filtered = DRUG_LIST.filter((item) => {
      const matchesCat = localCategory === 'All' || item.category === localCategory
      const matchesQ =
        localQuery === '' ||
        item.name.toLowerCase().includes(localQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(localQuery.toLowerCase())
      return matchesCat && matchesQ
    })

    return filtered.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      return a[sortBy].localeCompare(b[sortBy]) * dir
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
            placeholder="Search products, categories or dosage notes..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/50 pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
        <select
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-white sm:w-auto"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-[1.5rem] border border-slate-700/50 shadow-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-900/50 text-sm font-semibold text-slate-200 uppercase tracking-wide">
              {['name', 'category', 'dose', 'status'].map((col) => (
                <th
                  key={col}
                  className="px-5 py-4 text-left cursor-pointer hover:text-amber-300"
                  onClick={() => toggleSort(col)}
                >
                  <div className="flex items-center gap-1">
                    {col === 'name' ? 'Product' : col.charAt(0).toUpperCase() + col.slice(1)}
                    <span className="text-xs">
                      {sortBy === col &&
                        (sortDir === 'asc' ? (
                          <ChevronUpIcon className="h-3 w-3" />
                        ) : (
                          <ChevronDownIcon className="h-3 w-3" />
                        ))}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDrugs.map((item, i) => (
              <tr key={`${item.name}-${i}`} className="border-t border-slate-700/50 hover:bg-slate-800/50 transition">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.note}</div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-200">{item.category}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{item.dose}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Core'
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-amber-400/20 text-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {sortedDrugs.length === 0 && (
              <tr>
                <td colSpan="4" className="px-5 py-12 text-center text-sm text-slate-400">
                  No items match your filters. Try adjusting search or category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
