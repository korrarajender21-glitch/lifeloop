import rawReceipts from '../data/lifeloop_receipts.json'

const asArray = (value) => Array.isArray(value) ? value : value?.receipts || value?.data || []

export function normalizeReceipts(input = rawReceipts) {
  return asArray(input).map((item, index) => ({
    id: String(item.id ?? item._id ?? `receipt-${index + 1}`),
    category: String(item.category ?? item.type ?? item.kind ?? 'Uncategorized'),
    title: String(item.title ?? item.name ?? item.subject ?? 'Untitled moment'),
    date: item.date ?? item.timestamp ?? item.createdAt ?? null,
    location: item.location ?? item.place ?? item.city ?? '',
    description: String(item.description ?? item.summary ?? item.text ?? ''),
    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
    metadata: item.metadata && typeof item.metadata === 'object' ? item.metadata : {},
    source: item
  })).filter((item) => item.date)
}

export const receipts = normalizeReceipts()

export const formatDate = (value, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return 'Undated'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('en-US', options).format(date)
}

export const formatTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date)
}
