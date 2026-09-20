const dayDistance = (first, second) => Math.abs(new Date(first).getTime() - new Date(second).getTime()) / 86400000

export function getConnections(receipt, allReceipts, limit = 5) {
  return allReceipts.map((candidate) => {
    if (candidate.id === receipt.id) return null
    const sharedTags = receipt.tags.filter((tag) => candidate.tags.includes(tag))
    const sameLocation = receipt.location && candidate.location && receipt.location.toLowerCase() === candidate.location.toLowerCase()
    const nearby = dayDistance(receipt.date, candidate.date) <= 3
    const sameCategory = receipt.category === candidate.category
    const reasons = []
    if (sameLocation) reasons.push('shared location')
    if (sharedTags.length) reasons.push(`matching tag: ${sharedTags[0]}`)
    if (nearby) reasons.push('nearby date')
    if (sameCategory) reasons.push('same category')
    if (!reasons.length) return null
    const score = (sameLocation ? 4 : 0) + sharedTags.length * 3 + (nearby ? 2 : 0) + (sameCategory ? 1 : 0)
    return { receipt: candidate, reasons, score }
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, limit)
}
