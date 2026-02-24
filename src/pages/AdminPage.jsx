import { useState, useCallback } from 'react'
import {
  getAllYoutubers,
  addYoutuber,
  updateYoutuber,
  deleteYoutuber,
  addCall,
  updateCall,
  deleteCall,
} from '../services/api'
import { logout } from '../components/admin/AuthGate'
import AdminTabs from '../components/admin/AdminTabs'
import SourceCard from '../components/admin/SourceCard'
import SourceForm from '../components/admin/SourceForm'
import CallForm from '../components/admin/CallForm'
import CallRow from '../components/admin/CallRow'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('sources')
  const [refresh, setRefresh] = useState(0)
  const [showSourceForm, setShowSourceForm] = useState(false)
  const [editingSource, setEditingSource] = useState(null)
  const [filterYoutuber, setFilterYoutuber] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  // Force re-render after mutations
  const forceRefresh = useCallback(() => setRefresh((r) => r + 1), [])

  // Fresh data on every render (after refresh counter changes)
  const youtubers = getAllYoutubers()
  void refresh // dependency hint

  // --- Source handlers ---
  function handleAddSource(fields) {
    const result = addYoutuber(fields)
    if (result.error) {
      alert(result.error)
      return
    }
    setShowSourceForm(false)
    forceRefresh()
  }

  function handleEditSource(fields) {
    const result = updateYoutuber(editingSource.id, fields)
    if (result.error) {
      alert(result.error)
      return
    }
    setEditingSource(null)
    forceRefresh()
  }

  function handleDeleteSource(youtuber) {
    setConfirmDelete({ type: 'source', id: youtuber.id, label: youtuber.name })
  }

  function confirmDeleteAction() {
    if (!confirmDelete) return
    if (confirmDelete.type === 'source') {
      deleteYoutuber(confirmDelete.id)
    } else if (confirmDelete.type === 'call') {
      deleteCall(confirmDelete.youtuberId, confirmDelete.id)
    }
    setConfirmDelete(null)
    forceRefresh()
  }

  // --- Call handlers ---
  function handleAddCall(youtuberId, callData) {
    const result = addCall(youtuberId, callData)
    forceRefresh()
    return result
  }

  function handleUpdateCall(youtuberId, callId, fields) {
    updateCall(youtuberId, callId, fields)
    forceRefresh()
  }

  function handleDeleteCall(youtuberId, callId) {
    const yt = youtubers.find((y) => y.id === youtuberId)
    const call = yt?.calls.find((c) => c.id === callId)
    setConfirmDelete({
      type: 'call',
      id: callId,
      youtuberId,
      label: `${call?.token || '?'} call on ${call?.dateOfCall || '?'}`,
    })
  }

  // --- Gather all calls for the Calls tab ---
  const allCalls = youtubers.flatMap((yt) =>
    yt.calls.map((c) => ({ ...c, youtuberName: yt.name, youtuberId: yt.id }))
  )
  const filteredCalls =
    filterYoutuber === 'all'
      ? allCalls
      : allCalls.filter((c) => c.youtuberId === filterYoutuber)
  const sortedCalls = [...filteredCalls].sort((a, b) =>
    (b.dateOfCall || '').localeCompare(a.dateOfCall || '')
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white-heading">Admin Panel</h1>
          <p className="text-sm text-slate-text">Manage sources, calls, and transcripts</p>
        </div>
        <button
          onClick={logout}
          className="text-xs text-slate-text hover:text-rose-fail transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-slate-border hover:border-rose-fail/30"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      {activeTab === 'sources' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {youtubers.map((yt) => (
              <SourceCard
                key={yt.id}
                youtuber={yt}
                onEdit={setEditingSource}
                onDelete={handleDeleteSource}
              />
            ))}

            {/* Add Source card */}
            <button
              onClick={() => setShowSourceForm(true)}
              className="border-2 border-dashed border-slate-border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-emerald-accent/50 hover:bg-emerald-accent/5 transition-colors cursor-pointer min-h-[120px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-text">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-slate-text font-medium">Add Source</span>
            </button>
          </div>

          {/* Source Form Modal */}
          {(showSourceForm || editingSource) && (
            <SourceForm
              youtuber={editingSource}
              onSave={editingSource ? handleEditSource : handleAddSource}
              onCancel={() => {
                setShowSourceForm(false)
                setEditingSource(null)
              }}
            />
          )}
        </div>
      )}

      {activeTab === 'add-call' && (
        <div className="max-w-xl">
          <CallForm youtubers={youtubers} onSubmit={handleAddCall} />
        </div>
      )}

      {activeTab === 'calls' && (
        <div>
          {/* Filter */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-xs text-slate-text">Filter by source:</label>
            <select
              value={filterYoutuber}
              onChange={(e) => setFilterYoutuber(e.target.value)}
              className="bg-slate-bg border border-slate-border rounded-lg px-3 py-1.5 text-sm text-white-heading focus:outline-none focus:border-emerald-accent"
            >
              <option value="all">All ({allCalls.length})</option>
              {youtubers.map((yt) => (
                <option key={yt.id} value={yt.id}>
                  {yt.name} ({yt.calls.length})
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-border">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-card border-b border-slate-border">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Source</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Token</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Sentiment</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Date</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Move</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-text uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCalls.map((call) => (
                  <CallRow
                    key={call.id}
                    call={call}
                    youtuberName={call.youtuberName}
                    youtuberId={call.youtuberId}
                    onUpdate={handleUpdateCall}
                    onDelete={handleDeleteCall}
                  />
                ))}
              </tbody>
            </table>
            {sortedCalls.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-text">No calls found.</div>
            )}
          </div>
          <p className="text-xs text-slate-text/50 mt-2">
            Showing {sortedCalls.length} of {allCalls.length} calls
          </p>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-slate-card border border-slate-border rounded-xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-fail/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-rose-fail">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white-heading mb-1">Confirm Delete</h3>
            <p className="text-sm text-slate-text mb-4">
              Delete <span className="text-white-heading font-medium">{confirmDelete.label}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 rounded-lg border border-slate-border text-slate-text hover:text-white-heading transition-colors text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="flex-1 py-2 rounded-lg bg-rose-fail hover:bg-rose-fail-hover text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
