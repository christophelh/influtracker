import { useState, useEffect } from 'react'

export default function SourceForm({ youtuber, onSave, onCancel }) {
  const isEditing = !!youtuber
  const [name, setName] = useState('')
  const [channelId, setChannelId] = useState('')
  const [subscribers, setSubscribers] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (youtuber) {
      setName(youtuber.name || '')
      setChannelId(youtuber.channelId || '')
      setSubscribers(youtuber.subscribers || '')
      setDescription(youtuber.description || '')
    }
  }, [youtuber])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({
      name: name.trim(),
      channelId: channelId.trim(),
      subscribers: subscribers.trim(),
      description: description.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-slate-card border border-slate-border rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white-heading mb-4">
          {isEditing ? 'Edit Source' : 'Add New Source'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white-heading mb-1">
              Name <span className="text-rose-fail">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coin Bureau"
              disabled={isEditing}
              className="w-full bg-slate-bg border border-slate-border rounded-lg px-3 py-2 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {isEditing && (
              <p className="text-[10px] text-slate-text/50 mt-0.5">Name cannot be changed (used as ID)</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-white-heading mb-1">Channel ID</label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="e.g. UCqK_GSMbpiV8spgD3ZGloSw"
              className="w-full bg-slate-bg border border-slate-border rounded-lg px-3 py-2 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white-heading mb-1">Subscribers</label>
            <input
              type="text"
              value={subscribers}
              onChange={(e) => setSubscribers(e.target.value)}
              placeholder="e.g. 2.4M"
              className="w-full bg-slate-bg border border-slate-border rounded-lg px-3 py-2 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white-heading mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short description of the channel..."
              className="w-full bg-slate-bg border border-slate-border rounded-lg px-3 py-2 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 rounded-lg border border-slate-border text-slate-text hover:text-white-heading transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Add Source'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
