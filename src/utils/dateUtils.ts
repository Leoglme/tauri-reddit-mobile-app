export function timestampToDate(timestamp?: number) {
  if (!timestamp) return null
  const d = new Date(0)
  d.setUTCSeconds(timestamp)

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]

  const date = new Date(d)
  const day = date.getUTCDate()
  const monthIndex = date.getUTCMonth()
  const year = date.getUTCFullYear()

  const month = months[monthIndex]

  return `${day} ${month} ${year}`
}
/*Timestamp to 189j 5h 85min 35sec*/
export function formatElapsedTime(timestamp: number): string {
  const diff = Date.now() / 1000 - timestamp
  const minutes = Math.floor(diff / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)
  let formattedTime = ''

  if (years > 0) {
    formattedTime += `${years}an${years > 1 ? 's' : ''} `
  }

  if (days > 0 && years === 0) {
    formattedTime += `${days}j `
  }

  if (hours > 0 && days === 0 && years === 0) {
    formattedTime += `${hours}h `
  }

  if (minutes > 0 && hours === 0 && days === 0 && years === 0) {
    formattedTime += `${minutes}min `
  }

  if (diff < 60 && formattedTime === '') {
    formattedTime += `${Math.floor(diff)}sec `
  }

  return formattedTime.trim()
}
export function timestampToRemainingTime(timestamp: number) {
  const remainingTime = timestamp - Date.now() // difference in milliseconds
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)) // convert to day
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) // convert to hours
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)) // convertit to minutes

  // displays the result as "X days Y hours" or "X hours Y minutes"
  let remainingTimeString: string
  if (days > 0) {
    remainingTimeString = `${days} jours ${hours} heures`
  } else {
    remainingTimeString = `${hours} heures ${minutes} minutes`
  }
  // return "194 days 13 hours" (for example)
  return remainingTimeString
}
