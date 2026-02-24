const tabs = [
  { id: 'sources', label: 'Sources' },
  { id: 'add-call', label: 'Add Call' },
  { id: 'calls', label: 'Calls' },
]

export default function AdminTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 bg-slate-bg rounded-lg p-1 border border-slate-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            activeTab === tab.id
              ? 'bg-emerald-accent text-white'
              : 'text-slate-text hover:text-white-heading hover:bg-slate-card'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
