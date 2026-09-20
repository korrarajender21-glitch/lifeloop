export function countBy(receipts, accessor) {
  return receipts.reduce((counts, item) => {
    const key = accessor(item) || 'Unspecified'
    counts[key] = (counts[key] || 0) + 1
    return counts
  }, {})
}

export function getInsights(receipts) {
  const categories = countBy(receipts, (item) => item.category)
  const locations = countBy(receipts, (item) => item.location)
  const tags = countBy(receipts.flatMap((item) => item.tags.map((tag) => ({ tag }))), (item) => item.tag)
  const amounts = receipts.map((item) => Number(item.metadata?.amount)).filter(Number.isFinite)
  return { categories, locations, tags, amountTotal: amounts.length ? amounts.reduce((sum, amount) => sum + amount, 0) : null }
}
