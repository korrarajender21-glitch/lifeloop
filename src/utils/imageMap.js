const imageMap = {
  Music: '/images/music.svg',
  Places: '/images/places.svg',
  Purchases: '/images/purchases.svg',
  Photos: '/images/photos.svg',
  Events: '/images/events.svg',
  'Movies & Entertainment': '/images/movies.svg',
  Messages: '/images/messages.svg',
  Searches: '/images/photos.svg',
  'Personal Notes': '/images/notes.svg'
}

export const fallbackImage = '/images/archive.svg'

export function getReceiptImage(category) {
  return imageMap[category] || fallbackImage
}

export function getImageAlt(category, context = 'decorative archive artwork') {
  return `${category || 'Receipt'} category illustration, ${context}`
}

export default imageMap
